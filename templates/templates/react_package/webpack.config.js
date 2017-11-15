var webpack = require('webpack');
var path = require('path');

var entryJS = path.resolve('./src/index.js');
module.exports = function (env) {

    var config = {
        entry: { 'react-web-navigator': entryJS },
        output: {
            path: path.resolve('dist'),
            filename: '[name].js',
            library: 'ReactWebNavigator',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve('node_modules'),
                    loader: 'babel-loader'
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            contentBase: path.resolve('./test'),
            port: 3000,
            hot: true,
        }
    }
    if (env == 'dev') {
        config.output = {
            path: path.resolve('demo'),
            filename: '[name].bundle.js',
        };
        config.entry = { 'index': './test/js/index.js' }
        config.devtool = 'source-map';
        
    }
    return config;
}