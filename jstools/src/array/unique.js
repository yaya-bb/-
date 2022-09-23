// 利用forEach()和indexOf()
// 本质是双重遍历，效率较差
function unique(arr) {
  //声明一个空数组result
  const result = [];
  arr.forEach(item => {
    // 检测result数组是否包含这个元素
    if(result.indexOf(item) === -1) {
      // 若没有该元素，则插入到result中
      result.push(item);
    }
  });
  // 返回
  return result;
}