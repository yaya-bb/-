import defineReactive from "./defineReactive";
import Observer from "./Observer";
var obj = {
  a: {
    m: {
      n: 5
    }
  }
};

// 创建observe函数，注意函数的名字没有r
// 这个函数只为对象服务
function observe(value) {
  // 如果value不是对象，什么都不做
  if(typeof value != 'object')
    return;
  // 定义ob
  let ob;
  // __ob__存储Observer实例，且不希望它与常见名字重名
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
  if(typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
