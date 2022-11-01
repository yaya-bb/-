import Observer from "./Observer.js";
/*
* Why 由于defineProperty函数不能监听到对象嵌套对象
*
* How(递归) 所以我们要创建一个Observer类 ——>将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
*/
/*
* 监听value尝试创建Observer实例，如果value已经是响应式数据，就不需要再创建Observer实例，
* 直接返回已经创建的Observer实例即可，避免重复侦测value变化的问题
*/

export default function observe(value) {
  // 如果value不是对象，什么都不做(表示该递归到的是基本类型，其变化可被侦听的)
  if(typeof value != 'object')
  {
    return;
  }
  // Observer实例
  // 定义ob
  let ob;
  // 第一步是调observe(obj)来触发全部东西
  // 第二步是看obj身上有没有__ob__
  // 如果没有就会new Observer()
    /*
      将产生的实例，添加到__ob__上
    */
  // 遍历下一层属性，逐个defineReactive
    /*
      当设置某个属性值的时候，会触发set，里面有newValue，
      这个newValue也得被observe()一下
    */
  // __ob__是value上的属性，其值是对应的Observer实例(表示其已经是可侦听的状态)
  if(typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    // 是对象且该上属性还是未能够侦听状态
    // 此时构造器就会被执行
    ob = new Observer(value);
  }
  return ob;
}