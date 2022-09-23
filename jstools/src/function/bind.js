function bind(Fn, obj, ...args) {
  // 返回一个新的函数
  // 声明时需要形参进行接收
  return function (...args2) {
    // 调用目标函数并改变this内部的指向
    // 执行call函数
    // 接收完之后传到里面来
    // 参数传入目标函数让它做一个执行
    return call(Fn, obj, ...args, ...args2);
  }
}