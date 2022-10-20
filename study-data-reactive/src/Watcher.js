import Dep from "./Dep";

/*How 
* 依赖是什么？ Watcher
* 需要用到数据的地方，成为依赖，就是Watcher
* 只有Watcher触发的getter才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中
*
* Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍
* Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知组件
*/
let uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    // target 监听哪个对象，expression哪个对象怎样的表达式，callback回调
    console.log("我是watcher类的构造器");
    this.id = uid++;
    this.target = target;
    // 把表达式按点来拆分
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }
  update() {
    this.run();
  }
  get() {
    // 进入依赖收集阶段,让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    const obj = this.target;
    var value;
    // 只要能找到，就一直找
    try {
      value = this.getter(obj);
    } finally {
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