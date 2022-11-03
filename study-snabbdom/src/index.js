import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
// 创建虚拟节点
const vnode = h('a', {
  props: {
    href: 'http://www.baidu.com',
    target: '_blank'
  }
}, '百度');
const vnode1 = h('ul', [
  h('li', '苹果'),
  h('li', '西瓜'),
  h('li', '香蕉')
])
console.log(vnode);

// 让虚拟节点上树
const container = document.getElementById('container');
patch(container, vnode1);