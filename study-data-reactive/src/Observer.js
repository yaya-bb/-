import { def } from './utils.js'
import defineReactive from './defineReactive.js';
// Observer 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
// 大写开头表示一个类
export default class Observer {
  // 构造器
  // 类需要思考如何被实例化
  constructor(value) {
    // 添加__ob__属性，实际上是不可枚举属性
    // 给实例this，一定要注意，构造函数中的this不是表示类本身，而是表示实例)，给实例添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false);
    console.log('构造器', value);
    // 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
    this.walk(value);
  }
  // 遍历，遍历value里面的每一个key,让每一个key设置为defineReactive
  walk(value) {
    // defineReactive被Observer的walk方法调用
    for(let k in value) {
      // 把value的k属性变成reactive
      // 通过这步操作，外层变成响应式
      defineReactive(value, k);
    }
  }
}