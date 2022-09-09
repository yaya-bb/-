function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const that = this;
  function resolve(data) {
    // 如果有值，直接返回,则可以保证Promise对象只能修改一次
    if(that.PromiseState !== 'pending') return;
    // 1.修改对象的状态(PromiseState)
    that.PromiseState = 'fulfilled';
    // 2.设置对象结果值(PromiseResult)
    that.PromiseResult = data;
  }
  // reject函数
  function reject(data) {
    if(that.PromiseState !== 'pending') return;
    // 1.修改对象的状态(promiseState)
    that.PromiseState = 'rejected';
    // 2.设置对象结果值
    that.PromiseResult = data;
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
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult);
  }
  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult);
  }
}
// 添加resolve 方法,resolve属于promise函数对象，不是属于实例对象
Promise.resolve = function(value) {
  // 返回Promise实例对象
  return new Promise((resolve, reject) => {
    if(value instanceof Promise){
      // 是Promise可以调用then方法
      value.then(v =>{
        resolve(v);
      },r => {
        reject(r);
      })
    }else{
      //状态设置为成功
      resolve(value);
    }
  })
}
// 添加reject方法,reject属于promise函数对象，不是属于实例对象
Promise.reject = function(reason) {
  // 返回Promise实例对象
  return new Promise((resolve, reject) => {
      reject(reason);
  })
}
// 添加all方法
Promise.all = function(promises) {
  // 返回的结果为Promise对象
  return new Promise((resolve, reject) => {
    //声明变量
    let count = 0;
    // 存放成功结果的数组
    let arr = [];
    //遍历
    for(let i = 0; i < promises.length; i++) {
      //如果是promise对象，就可以调用then方法
      promises[i].then(v => {
        // 如果成功则调用这里面的代码
        //得知对象的状态是成功的
        //每个promise对象都成功
        count++;
        //将当前promise对象成功的结果存入到数组中
        arr[i] = v;
        //判断
        if(count === promises.length){
          // 修改状态
          resolve(arr);
        }
      },r =>{
        reject(r);
      })
    }
  })
}
//添加race方法
Promise.race = function(promises) {
  return new Promise((resolve,reject) => {
    for(let i = 0; i < promises.length; i++) {
      //如果是promise对象，就可以调用then方法
      promises[i].then(v => {
        // 谁先状态改变则返回 哪个
        resolve(v);
      }, r =>{
        reject(r);
      })
    }
  })
}