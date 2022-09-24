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
let f: any;
f = 'hello';
f = 123;
f = [123,1];