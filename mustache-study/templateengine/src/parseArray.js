import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/*
* 处理数组，结合renderTemplate数组
* 注意：这个函数的参数是token，而不是tokens
* token是什么，就是一个简单的['#', 'students',[]]
* 这个函数要递归调用renderTemplate函数，调用的次数由data决定
* {
    students: [
      {'name': '小明'},
      {'name': 'John'},
      {'name': 'Tom'}
    ]
  };
  那么parseArray()函数要递归调用renderTemplate函数3次，因为数组的长度为3
*/
export default function parseArray(token, data) {
  // console.log(token, data);
  // 得到整体数据data中这个数组要使用的部分
  let v = lookup(data, token[1]);
  // 结果字符串
  let resultStr = '';
  console.log(v);
  // 遍历v数组，v一定是数组
  // 下面这个循环可能是整个包中最难思考的一个循环
  // 它是遍历数据，而不是遍历tokens，数组中的数据有几条，就要遍历几条
  for (let i = 0; i < v.length; i++) {
    // 拼接返回，递归调用
    resultStr += renderTemplate(token[2], {
      // 现在这个数据小对象，是v[i]的展开，就是v[i]本身
      ...v[i],
    // 这里要补一个"."属性并且替代当前项
      '.': v[i]
    });
  }
  // 返回的结果会加到最后结果字符串中，由于最终测试的地方是数组
  // 因此思路要局限在数组的解析上
  // 递归调用renderTemplate
  return resultStr;
}