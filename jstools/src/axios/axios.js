function axios({method, url, params, data}){
  // 解构函数进行封装对其参数进行接收{}
  //方法转化大写
  method = method.toUpperCase();
  //返回值
  return new Promise((resolve, reject) => {
      //四步骤
      //1. 创建对象
      const xhr = new XMLHttpRequest();
      //2. 初始化
      // 处理params对象，将其转化为字符串
      let str = '';
      for(let k in params){
          str += `${k}=${params[k]}&`;
      }
     // 进行截取，第一位到最后一位
      str = str.slice(0, -1);
      xhr.open(method, url+'?'+str);
      //3. 发送
      if(method === 'POST' || method === 'PUT' || method === 'DELETE'){
          //Content-type mime类型设置
          xhr.setRequestHeader('Content-type','application/json');
       // 设置请求体，需把对象转化为字符串
          xhr.send(JSON.stringify(data));
      }else{
          xhr.send();
      }
     // 响应结果映射：设置响应结果的类型为JSON
      xhr.responseType = 'json';
      //4. 处理结果
      xhr.onreadystatechange = function(){
          //
          if(xhr.readyState === 4){
              //判断响应状态码 2xx
              if(xhr.status >= 200 && xhr.status < 300){
                  //成功的状态
                 // status成功的状态码，message成功状态响应字符串，body相应体
                  resolve({
                      status: xhr.status,
                      message: xhr.statusText,
                      body: xhr.response
                  });
              }else{
                  reject(new Error('请求失败, 失败的状态码为' + xhr.status));
              }
          }
      }

  });
}
axios.get = function(url, options) {
  // 发送ajax请求 GET
  let config = Object.assign(options,{method: 'GET', url: url});
  return axios(config);
}
axios.post = function(url, options) {
  // 发送ajax请求 GET
  let config = Object.assign(options,{method: 'POST', url: url});
  return axios(config);
}
axios.put = function(url, options) {
  // 发送ajax请求PUT
  let config = Object.assign(options,{method:'PUT', url: url});
  return axios(config);
}