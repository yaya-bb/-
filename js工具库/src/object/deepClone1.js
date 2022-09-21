function deepClone1(target) {
  // 通过数据创建JSON格式的字符串
  let str= JSON.stringify(target);
  // 将JSON字符串创建为JS数据
  let data = JSON.parse(str);
  console.log(data);
}