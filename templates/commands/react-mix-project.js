'use strict'
var helper = require('./helper');

var sh = require('shelljs');
var dependencies = [
    'react',
    'react-dom',
    'mlux',
    'web-http',
    'js-console'
];
var devDependencies = [
    'babel-core',
    'babel-loader',
    'babel-polyfill',
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-3',
    'css-loader',
    'extract-text-webpack-plugin',
    'glob',
    'gulp',
    'gulp-clean-css',
    'gulp-concat',
    'gulp-connect',    
    'gulp-hash',
    'gulp-inject',
    'gulp-rename',
    'gulp-replace',
    'gulp-uglify',
    'sass-loader',
    'string-loader',
    'style-loader',
    'webpack',
    'http-proxy-middleware',
];

function exec(projectName) {
    helper.mv('node_modules/spencer-kit-project-templates/templates/react_mix_project', './');
    sh.exec('npm i ' + depdencies.join('\s') + ' -S');
    sh.exec('npm i ' + devDependencies.join('\s') + ' -D');
}

module.exports = exec;