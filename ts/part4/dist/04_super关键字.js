"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log("Hello!");
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            // 如果在子类写了构造函数，在子类构造函数中必须对父类构造函数进行调用
            // 调用父类的构造函数
            // 在子类的构造函数中必须把父类的构造函数再调用一遍
            super(name);
            this.age = age;
        }
        sayHello() {
            // 在类的方法中super就表示当前类的父类
            super.sayHello();
        }
    }
    const dog = new Dog("泡面", 12);
    dog.sayHello();
    console.log(dog);
})();
