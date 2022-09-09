function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const that = this;
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
  // 返回的结果为Promise对象
  return new Promise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      // 获取回调函数的执行结果
      let result = onResolved(this.PromiseResult);
      if (result instanceof Promise) {
        result.then(v => {
          resolve(v);
        }, r => {
          reject(r);
        })
      }
    }
    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult);
    }
    // 判断padding的状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push ({
        onResolved,
        onRejected
      })
    }
  })
}