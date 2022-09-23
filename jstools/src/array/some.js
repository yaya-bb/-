// 第一个参数是数组，第二个参数是函数
function some(arr, callback) {
  // 获取数组第一个满足条件的结果
  // 遍历数组
  for(let i = 0; i < arr.length; i++) {
    // 执行回调 如果回调执行结果为false
    // 只要有一个满足条件
    if(callback(arr[i], i)) {
      return true;
    }
  }
  // 如果所有都不满足条件的元素
  return false;
}