function slice(arr,begin,end) {
  // 若arr数组长度为0
  if(arr.length === 0) {
    return [];
  }
  // 判断begin
  begin = begin || 0;
  if(begin >= arr.length) {
    return [];
  }
  // 判断end
  end = end || arr.length;
  if(end < begin) {
    end= arr.length;
  }
  // slice返回的结果为一个新的数组
  // 声明一个空数组
  const result = [];
  // 遍历对象进行截取
  for(let i = 0; i< arr.length; i++){
    if(i >= begin && i <end) {
      // 将下标对应的元素压入数组
      result.push(arr[i]);
    }
  }
  return result;
}