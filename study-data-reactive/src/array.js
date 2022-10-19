import { def } from './utils.js';
// 得到Array的原型
const arrayPrototype = Array.prototype;
console.log(arrayPrototype);
// 数组侦查面试回答：
// 1.以arrayPrototype为原型(__proto__)创建一个arrayMethods对象，并将其暴露
export const arrayMethods = Object.create(arrayPrototype);
// 2.然后用ES6强制定义数组的原型指向arrayMethods：Object.setPrototypeOf(o, arrayMethods) / Object.create() / o.__proto = arrayMethods
// 要被改写的7个数组方法
const methodsNeedChange = [
//   // Vue底层改写这7个方法
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName];
  // 定义新的方法
  // 对象，名字，定义什么值
  def(arrayMethods, methodName, function() {
    console.log('被修改啦');
    // 恢复原来的功能
    original.apply(this, arguments);
  }, false);
});