import Watcher from './Watcher'
// 1、解析Vue根节点中的节点内容，检查Vue相关的指令
// 2、将Vue指令转化为Dom节点的相关内容，在视图上显示我们预期的内容
// 3、对某些使用Vue数据和指令的节点做一些额外的处理，使Vue中data内部某些属性改变时，视图也能自动改变
export default class Compile {
  // el 视图
  // vue 全局vue对象
  // 创建内存中的DOM对象(创建虚拟DOM)
  constructor(el, vue) {
    // 缓存重要属性
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if(this.$el) {
      // 调用函数，让节点变为fragment,类似于mustache中的tokens，实际上用的是AST，这里是轻量级的，fragment
      // 在内存中创建一个和$el相同的元素节点
      // 创建一个存在于内存中的dom对象，将$el的孩子加入到内存中，内容和vue根节点中的DOM节点相同
      /*
      * 原因：当我们直接去操作dom节点的时候，对节点的一些操作会导致浏览器的重新渲染。
      *
      * 解决方法: 将关于dom节点的所有内容保存一份到内存中，当内存中的dom对象完成编译(Vue相关指令、语法的解析)后，
      * 再将其直接挂载到dom上，这样可以减少浏览器的渲染次数，提高性能
      */
      let $fragment = this.node2Fragment(this.$el);
      // 解析模板($el节点)
      this.compile($fragment);
      // 将解析后的节点重新挂载到DOM树上
      this.$el.appendChild($fragment);
    }
  }
  /*
   createdocumentfragment()方法创建一虚拟的节点对象，节点对象包含所有属性和方法
   当你想提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用createdocumentfragment()方法
   也可使用文档对象来执行这些变化，但要防止文件结构被破坏，createdocumentfragment()方法可以更安全改变文档的结构及节点
  */
  // 把节点移动到内存中
  node2Fragment(node) {
    // 创建文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    // 从第一个元素循环
    // 判断child存不存在
    // 让所有DOM节点，都进入fragment
    while(firstChild = node.firstChild) {
      // appendChild()方法可向节点的子节点列表的末尾添加新的子节点
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  // Compile构造函数将虚拟Dom的根节点传入到这个函数，然后对其子节点进行遍历
  compile(el) {
    // 遍历根节点中的子节点
    let childNodes = el.childNodes;
    let self = this;
    // 正则 {{}}
    var reg = /\{\{(.*)\}\}/;
    childNodes.forEach(node => {
      let text = node.textContent;
      if(node.nodeType == 1) {
      // nodeType == 1 -> 元素节点
      // 解析元素节点的属性，查看是否存在Vue指令
        self.compileElement(node);
      } else if(node.nodeType == 3 && reg.test(text)) {
        let name = text.match(reg)[1];
        // 将{{xx}}替换为真正的值
        self.compileText(node, name);
      }
    })
  }
  compileElement(node) {
    // console.log(node);
    // 这里的方便之处在于不是将HTML结构看成字符串，而是真正的属性列表
    // 得到身上的属性
    let nodeAttrs = node.attributes;
    // 类数组对象变为数组
    let self = this;
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
          // 第一件事情: 添加Watcher
          // 第一个参数：监听哪个对象实例，第二个参数: 哪个对象怎样的表达式【订阅的属性名】，第三个参数：数据变化后要执行的回调
          // value属性值
          new Watcher(self.$vue, value, value => {
            node.value = value;
          });
          // 得到值
          let v = self.getVueVal(self.$vue, value);
          // 显示值-双向绑定
          node.value = v;
          // 添加监听事件
          node.addEventListener('input', e => {
            let newVal = e.target.value;
            // 将value设置为新值newVal
            self.setVueVal(self.$vue, value, newVal);
            v = newVal;
          });
        } else if(dir == 'if') {
          console.log('if', value);
        }
      }
    });
  }
  compileText(node, name) {
    // 如果文本内容存在{{}},则对文本内容进行响应的替换，将{{xx}}替换为真正的值
    node.textContent = this.getVueVal(this.$vue, name);
    // 添加监听,收集依赖，实现视图更新
    new Watcher(this.$vue, name, value => {
      // 监听新的变化
      node.textContent = value;
    });
  }
  // vue: 原型，exp是.语法
  getVueVal(vue, exp) {
    // 获取属性值
    var val = vue;
    exp = exp.split('.');
    // 一层一层的存进去
    exp.forEach(k => {
      val = val[k];
    });
    console.log(val);
    return val;
  };
  setVueVal(vue, exp, value) {
    // 将value赋值给Vue实例$data上的属性
    var val = vue;
    exp = exp.split('.');
    // 一层一层的存进去
    // 因为设置和序号相关，所以需要添加index
    exp.forEach((k, index) => {
      // 需要判断最后是否不是最后一个
      if(index < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
    console.log(val);
    return val;
  }
}