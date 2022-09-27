"use strict";
const obj = {
    name: "小周",
    age: 12
};
/*
*  定义类时，可以使类去实现一个接口，
*  实现接口就是使类满足接口的要求
*/
class Myclass {
    // 属性没有初始化,需要补一个构造函数进行初始化
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log("大家好");
    }
}
