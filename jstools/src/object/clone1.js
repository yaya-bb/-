function clone1(target) {
  // 类型判断 {} [] null
  if(typeof target === 'object' && target !== null) {
    // 判断数据是否为数组
    if(Array.isArray(target)) {
      // 扩展运算符，创建一个新数组，把内容展开，放到新数组里面
      return [...target];
    } else {
      // 使用｛｝+...展开成为一个新对象
      return {...target};
    }
  } else {
    return target;
  }
}