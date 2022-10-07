class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 表示蛇的身体(包括 )
  bodies: HTMLCollection;
  // 获取蛇的容器
  element: HTMLElement;
  constructor() {
    // 获取所有的div，querySelector只取一个
    // 断言的方式：变量 as 类型 或者 <类型>变量
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }
  //获取蛇的坐标(蛇头坐标)
  get X() {
    return this.head.offsetLeft;
  }
  // 获取蛇的Y轴坐标
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇头的坐标
  set X(value) {
    this.head.style.left = value + 'px';
  }
  // 设置蛇头Y坐标
  set Y(value) {
    this.head.style.top = value + 'px'; 
  }
  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforebegin","<div></div>");
  }
}