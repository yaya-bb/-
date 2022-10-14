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
      // 尝试写一下去掉空格，智能判断是普通文字的空格，还是标签中的空格
      // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
      // 是不是在尖角号里面，默认为不是
      let isJJH = false;
      let _words = '';
      for(let i = 0; i < words.length; i++) {
        // 判断是否在标签里
        if(words[i] == '<') {
          isJJH = true;
        } else if(words[i] == '>') {
          isJJH = false;
        }
        // 如果这项不是空格，拼接上
        if(!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          // 如果这项是空格，只有当它在标签内的时候，才拼接上
          if(isJJH) {
            _words += ' ';
          }
          
      }
    }
    // 存起来
    tokens.push(['text', _words]);
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
  }
  // 返回折叠的tokens
  return nestTokens(tokens);
}