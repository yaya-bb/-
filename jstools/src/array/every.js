// 第一个参数是数组，第二个参数是函数
function every(arr, callback) {
  // 获取数组第一个满足条件的结果
  // 遍历数组
  for(let i = 0; i < arr.length; i++) {
    // 执行回调 如果回调执行结果为false
    // 如果不满足条件
    if(!callback(arr[i], i)) {
      return false ;
    }
  }
  // 如果所有都满足条件的元素
  return true;
}