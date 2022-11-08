import createElement from "./createElement";

export default function patchVnode(oldVnode, newVnode) {
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
        // 需要多加一个指针un
        // 所有未处理的节点的开头
        let un = 0;
        // 新创建的节点(newVnode.children[i].elm)插入到所有未处理的节点(oldVnode.children[un].elm)之前，而不是所有已处理节点之后
        for(let i = 0; i < newVnode.children.length; i++) {
          let ch = newVnode.children[i];
          // 不存在
          let isExist = false;
          // 再次遍历，看看oldVnode中有没有节点和它是相同的
          for(let j = 0; j < oldVnode.children.length; j++) {
            if(oldVnode.children[j].sel == ch.sel && oldVnode.children[j].key == ch.key) {
              isExist = true;              
            }
          }
          if(!isExist) {
            console.log(ch);
            let dom = createElement(ch);
            // 改变这个节点为elm
            ch.elm = dom;
            // 上树
            if(un < oldVnode.children.length) {
              oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
            } else {
              // 在后面追加
              oldVnode.elm.appendChild(dom);
            }         
          } else {
            // 让处理的节点指针下移
            un++;
          }
        }
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
}