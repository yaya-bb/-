import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是不是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key && a.key;
}
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log('update');
  // 旧前
  let oldStartId = 0;
  // 新前
  let newStartId = 0;
  // 旧后
  let oldEndId = oldCh.length - 1;
  // 新后
  let newEndId = newCh.length - 1;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 新前节点
  let newStartVnode = newCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndId];
  // 新后节点
  let newEndVnode = newCh[newEndId];

  while(oldStartId <= oldEndId && newStartId <= newEndId) {
    if(checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('①');
      // 对比
      patchVnode(oldStartVnode, newStartVnode);
      // 指针后移[先后移后使用]
      oldStartVnode = oldCh[++oldStartId];
      newStartVnode = newCh[++newStartId];
    } else if(checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log('②');
      // 新后和旧后
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndId];
      newEndVnode = newCh[--newEndId];
    } else if(checkSameVnode(oldStartVnode,newEndVnode)) {
      console.log('③');
      patchVnode(oldStartVnode, newEndVnode);
      // 当新后与旧前命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧后的后面【当前最后一个未处理的节点】
      // 为什么有使用appendChild，是因为appendChild是所有子元素的前面，而就后不一定是所有子元素后面
      // 如何移动节点？只要你插入一个已经在DOM树上的节点，它就会移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartId];
      newEndVnode = newCh[--newEndId];
    }  else if(checkSameVnode(oldEndVnode,newStartVnode)) {
      console.log('④');
      patchVnode(oldEndVnode,newStartVnode);
      // 当新前与旧后命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling);
      oldEndVnode = oldCh[--oldEndId];
      newStartVnode = newCh[++newStartId];
    }
  }
}