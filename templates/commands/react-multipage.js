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
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        start:'node build.js --env dev --dest release',
        ft:'node build.js --env ft --dest release',
        uat:'node build.js --env uat --dest release',
        release:'node build.js --env release --dest release',
    }
    fs.writeFileSync('package.json',JSON.stringify(json));
    helper.mv('node_modules/spencer-kit-project-templates/templates/react_multipage', './');
    helper.mv('node_modules/spencer-kit-project-templates/common/buildConfig','./');
    helper.mv('node_modules/spencer-kit-project-templates/common/AppRegister.js','./');
    helper.mv('node_modules/spencer-kit-project-templates/common/AppRegister.prerender.js','./');
    helper.replace('project.js',/helloworld/g,projectName);  
    helper.exec('npm i ' + dependencies.join(' ') + ' -S');
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;