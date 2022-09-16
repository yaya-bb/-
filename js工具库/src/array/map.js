// 函数有两个参数
// 一个参数为接收的数组，一个参数为回调函数
function map(arr, callback) {
  // 声明一个空的数组
  let result = [];
  // 遍历数组
  for (let i = 0; i < arr.length; i++) {
    // 执行回调
    // 实参就是数组遍历的元素
    //把结果放在result里面去
    result.push(callback(arr[i], i));
  }
  // 返回结果
  return result;
}