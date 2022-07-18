// 1.在js文件中引入express
const express = require('express');
//2.创建应用对象
const app = express();
//3.创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/server',(request,response) => {
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send("hello");
});
app.post('/server',(request,response) => {
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应头，所有相应头都可以接受
    response.setHeader('Access-Control-Allow-Headers','*');
    response.send("hello POST");
});
app.all('/JSON-server',(request,response) => {
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应头，所有相应头都可以接受
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name: 'test'
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);


    
});
//4.监听端口启动服务
app.listen(8000,() =>{
console.log("服务器已经启动");
})