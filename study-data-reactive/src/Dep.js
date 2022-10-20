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
export default class Dep {
  constructor() {
    console.log('我是Dep的构造器');
    this.id = uid++;
    // 用数组存储自己的订阅者.subs是英语subscribes订阅者的意思
    // 用数组存储自己的订阅者，放的是Watcher的实例
    this.subs = [];
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }
  // 添加依赖
  depend() {
    // Dep.target就是一个我们自己指定的全局的位置，用window.target也行，只要是全局唯一，没有歧义就行
    if(Dep.target) {
      this.addSub(Dep.target);
    }
  }
  // 通知更新
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