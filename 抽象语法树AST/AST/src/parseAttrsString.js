// 把attrsString变为数组返回
export default function parseAttrsString(attrsString) {
  if(attrsString == undefined) return [];
  // 当前是否在引号内
  let isYinhao = false;
  // 断点
  let point = 0;
  // 结果数组
  let result = [];
  // 遍历attrsString，而不是你想的用split()这种暴力方法
  for(let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if(char == '"') {
      // 遇到引号，改标记
      isYinhao = !isYinhao;
    }else if(char == ' ' && !isYinhao) {
      // 遇见了空格，并且不在引号中
      if(!/^\s*$/.test(attrsString.substring(point, i).trim())) {
        result.push(attrsString.substring(point, i).trim());
        point = i;
      }
    }
  }
  // 循环结束之后，最后还剩一个属性k="v"
  result.push(attrsString.substring(point).trim());
  // 下面的代码功能是，将["k=v","k=v"]变为[{name:k, value:v},{name:k, value:v}];
  // 映射-数组的长度不会变多也不会变少
  result = result.map(item => {
    // 根据等号进行拆分和捕获
    const itemMatch = item.match(/^(.+)="(.+)"$/);
    return {
      name:itemMatch[1],
      value:itemMatch[2]
    }
  });
  return result;
}
