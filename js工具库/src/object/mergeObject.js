function mergeObject(...objs) {
  // 声明一个空对象
  const result = {};
  // 遍历所有的参数对象
  objs.forEach(obj => {
    // 获取当前对象所有的属性
    Object.keys(obj).forEach(key => {
      // 检测result中是否存在key属性
      if(result.hasOwnProperty(key)) {
        // 用一个空数组做连接，result指原来的值合并到空数组中，将新的obj对此追加
        result[key] = [].concat(result[key], obj[key]);
      } else {
        // 如果没有则直接写入
        result[key] = obj[key];
      }
    });
  });
  return result;
}