function reduce(arr, callback, initValue) {
  // 声明变量
  let result = initValue;
  // 执行回调
  // 遍历
  for(let i = 0; i < arr.length; i++) {
    // 执行回调
    // 第一个参数是上一次回调执行的结果，第二参数是当前遍历的参数
    // 返回结果需要接收
    result = callback(result, arr[i]);
  }
  // 返回最终的结果
  return result;
}