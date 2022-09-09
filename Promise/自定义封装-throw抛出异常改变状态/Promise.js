function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const that = this;
  function resolve(data) {
    that.PromiseState = 'resolve';
    that.PromiseResult = data;
  }
  function reject(data) {
    that.PromiseState = 'rejected';
    that.PromiseResult = data;
  }
  try {
    // 同步调用-执行器函数
    executor(resolve, reject);
  } catch(e) {
    reject(e);
  }
}