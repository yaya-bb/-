import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js'

var myVnode = h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
]);
const container = document.getElementById('container');
const btn = document.getElementById('btn');
patch(container, myVnode);

var myVnode1 = h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'M'}, 'M'),
  h('li', {key: 'Q'}, 'Q'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'K'}, 'K'),
]);
btn.onclick = function() {
  patch(myVnode, myVnode1);
}