// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { Template } = require('webpack')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',
    output: {
      // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
      // 打包后文件的文件
        filename: 'bundle.js',
      // 告诉webpack不使用箭头
        environment: {
            arrowFunction: false
        }
    },
    mode: 'development',
    module: {
        rules: [{
              // test指定的是规则生效的文件
              // 去匹配所有以ts为结尾的文件
                test: /\.ts$/,
                // 用ts-loader去处理以ts结尾的文件
                // 要使用的loader
                // 写在后面先执行
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            "edge": '105',
                                            'ie': '11'
                                        },
                                        'corejs': '3',
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env', {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }

                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [

        new HTMLWebpackPlugin({
            //模板
            template: "./src/index.html"

        }),
        new CleanWebpackPlugin(),
    ],

    resolve: {
        extensions: ['.ts', '.js']
    }
}