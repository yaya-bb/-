function debounce(callback, time) {
  // 定时器变量
  let timeId = null;
  // 返回一个函数
  return function(e) {
    if(timeId !== null) {
      // 清空定时器
      clearTimeout(timeId);
    }
    // 启动定时器
    // 箭头函数中的this指的是外层作用域下的this值
    timeId = setTimeout(() => {
      // 执行回调,this指向事件源
      callback.call(this, e);
      // 执行成功后，重置定时器变量
      timeId = null;
    }, time);
  }
}