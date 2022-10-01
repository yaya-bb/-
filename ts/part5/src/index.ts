import './style/index.less';
// 定义食物类Food
class Food {
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement;
  constructor() {
    // 根据id去获取对象
    // 获取页面中的food元素并将其赋值给element
    // ! -用在赋值的内容后时：表示类型推断排除null、undefined;-用在变量前表示取反
    this.element = document.getElementById("food")!;
  }
  // 定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }
  // 定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }
  // 修改食物的位置
  change() {
    // 生成一个随机的位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次就是一格，一格的大小为10，所以就要求食物的坐标必须是整10
    // Math.floor() 向下取整
    // Math.round() 返回离自变量最近的整数
    // [0,29]
    // Math.round(Math.random() * 29);
    // [0, 29] 向下取整,永远取不到30 [0, 30)
    // Math.floor(Math.random() * 30);
    let top = Math.floor(Math.random() * 30) * 10;
    let left = Math.floor(Math.random() * 30) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}
// 测试代码
const food = new Food();
food.change();
console.log(food.X, food.Y);