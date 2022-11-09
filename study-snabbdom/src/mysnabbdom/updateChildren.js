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

  let keyMap = null;
  while(oldStartId <= oldEndId && newStartId <= newEndId) {
    // 首先不是判断一二三四命中，而是要略过已经加undefined标记的东西
    if(oldStartVnode == null || oldCh[oldStartId] == undefined) {
      oldStartVnode = oldCh[++oldStartId];
    } else if(oldEndVnode == null || oldCh[oldEndId] == undefined) {
      oldEndVnode = oldCh[--oldEndId];
    } else if(newStartVnode == null || newCh[newStartId] == undefined) {
      newStartVnode = newCh[++newStartId];
    } else if(newEndVnode == null || newCh[newEndId] == undefined) {
      newEndVnode = newCh[--newEndId];
    } else if(checkSameVnode(oldStartVnode, newStartVnode)) {
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
    } else {
      // 四种命中都没有命中
      // 寻找key的map
      // 制作keyMap一个映射对象，这样就不用每次都遍历老对象
      if(!keyMap) {
        keyMap = {};
        // 从oldStartId开始，到oldEndId结束，创建keyMap映射对象
        for(let i = oldStartId; i <= oldEndId; i++) {
          const key = oldCh[i].key;
          if(key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前这项(newStartId)这项在keyMap中的映射的位置序号
      const idInOld = keyMap[newStartVnode.key];
      console.log(idInOld);
      if(idInOld == undefined) {
        // 判断，如果idInOld是undefined表示它是全新的项
        // 被加入的项(就是newStartVnode这项)现在不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined,不是全新的项，而是要移动
        // 存储移动的项
        const elmToMove = oldCh[idInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined,表示我已经处理完这项了
        oldCh[idInOld] = undefined;
        // 移动，调用insertBefore也可以实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // 指针下移，只移动新的头
      newStartVnode = newCh[++newStartId];
    }
  }
  // 继续看看有没有剩余的,循环结束了start还是比old小，说明有新增项
  // 因此需要插入这些节点
  if(newStartId <= newEndId) {
    console.log('new还有剩余节点没有处理,要加项。要把所有剩余的节点都插入到oldStartId之前');
    // 插入的标杆，因为在插入之前可能会存在新后和旧后的对比，你需要确定新后和旧后对比的最后一次，插入到最后一次之前
    // 遍历新的newCh，添加老的没有处理的之前
    for(let i = newStartId; i <= newEndId; i++) {
      console.log('新增');
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去，和appendChild是一致的
      // newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartId].elm);
    }
  } else if(oldStartId <= oldEndId) {
    // 只能删除中间项，不能删除最后一项
    console.log('old还有剩余节点没有处理');
    // 表示有删除节点
    // 批量删除oldStart和oldEnd指针之间的项
    for(let i = oldStartId; i <= oldEndId; i++) {
      if(oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}