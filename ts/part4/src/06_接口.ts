/*
 *  接口用来定义一个类结构: 也可用来描述一个对象的类型
 *  用来定义一个类中应该包含哪些属性和方法
 *  同时接口也可以当作类型声明去使用
*/
// 接口就是定义一个规范
interface myInterface {
  name: string;
  age: number;

}
const obj: myInterface = {
  name: "小周",
  age: 12
}
/*
* 接口可以在定义类的时候去限制类的结构
    接口中的所有的属性都不能有实际的值
    接口只定义对象的结构，而不考虑实际值
    在接口中所有的方法都是抽象方法，接口就是对类的限制
*/
interface myInter {
  name: string;
  sayHello(): void;
}
/*
*  定义类时，可以使类去实现一个接口，
*  实现接口就是使类满足接口的要求
*/
class Myclass implements myInter {
  name: string;
  // 属性没有初始化,需要补一个构造函数进行初始化
  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    console.log("大家好");
  }
  
}