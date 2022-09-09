// function Promise(executor) {
//   this.PromiseState = 'pending';
//   this.PromiseResult = null;
//   const that = this;
//   this.callbacks = [];
//   function resolve(data) {
//     // 如果有值，直接返回,则可以保证Promise对象只能修改一次
//     if(that.PromiseState !== 'pending') return;
//     // 1.修改对象的状态(PromiseState)
//     that.PromiseState = 'fulfilled';
//     // 2.设置对象结果值(PromiseResult)
//     that.PromiseResult = data;
//     //调用成功的回调函数
//     //当我们改变完状态后，then回调函数要执行就必须要进队列
//     //执行回调函数是异步的
//     //保证与内置promise表现一样
//     setTimeout(() => {
//       that.callbacks.forEach(item => {
//         item.onResolved(data);
//       });
//     })
//   }
//   // reject函数
//   function reject(data) {
//     if(that.PromiseState !== 'pending') return;
//     // 1.修改对象的状态(promiseState)
//     that.PromiseState = 'rejected';
//     // 2.设置对象结果值
//     that.PromiseResult = data;
//     setTimeout(() => {
//       that.callbacks.forEach(item => {
//         item.onRejected(data);
//       });
//     })
//   }
//   try {
//     // 同步调用-执行器函数
//     executor(resolve, reject);
//   } catch(e) {
//     reject(e);
//   }
//   // 【执行器函数】同步调用
//   // executor(resolve, reject);
// }
class Promise {
  //构造方法
  constructor(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    const that = this;
    this.callbacks = [];
    function resolve(data) {
      // 如果有值，直接返回,则可以保证Promise对象只能修改一次
      if(that.PromiseState !== 'pending') return;
      // 1.修改对象的状态(PromiseState)
      that.PromiseState = 'fulfilled';
      // 2.设置对象结果值(PromiseResult)
      that.PromiseResult = data;
      //调用成功的回调函数
      //当我们改变完状态后，then回调函数要执行就必须要进队列
      //执行回调函数是异步的
      //保证与内置promise表现一样
      setTimeout(() => {
        that.callbacks.forEach(item => {
          item.onResolved(data);
        });
      })
    }
    //reject 函数
    function reject(data){
      //判断状态
      if(self.PromiseState !== 'pending') return;
      //1. 修改对象的状态 (promiseState)
      self.PromiseState = 'rejected';// 
      //2. 设置对象结果值 (promiseResult)
      self.PromiseResult = data;
      //执行失败的回调
      setTimeout(() => {
          self.callbacks.forEach(item => {
              item.onRejected(data);
          });
      });
    }
    try{
      //同步调用『执行器函数』
      executor(resolve, reject);
    }catch(e){
        //修改 promise 对象状态为『失败』
      reject(e);
    }
  }
  //then 方法封装
  then(onResolved, onRejected) {
    const that = this;
    // 返回的结果为Promise对象（res就是return new promise）
    // 要想改变res的状态就必须在执行器内部调resolve/reject
    return new Promise((resolve, reject) => {
      function callback(type) {
        // 为解决throw抛出异常问题，使用try...catch
        try{
          // 成功结果
          let result = type(that.PromiseResult);
          if (result instanceof Promise) {
          // 如果result是一个promise对象
          // 如果成功走第一个回调函数,失败走第二个回调函数
          // result相当于html中res里面的return
          result.then(v => {
            resolve(v);
          },r => {
            reject(r);
          })
          } else{
            // 结果的对象状态为成功，并设置它成功的结果为return的结果
            resolve(result);
          }
        } catch(e){
          reject(e);
        }
      }
      // 异步操作实现
      if (this.PromiseState === 'fulfilled') {     
        setTimeout(() => {
          callback(onResolved);
        });
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected);
        })
      }
      // 判断padding的状态
      if (this.PromiseState === 'pending') {
        // 保存回调函数
        // 异步修改状态then
        this.callbacks.push ({
          onResolved: function() {
            callback(onResolved);
          },
          onRejected: function() {
            callback(onRejected);
          }
        })
      }
    })
  }
  // catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
// 添加resolve 方法,resolve属于promise函数对象，不是属于实例对象
//表明静态资源，属于类不属于实例对象
  static resolve(value) {
    // 返回Promise实例对象
    return new Promise((resolve, reject) => {
      if(value instanceof Promise){
        // 是Promise可以调用then方法
        value.then(v =>{
          resolve(v);
        },r => {
          reject(r);
        })
      }else{
        //状态设置为成功
        resolve(value);
      }
    })
  }
// 添加reject方法,reject属于promise函数对象，不是属于实例对象
  static reject(reason) {
    // 返回Promise实例对象
    return new Promise((reject) => {
        reject(reason);
    })
  }
  // 添加all方法
  static all(promises) {
    // 返回的结果为Promise对象
    return new Promise((resolve, reject) => {
      //声明变量
      let count = 0;
      // 存放成功结果的数组
      let arr = [];
      //遍历
      for(let i = 0; i < promises.length; i++) {
        //如果是promise对象，就可以调用then方法
        promises[i].then(v => {
          // 如果成功则调用这里面的代码
          //得知对象的状态是成功的
          //每个promise对象都成功
          count++;
          //将当前promise对象成功的结果存入到数组中
          arr[i] = v;
          //判断
          if(count === promises.length){
            // 修改状态
            resolve(arr);
          }
        },r =>{
          reject(r);
        })
      }
    })
  }
  //添加race方法
  static race(promises) {
    return new Promise((resolve,reject) => {
      for(let i = 0; i < promises.length; i++) {
        //如果是promise对象，就可以调用then方法
        promises[i].then(v => {
          // 谁先状态改变则返回 哪个
          resolve(v);
        }, r =>{
          reject(r);
        })
      }
    })
  }
}
