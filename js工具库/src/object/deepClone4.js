function deepClone4(target, map=new Map()) {
  // 检测数据的类型
  if(typeof target === 'object'&& target !== null) {
    // 将新的结果存入到容器中-键名，键值
    let cache = map.set(target);
    if(cache) {
      return cache;
    }
    // 判断目标数据类型
    let isArray = Array.isArray(target);
    // 创建一个容器
    const result = isArray ? [] : {};
    // 遍历对象
    // 如果目标数据为数组
    if(isArray) {
      // forEach 遍历
      target.forEach((item, index) => {
        result[index] = deepClone4(item, map);
      });
    } else {
      // 如果是对象，获取所有的键名（属性），然后forEach遍历
      // target是最外层的对象，key是键值 
      Object.keys(target).forEach((key) => {
        result[key] = deepClone4(target[key], map);
      })
    }
    return result;
  } else {
    return target;
  } 
}