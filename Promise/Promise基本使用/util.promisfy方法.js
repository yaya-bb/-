// Uint8ClampedArray.promisify传入一个遵循常见的错误优先的回调风格的函数
// 引入util模版
const util = require('util');
// 引入fs模版
const fs = require('fs');
// 返回一个新的promise函数(封装回调函数)
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('Promise基本使用/resource/content.txt').then(value => {
  console.log(value.toString());
})