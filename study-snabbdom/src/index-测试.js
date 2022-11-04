import h from './mysnabbdom/h.js';
var myVnode = h('div', {}, [
  h('p', {}, '哈哈'),
  h('p', {}, '嘻嘻'),
]);
console.log(myVnode);