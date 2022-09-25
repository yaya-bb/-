// 声明一个变量a，同时制定它的类型为number
let a: number;
// a的类型设置为number，在以后的使用过程中a的值只能是数字
a = 10;
// a = 'Hi';  // 此行代码会报错，因为变量a的类型是number，不能赋值为字符串
// 声明变量的声明和赋值是同时进行的时候，TS可以自动对变量进行类型检测
let c = false;
// c = 10; // 会报错，由于c为boolean值

// JS中的函数是不考虑参数的类型和个数
// function sum(a, b) {
//   return a + b;
// }
// console.log(sum(123, 456)); // 579
// console.log(sum(123, "456")); // "123456"
// TS有类型限制以及个数限制
function sum(a: number, b: number) {
  return a + b;
}
console.log(sum(123, 456));