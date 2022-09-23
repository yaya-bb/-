function reverseString(str) {
  // 将字符串转为数组
  // 方法1：split
  // let arr = atr.split('');
  // 方法2：...扩展运算符展开字符串
  let arr = [...str];
  arr.reverse();
  // 将数组拼接字符串
  let s = arr.join('');
  console.log(s);
  return s;
}
// 判断是否回文
function palindrome(str) {
  return reverseString(str) === str;
}
function truncate(str, size) {
  return str.slice(0, size) + '...';
}