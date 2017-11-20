'use strict'
var helper = require('./helper');
var fs = require('fs');
var sh = require('shelljs');
var dependencies = [
];
var devDependencies = [
    'webpack',
    'gulp',
    'gulp-rename',
    'gulp-uglify',
    'shelljs'
];

function exec(projectName) {
    helper.mkdir('demo');
    helper.mkdir('dist');
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        build:'node build.js '+projectName
    }
    json.main = 'index.js';
    fs.writeFileSync('package.json',JSON.stringify(json));
    fs.writeFileSync('README.md','# '+projectName);
    helper.cp('node_modules/spencer-kit-project-templates/templates/npm_package', './');
    helper.replace('webpack.config.js',/npmpackage/g,helper.upperCaseName(projectName));
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;