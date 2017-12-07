var webpack = require('webpack');
var path = require('path');

var defaultConfig = {
    context: path.resolve(__dirname, './'),
    output: {
        filename: '[name].js',
        publicPath: ""
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve('node_modules')
            }
        ],
    },
    plugins: [
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'build-config':'BuildConfig',
        'app-register':'AppRegister'
    }
}


function buildConfig(argv) {
    argv = argv.split('--');

    var config = defaultConfig;
    var env = argv[0];
    var entry = argv[1];
    var output = argv[2];
    if (env == 'dev') {
        config.devtool = 'source-map';
        config.plugins.concat([
            new webpack.DefinePlugin({
                env: JSON.stringify(env),
                __DEV__: true,
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        ])
    } else {
        config.devtool = 'source-map';
        config.plugins.concat([
            new webpack.DefinePlugin({
                env: JSON.stringify(env),
                __DEV__: false,
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        ]);
    }
    config.entry = JSON.parse(decodeURI(entry));
    config.output.path = path.resolve('./', output);
    return config;
}

module.exports = buildConfig;