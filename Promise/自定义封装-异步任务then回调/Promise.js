// 声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 保存实例对象的this的值
  const that = this;
  this.callbacks = [];
  // resolve 函数
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
  // 【执行器函数】同步调用
  executor(resolve, reject);
}
Promise.prototype.then = function(onResolved, onRejected) {
  const self = this;
  return new Promise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult);
    }
    // 判断padding的状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved: function() {
          //执行成功回调函数
          let result = onResolved(self.PromiseResult);
          //判断
          if(result instanceof Promise) {
            result.then(v => {
              resolve(v);
            },r => {
              reject(r);
            })
          }else {
            resolve(result);
          }
        },
        onRejected:function() {
          let result = onResolved(self.PromiseResult);
          //判断
          if(result instanceof Promise) {
            result.then(v => {
              resolve(v);
            },r => {
              reject(r);
            })
          }else {
            resolve(result);
          }
        }
      })
    }
  })
}