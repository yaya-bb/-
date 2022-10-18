var obj = {};

function defineReactive (data, key, val) {
  // val的值相当于get和set这两个函数闭包中的环境
  // 闭包是一定要有内外两层函数嵌套，get、set是内层，defineReactive是外层
  // get访问这个参数,set把newValue设置为这个参数
  // 可以使用Object.defineProperty去定义一些隐藏的属性
  
  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可以被配置，比如可以被delete
    configurable: true,
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
      return val;
    },
    // setter对变量的赋值
    set(newValue) {
      // 负责劫持
      console.log('修改');
      if(val == newValue) {
        return;
      }
      val = newValue;
    }
  });
}
defineReactive(obj, 'a', 10)
console.log(obj);
console.log(obj.a);
obj.a = 8;
obj.a++;
console.log(obj.a);