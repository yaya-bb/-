function chunk(arr, size) {
  // 声明两个变量
  let result = [];
  let tmp = [];
  // 遍历
  // 逆向思维 先将空数组压入到result里面，如果数组满了则新加一个数组
  if (arr.length === 0) {
    return [];
  }
  arr.forEach(item => {
    // 判断tmp元素长度是否为0
    if(tmp.length === 0) {
      // 当数组为空将tmp压入到result中
      // 1.默认初始状态[[]]
      result.push(tmp);
    }
    // 将元素压入到临时数组tmp中
    tmp.push(item);
    // 判断
    // 2.当tmp满足了size，则新开一个数组
    if(tmp.length === size) {
      tmp = [];
    }
  });
  return result;
}