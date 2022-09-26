"use strict";
// 使用class关键字来定义一个类
class Person {
    constructor() {
        // 定义实例属性
        /*
         * 直接定义的属性是实例属性，需要通过对象的实例去访问
              const person = new Person();
              per.name
         * 使用static开头的属性是静态属性(类属性)，可以直接通过类去访问
              Person.age
         * readonly开头的属性表示ige只读的属性无法修改
         */
        this.name = '小周';
        // readonly只读不能修改
        this.sex = 'male';
    }
    sayHello() {
        console.log("Hello");
    }
}
// 在属性前使用static关键梓可以定义类属性(静态属性)
Person.age = 18;
const per = new Person();
console.log(per);
// 静态属性只能从类进行访问
console.log(Person.age);
// 定义方法
/*
* 如果方法以static开头则方法就是类方法，可以直接通过类调用
* static Person.sayHello();
*/
per.sayHello();
