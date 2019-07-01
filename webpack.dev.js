const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {smart} = require('webpack-merge');
const base = require('./webpack.base');
module.exports = smart(base,{
    output:{
       filename: 'static/js/[name].js'
    },
    mode:'development',
    devServer:{
        port:'8080',
        open:true,
        progress:true,
        contentBase:'/dist'
    },
    watch:true,
    watchOptions:{
        poll:1000,
        aggregateTimeout:500,
        ignored:/node_modules/
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'static/css/[name][hash:8].css',
            chunkFilename:'static/css/[id].css'
        })
    ],
    devtool:'source-map'
}) 