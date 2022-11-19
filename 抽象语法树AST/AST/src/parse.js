import parseAttrsString from "./parseAttrsString";
// parse函数，主函数
export default function (templateStr) {
  // 指针
  let index = 0;
  // 剩余部分
  let rest = templateStr;
  // 开始标记
  let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 结束标记
  let endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 抓取结束标记前的文字
  // ^表示否，[.^\<]表示开头必须不是<
  let wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/;
  // 准备两个栈
  let stack1 = [];
  let stack2 = [{'children': []}];
  while(index < templateStr.length - 1) {
    // 剩余部分
    rest = templateStr.substring(index);
    // 识别遍历这个字符，是不是一个开始标签
    if(startRegExp.test(rest)) {
      // []？表示可能有可能没有
      // 标签
      let tag = rest.match(startRegExp)[1];
      // 属性
      let attrsString = rest.match(startRegExp)[2];
      console.log(tag);
      // 将开始标记推入栈1中
      stack1.push(tag);
      // 将空数组推入栈2中
      stack2.push({'tag': tag, 'children': [], 'attrs': parseAttrsString(attrsString), type: 1});
      // 得到attrs字符串的总长度
      const attrsStringLength = attrsString != null ? attrsString.length : 0;
      // 指针移动标签的长度+2再加attrString的长度，为什么要加2呢？因为<>也占两位
      index += tag.length + 2 + attrsStringLength;
    } else if(endRegExp.test(rest)) {
      // 识别遍历到的这个字符，是不是一个结束标签
      let tag = rest.match(endRegExp)[1];
      console.log('结束',tag);
      let pop_tag = stack1.pop();
      // 此时，tag一定是和栈1顶部是相同的
      if(tag == pop_tag) {
        let pop_arr = stack2.pop();
        console.log(stack2, stack2.length);
        if(stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr);
        }
      } else {
        throw new Error('标签没有封闭');
      }
      // 指针移动标签的长度+3，为什么要加3呢？因为</>也占3位
      index += tag.length + 3;
      // console.log(stack1, JSON.stringify(stack2));
    } else if(wordRegExp.test(rest)) {
      // 识别遍历到的这个字符，是不是文字，并且不能是全空
      console.log(rest.match(wordRegExp));
      let word = rest.match(wordRegExp)[1];
      // 看word从开始到结束全是空
      if(!/^\s+$/.test(word)) {
        // 不全是空
        // console.log('文字',word);
        // 改变此时stack2栈顶元素
        stack2[stack2.length - 1].children.push({'text': word, 'type': 3});
      }
      index += word.length;
    } else {
      index++;
    }
  }
  // 此时stack2就是我们之前默认放置的一项，此时要返回这一项的children即可
  return stack2[0].children[0];
}