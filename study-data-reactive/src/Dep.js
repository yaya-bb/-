export default class Dep {
  constructor() {
    console.log('我是Dep的构造器');
    // 用数组存储自己的订阅者.subs是英语subscribes订阅者的意思
    this.subs = [];
  }
  notify() {
    console.log('Notify');

  }
}