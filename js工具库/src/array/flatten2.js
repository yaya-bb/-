function flatten2(arr) {
  // 声明数组
  let result = [...arr];
  // 循环判断:判断数组里面还有没有子数组，如果有就展开
  while(result.some(item => Array.isArray(item))) {
    // [1,2,[3,4,[5,[6]],7]]
    // result = [].concat(1,2,[3,4,[5,6],7]);//[1,2,3,4,[5,6],7]
    // result = [].concat(1,2,3,4,[5,6],7]);//[1,2,3,4,5,6,7]
    result = [].concat(...result);
  }
  // 返回结果
  return result;
}