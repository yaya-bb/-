function clone2(target) {
  // 类型判断 {} [] null
  if(typeof target === 'object' && target !== null) {
    // 创建一个容器
    const result = Array.isArray(target) ? [] : {};
    // 遍历target数据(for循环只能遍历数组，forEach只能循环具有迭代器接口的数据)
    for(let key in target) {
      // for...in...不仅可以遍历当前对象的属性还能遍历对象原型的属性
      // 判断当前对象身上是否包含该属性
      if(target.hasOwnProperty(key)){
        // 将属性设置到result结果数据中
        result[key] = target[key];
      } 
    }
    return result;
  }else{
      return target;
  }
}