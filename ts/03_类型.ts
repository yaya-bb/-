// 字面量
// 可以直接使用字面量进行类型声明
let b: 10; // 限制值b的值为10
// b = 11;
// 可以使用 | 来连接多个类型（联合类型）
let d: "male" | "female";
d = "male";
d = "female";
let e: boolean | string;
e = true;
e = "hi";
// any：表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
// 使用TS时，不建议使用any类型
let f: any;
f = 'hello';
f = 123;
f = [123,1];
// 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的any）
let g;
g = true;
g = 123;
g = 'HaHaHa';
// unknown 表示未知类型的值
let h: unknown;
h = true;
h = "Hi";

let s: string;
// d的类型是any，它可以赋值给任意变量
//  s = f;

// unknown 是加上时一个类型安全的any
// unknown 类型的变量，不能直接赋值给其他变量
// 先进行类型检查
if (typeof h === 'string') {
  s = h;
}
// 类型断言(告诉解析器变量的实际类型h为string类型)
/*
* 语法：
*   变量 as 类型
*   <类型> 变量
*/
s = h as string;
s = <string>e;

// void 用来表示空： 以函数为例，就表示没有返回值的函数
// void == undefined || null
function fn(): void{

}
// never 表示永远不会返回结果
function fn2(): never{
  throw new Error('报错了！');
}
// object表示一个js对象
let a: object;
a = {};
a = function() {

};
// 建议使用如下形式
// {}用来指定对象中可以包括哪些属性
// 语法： {属性名: 属性值，属性名： 属性值}
// 在属性名后面加一个?则代表该属性可选
// [propName: string]表示任意字符串的属性名
// [propName: string]: any表示任意类型的属性
// let r: {name: string, [propName: string]: any}
let k: {name: string, age?: number};
k = {name: '孙悟空'};

/*
* 设置函数结构的类型声明
*   语法: (形参: 类型, 形参: 类型...) => 返回值
*/
let u: (a:number, b:number) => number;
u = function (n1, n2) {
  return n1 + n2;
}

// string[] / Array<string>表示字符串数组
// number[] / Array<number>表示数值数组
/*
*  数组的类型声明
*  语法：
*    类型[]
*    Array<类型>
*/
let j: number[];
let q: Array<string>;

/*
*  元组，元组就是固定长度的数组--tuple
*/
let l: [string, number];
l = ["hi", 111];

/*
* enum 枚举
*/
enum Gender{
  Male = 1,
  Female = 0
}
let i: {name: string, gender: Gender};
i = {
  name: "孙悟空",
  gender: Gender.Male
}
console.log(i.gender === Gender.Male);

// &表示同时满足
let n: {name: string} & {age: number};
n = {name: "猪八戒", age: 30};

// 类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let p: myType;

