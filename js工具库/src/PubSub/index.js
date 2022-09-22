const PubSub = {
  // 订阅的唯一id
  id: 1,
  // 频道与回调保存容器
  callbacks: {
  }
};
// 订阅频道
// 第一个参数为频道，第二个参数为回调
PubSub.subscribe = function(channel, callback) {
  // 每个订阅都有唯一的编号
  let token = "token_" + this.id++;
  // pay token_1
  // 判断 callbacks属性中是否存在pay
  if (this.callbacks[channel]) {
    this.callbacks[channel][token] = callback;
  } else {
    // 没有则要初始化这个结构
    this.callbacks[channel] = {
      [token]: callback
    }
  }
}
// 发布信息
// 第一个参数为频道，第二个参数为数据
PubSub.publish = function(channel, data) {
  // 获取当前频道的所有回调
  if(this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach(callback => {
      // 执行回调
      callback(data);
    })
  }
}