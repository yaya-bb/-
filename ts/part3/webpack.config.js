// 引入一个包
const path = require('path');

// webpack中的所有配置信息都应该卸载module.exports中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: "bundle.js",
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        // 去匹配所有以ts为结尾的文件
        test: /\.ts$/,
        // 用ts-loader去处理以ts结尾的文件
        // 要使用的loader
        use: 'ts-loader',
        // 要排除的文件
        exclude: /node_modules/

      }
    ]
  }


}