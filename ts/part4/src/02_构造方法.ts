class Dog {
  // 属性是在类中直接进行定义
  name: string;
  age: number;
  // constructor 被称为构造函数
  // 构造函数会在对象创建时调用
  // 每次调用构造函数new xx则意味着调用一次constructor
  constructor(name: string, age: number) {
    // 在构造方法中，this表示当前的实例
    // 在构造函数中当前对象就是新建的那个对象
    // 可以通过this向新建的对象中添加属性
    // 在构造函数进行赋值
    this.name = name;
    this.age = age;
  }
  bark() {
    // 在方法中可以通过this来表示当前调用方法的对象
    console.log(this);
  }
}
const dog = new Dog('小黄', 1);// this等于dog
const dog1 = new Dog('嘻嘻', 2);// this等于dog
console.log(dog);
console.log(dog1);