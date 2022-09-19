function pull(arr, ...args) {
  // 声明一个空数组:用于保存删掉的元素
  const result = [];
  // 遍历arr
  for(let i = 0; i < arr.length; i++) {
    // 判断当前元素是否存在于args数组中
    if(args.includes(arr[i])) {
      // 将当前元素的值存入到result中
      result.push(arr[i]);
      // 删除当前的元素
      arr.splice(i, 1);
      // 下标自减
      i--;
    }
  }
  // 返回
  return result;
}