function Promise(executor) {
  const that = this;
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 声明属性
  this.callbacks = [];
  function resolve(data) {
    // 如果有值，直接返回,则可以保证Promise对象只能修改一次
    if(that.PromiseState !== 'pending') return;
    // 1.修改对象的状态(PromiseState)
    that.PromiseState = 'fulfilled';
    // 2.设置对象结果值(PromiseResult)
    that.PromiseResult = data;
    // 执行位置不在then中而是在方法里面(改变状态后才能执行)
   // 循环遍历，遍历的结果是一个对象
   that.callbacks.forEach(item => {
    // 成功的回调
    item.onResolved(data);
  })
  }
  // reject函数
  function reject(data) {
    if(that.PromiseState !== 'pending') return;
    // 1.修改对象的状态(promiseState)
    that.PromiseState = 'rejected';
    // 2.设置对象结果值
    that.PromiseResult = data;
    // 调用失败的回调函数
    // 循环遍历，遍历的结果是一个对象
    that.callbacks.forEach(item => {
      // 成功的回调
      item.onRejected(data);
    });
  }
  try {
    // 同步调用-执行器函数
    executor(resolve, reject);
  } catch(e) {
    reject(e);
  }
  // 【执行器函数】同步调用
  executor(resolve, reject);
}
Promise.prototype.then = function(onResolved, onRejected) {
  const that = this;
  // 返回的结果为Promise对象（res就是return new promise）
  // 要想改变res的状态就必须在执行器内部调resolve/reject
  return new Promise((resolve, reject) => {
    function callback(type) {
      // 为解决throw抛出异常问题，使用try...catch
      try{
        // 成功结果
        let result = type(that.PromiseResult);
        if (result instanceof Promise) {
        // 如果result是一个promise对象
        // 如果成功走第一个回调函数,失败走第二个回调函数
        // result相当于html中res里面的return
        result.then(v => {
          resolve(v);
        },r => {
          reject(r);
        })
        } else{
          // 结果的对象状态为成功，并设置它成功的结果为return的结果
          resolve(result);
        }
      } catch(e){
        reject(e);
      }
    }
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }
    if (this.PromiseState === 'rejected') {
      callback(onRejected);
    }
    // 判断padding的状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      // 异步修改状态then
      this.callbacks.push ({
        onResolved: function() {
          callback(onResolved);
        },
        onRejected: function() {
          callback(onRejected);
        }
      })
    }
  })
}