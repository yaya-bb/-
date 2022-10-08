// 引入其他的类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';
// 游戏控制器，控制其他的所有类
class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 创建一个属性来存储蛇的移动方向（就是按键的方向）
  direction: string = '';
  // 创建一个属性用来记录游戏是否结束
  isLive = true;
  // 构造函数里面创建三个实例 
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  // 游戏初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘按下的事件
    // 当keydown触发，会调用keydownHandler函数
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 调用run方法，使蛇移动
    this.run();
  }
  // 创建一个键盘按下的响应函数
  keydownHandler(event:KeyboardEvent) {
    // 按键值
    console.log(event.key);
    // 修改direction属性
    // 需要检查event.key的值是否合法（用户是否按了正确的按键）
    this.direction = event.key;
  }
  // 创建一个控制蛇移动的方法
  run() {
    // g根据方向（this.direction）来使蛇的位置改变
    // 获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据按键方向来修改X值和Y值
    switch(this.direction) {
      case "ArrowUp":
        // 向上移动
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }
    this.checkEat(X, Y);
    // 修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入到catch，说明出现了异常，弹出一个提示信息
      alert("Game Over!");
      this.isLive = false;
    }
    // 开启一个定时调用
    // 当isLive为true时才开启定时器
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level)*30);
  }
  // 检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if(X === this.food.X && Y === this.food.Y) {
      // 食物被吃到后需将位置进行重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }
}

// 暴露
export default GameControl;
