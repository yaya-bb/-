import h from './mysnabbdom/h.js';
import patch from './mysnabbdom/patch.js'

const myVnode = h('h1', {}, '你好');
const container = document.createElement('div');

patch(container, myVnode);