function drop(arr, size) {
  // 过滤原数组产生新数组
  return arr.filter((value,index) => index >=size);
}