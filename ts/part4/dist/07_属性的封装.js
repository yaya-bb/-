"use strict";
(function () {
    // 定义一个表示人的类
    class Person {
        // 构造函数属于类的内部
        constructor(name, age) {
            this._name = name;
            this._age = age;
        }
        // getter方法用来读取属性
        // setter方法用来设置属性
        // - 它们被称为属性的存取器
        //   // 定义方法，用来获取name属性
        //   getName() {
        //     return this._name;
        //   }
        //   // 定义方法，用来设置name属性
        //   setName(value: string) {
        //     this._name = value;
        //   }
        // }
        // const per = new Person('孙悟空', 12);
        // per.setName('小白');
        // 通过方法获取属性值
        // TS中设置getter方法的方式
        get name() {
            console.log('get name()执行了！');
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get age() {
            return this._age;
        }
        set age(value) {
            if (value >= 0) {
                this._age = value;
            }
        }
    }
    const per = new Person('孙悟空', 12);
    per.name = "小周";
    console.log(per.name);
    class qq {
        constructor(num) {
            this.num = num;
        }
    }
    class B extends qq {
        test() {
            console.log(this.num);
        }
    }
    const b = new B(123);
    // 更为简便的表达方式
    class C {
        // 可以直接将属性定义在构造函数中
        constructor(num) {
            console.log("打印数字");
        }
    }
    const c = new C(12);
    /*
    * 现在属性是在对象中设置的，属性可以任意被修改
    * 属性可以任意被修改将会导致对象中的数据变得非常不安全
    */
})();
