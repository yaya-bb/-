var obj = {};
// 设置一个周转变量
var temp;
// 可以使用Object.defineProperty去定义一些隐藏的属性
Object.defineProperty(obj, 'a', {
  // value: 2,
  // // 是否可写
  // writable: true
  // get和value不能同时使用
  // getter/setter 需要变量周转才能工作
  // 临时变量不是特别美观，可以封装到一个函数中，利用函数的闭包特性
  // 闭包就是函数外部的作用域
  // getter 对变量的得值
  get() {
    console.log('访问');
    return temp;
  },
  // setter对变量的赋值
  set(newValue) {
    // 负责劫持
    console.log('修改');
    temp = newValue;
  }
});
console.log(obj);
console.log(obj.a);
obj.a = 9;
console.log(obj.a);