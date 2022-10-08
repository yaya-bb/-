// 引入其他的类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';
// 游戏控制器，控制其他的所有类
class GameControl {
    // 构造函数里面创建三个实例 
    constructor() {
        // 创建一个属性来存储蛇的移动方向（就是按键的方向）
        this.direction = '';
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    // 游戏初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按下的事件
        // 当keydown触发，会调用keydownHandler函数
        document.addEventListener('keydown', this.keydownHandler.bind(this));
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event) {
        // 按键值
        // console.log(event.key);
        // 修改direction属性
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        this.direction = event.key;
    }
}
// 暴露
export default GameControl;
