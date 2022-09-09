// 声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 保存实例对象的this的值
  const that = this;
  // resolve 函数
  function resolve(data) {  
    // 1.修改对象的状态(PromiseState)
    that.PromiseState = 'fulfilled';
    // 2.设置对象结果值(PromiseResult)
    that.PromiseResult = data;
  }
  // reject函数
  function reject(data) {
    // 1.修改对象的状态(promiseState)
    that.PromiseState = 'rejected';
    // 2.设置对象结果值
    that.PromiseResult = data;
  }
  // 【执行器函数】同步调用
  executor(resolve, reject);
}