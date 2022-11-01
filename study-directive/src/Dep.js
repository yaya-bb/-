/*Why 为什么要收集依赖
* 之所以要劫持数据，目的是当数据的属性发生变化时，可以通知哪些曾经用到该数据的地方
* 先收集依赖，把用到的数据的的地方收集起来，等属性改变，在之前收集好的依赖中循环触发一遍
*/
// 依赖收集到哪里？ Dep
/* How
* 目标依赖，我们要在getter中收集依赖，将依赖收集到Dep
* 将依赖收集封装成一个类Dep，这个类帮我们管理依赖可以收集依赖、删除依赖、向依赖发送通知
*/
let uid = 0;
// 定义依赖关系，依赖收集的核心
export default class Dep {
  constructor() {
    console.log('我是Dep的构造器');
    this.id = uid++;
    // 用数组存储自己的订阅者，放的是Watcher的实例
    this.subs = [];
  }
  // 添加订阅: 该方法将订阅者添加到subs中对应的数组中
  addSub(sub) {
    // sub:订阅者，当信息发生时被通知的对象

    this.subs.push(sub);
  }
  // 添加依赖
  // 将dep实例添加到当前的订阅者中(这个过程中也会将当前的订阅者添加到dep的订阅者列表中)
  depend() {
    // target是一个全局静态属性，可以理解为当前的目标Watcher，也就是当前的订阅者
    // Dep.target就是一个我们自己指定的全局的位置，用window.target也行，只要是全局唯一，没有歧义就行
    if(Dep.target) {
      // 在dep的订阅者数组中存放了Dep.target，让Dep.target订阅dep
      // Dep.target就是Watcher实例
      // Why 为什么要存放在Dep.target？
      /* 举例： {{a+b}}
      * 因为getter函数并不能传参，dep可以通过闭包的形式放进去,watcher不行，watcher内部存放了a+b这个表达式，
      * 也是由watcher计算a+b的值，在计算前他会把自己放在一个公开的地方(Dep.target)，然后计算a+b，从而触发
      * 表达式中所有遇到的依赖getter，这些getter执行过程中会把Dep.target加到自己的订阅列表中。等整个表达式
      * 计算成功，Dep.target又恢复null。这样就成功的让watcher分发到了对应依赖的订阅者列表中，订阅到自己所有依赖。
      */
      this.addSub(Dep.target);
    }
  }
  // 通知所有的订阅者进行更新
  notify() {
    console.log('Notify');
    // 浅克隆一份
    const subs = this.subs.slice();
    // 遍历
    for(let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
  // 从数组中删除元素item
  remove(arr, item) {
    if(arr.length) {
      const index = arr.indexOf(item);
      if(index > -1) {
        return arr.splice(index, 1);
      }
    }
  }
}