import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js'

var myVnode = h('selection', {}, [
  h('li', {}, '哈哈'),
  h('li', {}, '嘻嘻'),
]);
const container = document.getElementById('container');
const btn = document.getElementById('btn');
patch(container, myVnode);

var myVnode1 = h('section', {}, '你好');
btn.onclick = function() {
  patch(myVnode, myVnode1);
}