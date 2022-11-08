import vnode from "./vnode";
import createElement from "./createElement";
export default function(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点?
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    // toLowerCase()变成小写字母
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // 精细比较
    // 判断新旧vnode是否是同一个对象
    if(oldVnode == newVnode) return;
    // 判断新vnode有没有text属性
    if(newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
      if(newVnode.text != oldVnode.text) {
        // 如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接把新的text写入老的elm中即可，如果老的elm中是children，那么也会立即消失掉
        oldVnode.elm.innerText = newVnode.text;
      } 
    } else {
      // 新vnode没有text属性
      // console.log('新vnode没有text属性');
      if(oldVnode.children != undefined && oldVnode.children.length > 0) {
        // 最复杂的情况：新老都有children

      } else {
        // 老的没有children，新的有children
        // 清空老的节点的内容
        oldVnode.elm.innerText = '';
        // 遍历新的vnode的子节点，创建DOM，上树
        for(let i = 0; i < oldVnode.children.length; i++) {
          // vnode.children没有sel，由于children可能为数组
          let dom = createElement(newVnode.children[i]);
          oldVnode.elm.appendChild(dom);
        }
      }
    }
  } else {
    console.log('暴力插入新的，删除旧的');
    // 需要.elm得到  
    let newVnodeElm = createElement(newVnode);
    if(oldVnode.elm.parentNode && newVnodeElm) {
      // 插入到老节点之前
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}