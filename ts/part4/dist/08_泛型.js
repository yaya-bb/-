"use strict";
// 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
// <**>
function fn(a) {
    return a;
}
// 可以直接调用具有泛型的函数
// 会自动判断出t的类型
// 不指定泛型，ts可以自动对类型进行推断
let result = fn(10);
// 指定泛型
// 手动指令fn的t类型为string
let result2 = fn('hello');
// 泛型可以同时指定多个
function fn2(a, b) {
    console.log(b);
    return a;
}
// fn2<number, string>(111, 'hello');
fn2(123, 'hello');
// T 为inter的子类
// 表示：T是一个泛型而且必须要求T实现inter接口
// T extends Inter 表示泛型T必须是Inter实现类（子类）
function fn3(a) {
    return a.length;
}
// 必须有length属性
fn3('123'); // 字符串里面有length
// fn3(123); // 会报错，由于number没有length
class MyClass {
    constructor(name) {
        this.name = name;
    }
}
const mc = new MyClass('孙悟空');
console.log(mc.name);
