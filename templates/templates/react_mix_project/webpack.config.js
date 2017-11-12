var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssExtractTextPlugin =  new ExtractTextPlugin("css/[name].css");

var path = require('path');
var defaultConfig = {
    context: dir.source,
    output: output,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve('node_modules')
            },
            {
                test: /\.css$/,
                loader: cssExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.scss$/,
                use: cssExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ],
    },
    plugins: [
        cssExtractTextPlugin
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}


function buildConfig(argv) {
    argv = argv.split('--');

    var config;
    var env = argv[0];
    var entry = argv[1];
    var output = argv[2];
    if (env == 'dev') {
        config = require('./webpack.config.dev.js')
    } else {
        config = require('./webpack.config.prod.js')
    }

    config = Object.assign({}, defaultConfig, config);
    config.plugins.push(new webpack.DefinePlugin({
        env: JSON.stringify(env)
    }))
    config.entry = JSON.parse(decodeURI(entry));
    config.output.path = path.resolve('./', output);
    return config;
}

module.exports = buildConfig;