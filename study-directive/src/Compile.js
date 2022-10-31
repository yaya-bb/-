export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if(this.$el) {
      // 调用函数，让节点变为fragment,类似于mustache中的tokens，实际上用的是AST，这里是轻量级的，fragment
      this.node2Fragment(this.$el);
    }
  }
  node2Fragment(el) {
    console.log(el);
  }
}