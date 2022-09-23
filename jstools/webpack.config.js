// 引入nodejs内置模块path
const path = require('path');
module.exports = {
  // 模式
  mode: 'development',
  // 也可以使用production
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 打包文件夹
    path: path.resolve(__dirname, 'dist'),
    // 打包文件
    filename: 'jstools.js',
    // 想外暴露的对象的名称
    library: 'Utils',
    // 打包生成库可以通过esm/commonjs/reqirejs的语法导入
    libraryTarget: 'umd',
  },
}