export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if(this.$el) {
      // 调用函数，让节点变为fragment,类似于mustache中的tokens，实际上用的是AST，这里是轻量级的，fragment
      let $fragment = this.node2Fragment(this.$el);
      // 编译
      this.compile($fragment);
    }
  }
    // createdocumentfragment()方法创建一虚拟的节点对象，节点对象包含所有属性和方法
  // 当你想提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用createdocumentfragment()方法
  // 也可使用文档对象来执行这些变化，但要防止文件结构被破坏，createdocumentfragment()方法可以更安全改变文档的结构及节点
  node2Fragment(el) {
    let fragment = document.createDocumentFragment();
    var child;
    // 从第一个元素循环
    // 判断child存不存在
    // 让所有DOM节点，都进入fragment
    while(child = el.firstChild) {
      // appendChild()方法可向节点的子节点列表的末尾添加新的子节点
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(el) {
    console.log(el);
    // 得到子元素
    let childNodes = el.childNodes;
    let self = this;
    childNodes.forEach(node => {
      let text = node.textContent;
      if(node.nodeType == 1) {
      // 元素节点
        self.compileElement(node);
      } else if(node.nodeType == 3) {
        // 文本节点
        let text = node.textContent;
        console.log(text);
      }
    })
  }
  compileElement(node) {
    console.log(node);
    // 这里的方便之处在于不是将HTML结构看成字符串，而是真正的属性列表
    // 得到身上的属性
    let nodeAttrs = node.attributes;
    // 类数组对象变为数组
    [].slice.call(nodeAttrs).forEach(attr => {
      // 这里就分析指令
      let attrName = attr.name;
      let value  = attr.value;
      // 指令都是v-开头的
      let dir = attrName.substring(2);
      // 看看是不是指令,==0代表以'v-'开头
      if(attrName.indexOf('v-') == 0) {
        //v-开头就是指令
        // 指令的触发
        if(dir == 'modal') {
          // 双向数据监听
          console.log('发现', value);
        } else if(dir == 'if') {
          console.log('if', value);
        }
      }
    });
  }

}