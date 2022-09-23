function flatten1(arr) {
  // 声明空数组
  let result = [];
  // 遍历数组
  arr.forEach( item => {
    // 判断结果是否为数组
    if (Array.isArray(item)) {
      result = result.concat(flatten1(item));
    } else {
      result = result.concat(item);
    }
  });
  // 返回结果
  return result;
}