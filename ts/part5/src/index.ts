import Food from '../modules/Food';
import './style/index.less';
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);
