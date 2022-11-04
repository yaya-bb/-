import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
const container = document.getElementById('container');
const btn = document.getElementById('btn');

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);
const vnode1 = h('ul', [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C')
]);

const vnode2 = h('ul',  [
  // h('li', { key: 'D' }, 'D'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'C' }, 'C'),
]);
// 让虚拟节点上树
patch(container, vnode1);
// 点击按钮时，将vnode1上变为vnode2
btn.onclick = function() {
  patch(vnode1, vnode2);
}