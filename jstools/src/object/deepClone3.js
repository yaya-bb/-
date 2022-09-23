function deepClone3(target, map=new Map()) {
  // 检测数据的类型
  if(typeof target === 'object'&& target !== null) {
    // 将新的结果存入到容器中-键名，键值
    let cache = map.set(target);
    if(cache) {
      return cache;
    }
    // 创建一个容器
    const result = Array.isArray(target) ? [] : {};
    // 遍历对象
    for(let key in target) {
      // 检测该属性是否为对象本身的属性（不能拷贝原型对象的属性）
      if(target.hasOwnProperty(key)) {
        // 拷贝
        result[key] = deepClone2(target[key], map);
      }
    }
    return result;
  } else {
    return target;
  } 
}