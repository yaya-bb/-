// parse函数，主函数
export default function (templateStr) {
  // 指针
  let index = 0;
  // 剩余部分
  let rest = '';
  // 开始标记
  let startRegExp = /^\<([a-z]+[1-6]?)\>/;
  // 结束标记
  let endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 抓取结束标记前的文字
  // ^表示否，[.^\<]表示开头必须不是<
  let wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/;
  // 准备两个栈
  let stack1 = [];
  let stack2 = [];
  while(index < templateStr.length - 1) {
    // 剩余部分
    rest = templateStr.substring(index);
    // 识别遍历这个字符，是不是一个开始标签
    if(startRegExp.test(rest)) {
      // []？表示可能有可能没有
      let tag = rest.match(startRegExp)[1];
      console.log(tag);
      // 将开始标记推入栈1中
      stack1.push(tag);
      // 将空数组推入栈2中
      stack2.push([]);
      // 指针移动标签的长度+2，为什么要加2呢？因为<>也占两位
      index += tag.length + 2;
      console.log(stack1, stack2);
    } else if(endRegExp.test(rest)) {
      // 识别遍历到的这个字符，是不是一个结束标签
      let tag = rest.match(endRegExp)[1];
      console.log('结束',tag);
      // 此时，tag一定是和栈1顶部是相同的
      if(tag == stack1[stack1.length - 1]) {
        stack1.pop();
      } else {
        throw new Error('标签没有封闭');
      }
      // 指针移动标签的长度+3，为什么要加3呢？因为</>也占3位
      index += tag.length + 3;
      console.log(stack1, stack2);
    } else if(wordRegExp.test(rest)) {
      // 识别遍历到的这个字符，是不是文字，并且不能是全空
      let word = rest.match(wordRegExp)[1];
      // 看word从开始到结束全是空
      if(!/^\s+$/.test(word)) {
        // 不全是空
        console.log('文字',word);
      }
      index += word.length;
      console.log(stack1, stack2);
    } else {
      index++;
    }
  }
  return templateStr;
}