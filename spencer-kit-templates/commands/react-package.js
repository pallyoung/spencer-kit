'use strict'
var helper = require('./helper');
var fs = require('fs');
var sh = require('shelljs');
var dependencies = [
];
var devDependencies = [
    'webpack',
    'babel-loader',
    'webpack-dev-server',
    'react',
    'react-dom',
    'babel-core',
    'babel-preset-env',
    'babel-preset-react',
    'babel-preset-stage-3',
    'gulp',
    'gulp-rename',
    'gulp-uglify',
    'shelljs'
];

function exec(projectName) {
    var upperCaseName = helper.upperCaseName(projectName);
    helper.mkdir('dist');
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        build: 'node build.js --src src --dist dist' ,
        start: 'npm run build && node_modules/.bin/webpack-dev-server'
    }
    json.main = 'index.js';
    json.module = 'src/index.js';
    
    fs.writeFileSync('package.json', JSON.stringify(json));
    fs.writeFileSync('README.md', '# ' + projectName);
    helper.cp('node_modules/spencer-kit-project-templates/templates/react_package', './');
    helper.replace('demo/index.js',/HelloWorld/ig, helper.upperCaseName(projectName));
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;