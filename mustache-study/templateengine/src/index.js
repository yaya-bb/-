// 调包
import Scanner from './Scanner.js';
// 全局提供templateEngine对象
window.templateEngine = {
  // 渲染方法
  render(templateStr, data) {
    // 引入
    // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模版字符串
    // 也就是说这个扫描器就是针对这个模版字符串工作的
    var scanner = new Scanner(templateStr);
    // 当不等于模版字符串最后的时候一直进行循环，直到到达则结束
    var word;
    while(!scanner.eos()) {
      word = scanner.scanUtil('{{');
      console.log(word);
      scanner.scan('{{');
      word = scanner.scanUtil('}}');
      console.log(word);
      scanner.scan('}}');
    }
  }
}