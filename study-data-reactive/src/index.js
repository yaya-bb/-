import observe from "./observe";
var obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 222
      }
    }
  },
  g: [22,44]
};

// 创建observe函数，注意函数的名字没有r
// 这个函数只为对象服务
/*
* 这个函数是侦听数据变化的入口文件，通过调用该函数一方面触发了其侦听对象数据变化的能力；
* 另一方面定义了何时递归到最内层的终止条件
*/
observe(obj);
// obj.a.m = 10;
// observe(obj.c.d.e.f);
obj.g.push(123);
console.log(obj.g);