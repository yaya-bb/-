import Scanner from './Scanner.js';
import nestTokens from './nestTokens.js';
// 向外默认暴露这个函数
// 将模板字符串变为tokens数组
export default function parseTemplateToTokens(templateStr) {
  var tokens = [];
  // 创建扫描器
  var scanner = new Scanner(templateStr);
  var words;
  // 让扫描器工作
  while (!scanner.eos()) {
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('{{');
    if(words != '') {
      // 存起来
      tokens.push(['text', words]);
    }
    // 过双大括号
    scanner.scan('{{');
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('}}');
    if(words != '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      if(words[0] == "#") {
        // 存起来，从下标为1的项开始存,因为下标为0的项是#
        tokens.push(['#', words.substring(1)]);
      }else if(words[0] == "/") {
        tokens.push(['/', words.substring(1)]);
      } else {
        tokens.push(['name', words]);
      }
    }
    scanner.scan('}}');
  }
  // 返回折叠的tokens
  return nestTokens(tokens);
}