// 利用forEach()和对象容器
function unique2(arr) {
  //声明一个空数组result
  const result = [];
  // 声明空对象
  // 原来存放数组当中的值作为下标存入对象中
  // 下标作为属性的作用：判断是否存在
  const obj = {};
  arr.forEach(item => {
    if (obj[item] === undefined) {
      // 将item作为下标存储在obj中
      obj[item] = true;
      result.push(item);
    }    
  });
  // 返回
  return result;
}