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
        start:'node build.js --env dev --dist dist --entry ./projects/'+ projectName,
        release:'node build.js --env production --dist dist --entry ./projects/'+ projectName,
    }
    fs.writeFileSync('package.json',JSON.stringify(json));
    helper.mv('node_modules/spencer-kit-project-templates/templates/react_mix_project', './');
    helper.replace('projects/helloworld.js',/hello world/g,projectName);  
    helper.rename('projects/helloworld.js','projects/'+projectName+'.js');
    helper.rename('scss/helloworld','scss/'+projectName);
    helper.replace('scss/helloworld','scss/'+projectName);
    helper.exec('npm i ' + dependencies.join(' ') + ' -S');
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;