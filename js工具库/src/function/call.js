// Fn为要执行的函数，obj是函数运行时指向的对象，...args函数运行时的参数
function call(Fn, obj, ...args) {
  if (obj == undefined || obj === null) {
    obj = globalThis;// 全局对象
  }
  // 为obj对象添加临时的方法
  obj.temp = Fn;
  // 调用temp的方法=执行Fn，temp内部的this执行obj
  // 变相实现this指向obj
  // 函数运行时的实参要放在括号里
  let result = obj.temp(...args);
  // 删除temp方法
  delete obj.temp;
  // 返回执行结果
  return result;
}