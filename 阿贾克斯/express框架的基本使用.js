// 1.在js文件中引入express
const express = require('express');
//2.创建应用对象
const app = express();
//3.创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/',(req,res) => {
    res.send("hello");
});
//4.监听端口启动服务
app.listen(8000,() =>{
console.log("服务器已经启动");
});