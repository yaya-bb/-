// 第一个参数是回调，第二个参数是间隔
function throttle(callback, wait) {
  // 定义开始时间
  let start = 0;
  // 返回的结果是一个函数
  // 返回的参数是时间对象
  return function (e) {
    // 获取当前的时间戳
    let now = Date.now();
    // 判断
    if (now - start >= wait) {
      // 若满足条件则执行回调
      // this指向事件源，事件对象
      callback.call(this, e);
      start = now;
    }

  }


}