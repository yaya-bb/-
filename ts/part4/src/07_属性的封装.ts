(function() {
  // 定义一个表示人的类
  class Person {
    // TS可以在属性前添加属性的修饰符
    /*
    * public 修饰的属性可以在任意位置访问（修改） 默认值
    *   - 子类中也可以访问
    * private 私有属性，私有属性只能在类内部进行访问（修改）
    * - 通过在类中添加方法使得私有属性可以被外部访问
    * - 只能在当前类访问
    * protected受包含的属性，只能在当前类和当前类的子类中访问（修改）
    */
    private _name: string;
    private _age: number;
    // 构造函数属于类的内部
    constructor(name: string, age: number) {
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
      if(value >= 0)
      {
          this._age = value;
      }
  }
}
  const per = new Person('孙悟空', 12);
  per.name = "小周";
  console.log(per.name);
  class qq {
    public num: number;
    constructor(num: number) {
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
    constructor(num: number) {
      console.log("打印数字");
    }
  }
  const c = new C(12);
  /*
  * 现在属性是在对象中设置的，属性可以任意被修改
  * 属性可以任意被修改将会导致对象中的数据变得非常不安全
  */

})();