function deepClone2(target) {
  // 检测数据的类型
  if(typeof target === 'object'&& target !== null) {
    // 创建一个容器
    const result = Array.isArray(target) ? [] : {};
    // 遍历对象
    for(let key in target) {
      // 检测该属性是否为对象本身的属性（不能拷贝原型对象的属性）
      if(target.hasOwnProperty(key)) {
        // 拷贝
        result[key] = deepClone2(target[key]);
      }
    }
    return result;
  } else {
    return target;
  } 
}