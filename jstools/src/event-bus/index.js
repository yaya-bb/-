// 因为有方法，所以他的结构是一个对象
const eventBus = {
  // 使用对象保存数据
  // 保存类型与回调的容器
  callbacks: {

  }
};
// 绑定事件
eventBus.on = function (type, callback) {
  // 把事件类型和事件回调保存起来，再触发的以后去绑定类型看看是否有与之对应的绑定事件
  // 判断
  if(this.callbacks[type]) {
    // 如果callbacks属性中存在该类型事件
    this.callbacks[type].push(callback);
  } else {
    // 如果callbacks属性中存在该类型事件
    this.callbacks[type] = [callback];
  }
}
// 触发事件
eventBus.emit = function (type, data) {
  if(this.callbacks[type] && this.callbacks[type].length > 0){
    // 遍历数组
    this.callbacks[type].forEach(callback => {
      // 执行回调
      callback(data);
    })
  }
}
// 事件的解绑
eventBus.off = function(eventName) {
 // 若传入了eventName事件类型
 if(eventName) {
  // 只是删除eventName对应的事件回调
  delete this.callbacks[eventName];
 } else {
  // 全部清空
  this.callbacks = {};
 }
}