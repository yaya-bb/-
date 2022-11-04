import vnode from './vnode';

// 这个函数必须接受3个参数，缺一不可
// 相当于它的重载功能较弱
/*
*  也就是说，调用的时候形态必须是下面的三种之一:
*  形态一：h('div', {}, '文字');
*  形态二：h('div', {}, []);
*  形态三：h('div', {}, h());
*/
export default function(sel, data, c) {
  // 检查参数的个数
  if(arguments.length != 3) {
    throw new Error('h() takes exactly 3 arguments');
  }
  // 检查参数c的类型
  if(typeof c == 'string' || typeof c == 'number') {
    // 说明现在调用h函数是形态一
    return vnode(sel, data, undefined, c, undefined);
  } else if(Array.isArray(c)) {
    // 说明现在调用h函数是形态二
    let children = [];
    // 遍历c,收集children
    for(let i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象, 如果不满足
      if(!(typeof c[i] == 'object' || c.hasOwnProperty('sel'))) {
        throw new Error('h() takes an array of objects or selectors');
      }
      children.push(c[i]);
    }
    // 循环结束了，就说明children收集完毕，此时可以返回虚拟节点，有children属性
    return vnode(sel, data, children, undefined, undefined);
  } else if(typeof c == 'object' && c.hasOwnProperty('sel')) {
    // 说明现在调用h函数是形态三
    // 传入的c是唯一的children,不用执行c，因为测试语句中已经执行了c
    let children = [c];
  } else {
    throw new Error('此h函数必须传入三个参数')
  }
}

