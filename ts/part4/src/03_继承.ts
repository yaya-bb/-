// 由于ts会检测不同文件的相同起名的重复，所以使用立即执行函数==>写在一个单独的作用域中，避免名字发生冲突
(function () {
   // 定义个一个Animal类
   class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayHello() {
      console.log("Hello!");
    }
   }
   /*
   *  Dog extends Animal
        此时，Animal被称为父类，Dog被称为子类
        使用继承后，子类将会拥有父类所有的方法和属性
         这样只需要写一次即可让所有的子类都同时拥有父类的属性和方法      
      如果希望在子类中添加一些父类中没有的属性或方法
      如果在子类中添加了和父类相同的方法，则子类方法会覆盖父类的方法
      这种子类覆盖掉父类的形式，我们称为方法重写
  */
   // 定义一个表示狗的类
   // 使Dog继承Animal类
  class Dog extends Animal {
    run() {
      console.log((`${this.name}在跑`))
    }
    sayHello() {
      console.log("汪汪！");
    }
  }
  // 定义一个表示猫的类
  // 使Cat继承Animal类
  class Cat extends Animal {

  }
  const dog = new Dog('嘟嘟', 5);
  const cat = new Cat('嘿嘿', 5);
  console.log(dog);
  dog.sayHello();
  dog.run();
})();
