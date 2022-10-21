import observe from "./observe";
import Dep from "./Dep";
// 对象是在getter中收集依赖，在setter中触发依赖
// 数组是在getter中收集依赖，在拦截器中触发依赖

// 给对象obj定义一个响应式的属性
// obj: 传入的数据，key:监听的属性,value:闭包环境提供的周转变量

export default function defineReactive (obj, key, val) {
  // 每个数据都要维护一个属于自己的数组，用来存放依赖自己的watcher
  const dep = new Dep();
  // val的值相当于get和set这两个函数闭包中的环境
  // 闭包是一定要有内外两层函数嵌套，get、set是内层，defineReactive是外层
  // get访问这个参数,set把newValue设置为这个参数
  // 可以使用Object.defineProperty去定义一些隐藏的属性
  // 如果有两个参数
  // console.log("defineReactive", key);
  if(arguments.length == 2) {
    val = obj[key];
  }
  // 子元素要进行observe,至此形成了递归。这个递归不是函数自己调用自己，而是多个函数，类循环调用
  let childOb = observe(val);

  // 对obj的key进行属性拦截
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可以被配置，比如可以被delete
    configurable: true,
    // value: 2,
    // // 是否可写
    // writable: true
    // get和value不能同时使用
    // getter/setter 需要变量周转才能工作
    // 临时变量不是特别美观，可以封装到一个函数中，利用函数的闭包特性
    // 闭包就是函数外部的作用域
    // getter 获取数据
    get() {
      console.log('访问'+ key + '属性');
      // 如果现在处于依赖收集阶段
      if(Dep.target) {
        dep.depend();
        // 判断有没有子元素
        if(childOb) {
          // 数组收集依赖
          childOb.dep.depend();
        }
      }
      return val;
    },
    // setter对变量的赋值
    set(newValue) {
      // 负责劫持
      console.log('修改' + key + '属性', newValue);
      // 如果传入的值相等就不用修改
      if(val == newValue) {
        return;
      }
      // 修改数据
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      // 新值如果是对象，仍然需要递归遍历处理
      childOb = observe(newValue);
      // 触发依赖
      // 发布订阅模式，通知dep
      dep.notify();
    }
  });
}