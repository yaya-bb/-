import { def } from './utils.js';
// 得到Array的原型
const arrayPrototype = Array.prototype;
console.log(arrayPrototype);
// 数组侦查面试回答：
// 1.以arrayPrototype为原型(__proto__)创建一个arrayMethods对象，并将其暴露
export const arrayMethods = Object.create(arrayPrototype);
// 2.然后用ES6强制定义数组的原型指向arrayMethods：Object.setPrototypeOf(o, arrayMethods) / Object.create() / o.__proto = arrayMethods
// 要被改写的7个数组方法
// 只有调用数组7个方法的一个，才能执行这个值或者调用这个值
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
    // 恢复原来的功能
    const result = original.apply(this, arguments);
    // 把类数组对象变为数组
    const args = [...arguments];
    // 把这个数组身上的__ob__取出来,__ob__已经被添加了，为什么已经被添加了？
    /*
    * 因为数组不是最高层，比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层
    * 的时候，已经给g属性(就是这个数组)添加了__ob__属性
    */
    const ob = this.__ob__;
    // 有三种方法push/unshift/splice能够插入新项，现在要把插入的新项也要变为observe的
    let inserted = [];
    switch(methodName) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // splice格式是splice(下标, 数量, 插入的新项)
        inserted = args.slice(2);
    }
    // 判断有没有要插入的新项, 让新项变为响应的
    if(inserted) {
      ob.observeArray(inserted);
    }

    console.log('被修改啦');
    return result;
  }, false);
});