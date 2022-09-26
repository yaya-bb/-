"use strict";
(function () {
    // 定义个一个Animal类
    /* 以abstract开头的类是抽象类，
       抽象类和其他类区别不大，只是不能用来创建对象
       抽象类是专门用来继承的类
  
        抽象类可以添加抽象方法
     */
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    class Dog extends Animal {
        run() {
            console.log((`${this.name}在跑`));
        }
        sayHello() {
            console.log("汪汪！");
        }
    }
    class Cat extends Animal {
        // 由于父类有抽象方法，因此会强制子类进行重写方法
        sayHello() {
            console.log("喵喵");
        }
    }
    const dog = new Dog('嘟嘟', 5);
    const cat = new Cat('嘿嘿', 5);
    console.log(dog);
    dog.sayHello();
    cat.sayHello();
    dog.run();
})();
