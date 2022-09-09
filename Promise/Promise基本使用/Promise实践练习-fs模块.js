//fs可以对寄存器的硬盘进行读写操作
const fs = require('fs');
// 回调函数的形式
// fs.readFile('./resource/content.text', (err, data) => {
//   // 如果有错误就抛出错误
//   if (err) throw err;
//   // 没有错误就输出文件内容
//   console.log(data.toString());
// });
// Promise形式
let p = new Promise((resolve, reject) => {
  fs.readFile('Promise基本使用/resource/content.txt', (err, data) => {
  // 如果出错
  if(err) reject(err);
  // 如果成功
  resolve(data);
  });
});
p.then(value => {
  console.log(value.toString());
}, reason => {
  console.log(reason);
})
