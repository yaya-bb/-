import patchVnode from "./patchVnode";
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

  while(oldStartId <= oldEndId && newStartId <= newStartId) {
    if(checkSameVnode(oldStartVnode, newStartVnode)) {

    }
  }
}