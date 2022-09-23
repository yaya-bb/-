// 第一个参数是数组，第二个参数是函数
function findIndex(arr, callback) {
  // 获取数组第一个满足条件的结果
  // 遍历数组
  for(let i = 0; i < arr.length; i++) {
    // 执行回调
    // 需要接收一个参数
    let res = callback(arr[i], i);
    // 如果满足条件
    if(res) {
      // 返回正在遍历的元素
      return i;
    }
  }
  // 如果没有遇到满足条件的元素
  return -1;
}