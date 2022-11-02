import Dep from "./Dep";

/*How 
* 依赖是什么？ Watcher
* 需要用到数据的地方，成为依赖，就是Watcher
* 只有Watcher触发的getter才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中
*
* Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍
* Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知组件
*/
/*
*功能:
   实例化Watch时，往dep中添加自己
   当数据变化触发dep，dep通知所有对应的Watch实例更新视图
*/
/*
* 思路：
*   首先将数据变为响应式，然后再解析模板的时候将根据组件创建watcher，再创建watcher的过程中，
*   调用get方法去触发依赖收集
*/
let uid = 0;
// Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方
export default class Watcher {
  constructor(target, expression, callback) {
    // target 监听哪个对象实例，expression哪个对象怎样的表达式【订阅的属性名】，callback数据变化后要执行的回调
    // console.log("我是watcher类的构造器");
    this.id = uid++;
    // 触发getter前，将当前订阅者实例村春给Dep类
    this.target = target;
    // 把表达式按点来拆分，执行this.getter()就可以读取data.a.b.c的内容
    // parsePath为解析路径函数，返回一个函数、返回的函数可得到expression对应的值
    this.getter = parsePath(expression);
    this.callback = callback;
    // 记录属性更改之前的值，用于进行更新状态检测(导致属性的getter的触发)
    this.value = this.get();
  }
  // 更新视图
  update() {
    this.run();
  }
  get() {
    // 进入依赖收集阶段,让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    // Dep.target就是Watcher类里面的get方法，是依赖收集的条件
    Dep.target = this;
    const obj = this.target;
    var value;
    // 只要能找到，就一直找
    try {
      // 获取value的值
      value = this.getter(obj);
    } finally {
      // 操作完毕后清除target，用于存储下一个Watch实例
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if(value !== this.value || typeof value == 'object') {
      const oldValue = this.value;
      this.value = value;
      // 调用Watcher实例的时候传递过来的回调函数，并且确定它的this指向this.target
      cb.call(this.target, value, oldValue);
    }
  }
};
// 将str用.分割成数组segments，然后循环数组，一层一层去读取数据，最后拿到的obj就是str中想要读的数据
function parsePath(str) {
  var segments = str.split('.');
  return(obj) => {
    for(var i = 0; i < segments.length; i++) {
      if(!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}