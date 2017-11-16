var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: path.resolve('./'),
    entry:path.resolve('./demo/index.js'),
    output:{
        path:path.resolve('./demo'),
        filename:'index.bundle.js',
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: 'babel-loader',
                exclude: path.resolve('node_modules')
            }
        ],
    },
    devtool: 'cheap-module-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase:path.resolve('./demo'),
        compress: true,
        port: 8000,
        hot: true
    }
}