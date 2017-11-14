var path = require('path');
module.exports = {
    entry: {
        'npmpackage': './index.js',
    },
    output: {
        path: path.resolve('./release'),
        filename: '[name].js',
        library: 'npmpackage',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}