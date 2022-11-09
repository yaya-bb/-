import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js'

var myVnode = h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);
const container = document.getElementById('container');
const btn = document.getElementById('btn');
patch(container, myVnode);

var myVnode1 = h('section', {}, [
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'C'}, 'CC'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'A'}, 'AA'),
]);
btn.onclick = function() {
  patch(myVnode, myVnode1);
}