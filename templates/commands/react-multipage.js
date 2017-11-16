'use strict'
var helper = require('./helper');
var fs = require('fs');
var dependencies = [
    'react',
    'react-dom',
    'es5-shim',
    'es6-shim',
    'es7-shim',
    'mlux',
    'web-http',
    'js-console'
];
var devDependencies = [
    'babel-core',
    'babel-loader',
    'babel-polyfill',
    'babel-preset-env',
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
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        start:'node build.js --env dev --dist dist --entry project.js',
        ft:'node build.js --env ft --dist dist --entry project.js',
        uat:'node build.js --env uat --dist dist --entry project.js',
        release:'node build.js --env prod --dist dist --entry project.js',
    }
    fs.writeFileSync('package.json',JSON.stringify(json));
    helper.mkdir('buildConfig');
    helper.mv('node_modules/spencer-kit-project-templates/templates/react_multipage', './');
    helper.replace('buildConfig/BuildConfig.js',/helloworld/g,projectName);  
    helper.replace('project.js',/helloworld/g,projectName);  
    helper.exec('npm i ' + dependencies.join(' ') + ' -S');
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;