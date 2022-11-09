import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js'

var myVnode = h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
]);
const container = document.getElementById('container');
const btn = document.getElementById('btn');
patch(container, myVnode);

var myVnode1 = h('section', {}, [
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'M'}, 'M'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'B'}, 'B'),
]);
btn.onclick = function() {
  patch(myVnode, myVnode1);
}