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
  // 返回频道订阅的id
  return token;
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
/* 取消频道 */
// 取消消息频道
// 1）没有传值，flag为undefined ==> 全部取消
// 2）传入token字符串 ==> 把其中某一个订阅取消掉
// 3）msgName字符串 ==> 把频道的所有订阅都取消掉
PubSub.unsubscribe = function(flag) {
  // 如果flag为undefined则清空所有订阅
  if(flag === undefined) {
    this.callbacks = {};
  } else if(typeof flag === 'string') {
    // 判断是否为token_开头
    if(flag.indexOf('token_') === 0) {
      // 如果是，表明是一个订阅id
      // callbackObj指callback中的某一个带有token的对象
      let callbackObj = Object.values(this.callbacks).find(obj => obj.hasOwnProperty(flag))
      if (callbackObj) {
        delete callbackObj[flag];
      }
    } else {
      // 表明是一个频道的名称
      delete this.callbacks[flag];
    }
  }
}