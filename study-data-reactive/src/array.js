import { def } from './utils.js';
/* 正因为可以通过Array原型上的方法来改变数组的内容，所以像对象那种通过getter/setter的实现方式就行不通
*  ES6之前没有提供可以拦截原型方法的能力，我们可以用自定义的方法去覆盖原生的原型方法
*/
// 得到Array的原型
const arrayPrototype = Array.prototype;
// 这七个方法定义在Array.prototype上，要保留方法的功能，同时增加数据劫持
console.log(arrayPrototype);
// 数组侦查面试回答：(思路)
// 1.以arrayPrototype为原型(__proto__)创建一个arrayMethods对象，并将其暴露;
// Object.create():创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
export const arrayMethods = Object.create(arrayPrototype);
// 2.然后用ES6强制定义数组的原型指向arrayMethods：Object.setPrototypeOf(o, arrayMethods) / Object.create() / o.__proto = arrayMethods
// 要被改写的7个数组方法
// Vue通过改写数组的七个方法(可以改变数组自身内容的方法)来实现对数组的响应式处理
/* Object.defineProperty不能直接监听数组内部的变化，那么数组内容变化应该怎么操作？
*  Vue主要采用的是改装数组方法的方式(push,pop,shift,unshift,splice,sort,reverse),
*  在保留其原有功能的前提下，将其添加的项变为响应式
*/
// 3.这就相当于一个拦截器覆盖Array.prototype,每当使用Array原型上的方法操作数组时，其实执行的是拦截器中提供的方法。
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
   // 数组不会是最外层，所以其上已经添加了Observer实例
   // 把这个数组身上的__ob__取出来
   // 在拦截器中获取Observer的实例
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
    // 查看有没有新插入的项inserted，有的话就劫持
    if(inserted) {
      ob.observeArray(inserted);
    }
    console.log('被修改啦');
    // 发布订阅模式，通知dep
    // 向依赖发送信息
    ob.dep.notify();
    return result;
  }, false);
});