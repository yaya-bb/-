export function concat(arr, ...args) {
  // 声明一个空数组
  const result = [...arr];
  // 遍历数组
  args.forEach(item => {
    // 判断item是否为数组
    if(Array.isArray(item)) {
      // 使用扩展运算符将其展开
      result.push(...item);
    } else {
      result.push(item);
    }
  });
  // 返回result
  return result;
}