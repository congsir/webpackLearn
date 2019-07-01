const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    entry:{
        index:'./src/static/js/index.js',
        user:'./src/static/js/user.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    minSize:0,
                    minChunks:2,
                    chunks:'initial'
                },
                vendor:{
                    minSize:0,
                    minChunks:2,
                    chunks:'initial',
                    priority:1,    // 权重，用于在公共模块之前进行抽离
                    test:/node_modules/,   // 匹配规则，在node_modules中进行抽离
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/i,
                use:[
                     MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.js$/i,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            "@babel/preset-env"
                        ],
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ],
                    }
                }
            },
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        outputPath:'static/images',
                        publicPath:'/static/images',
                        limit: 10240,
                        hash:true
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./src/view/user.html',
            filename:'view/user.html',
            chunks:['user']
        }),
        
        new webpack.BannerPlugin("made by insper 2019/7/1")
    ]
}