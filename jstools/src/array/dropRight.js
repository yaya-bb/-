function dropRight(arr, size) {
  // 过滤原数组产生新数组
  return arr.filter((value,index) => {
    return index < arr.length - size;
  });
}