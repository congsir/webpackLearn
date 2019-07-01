const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {smart} = require('webpack-merge');
const base = require('./webpack.base');
module.exports = smart(base,{
    output:{
        filename:'[name].min.js'
    },
    mode:'production',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name][hash:8].min.css',
            chunkFilename:'[id].css'
        })
    ]
}) 