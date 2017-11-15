'use strict'
var helper = require('./helper');
var fs = require('fs');
var sh = require('shelljs');
var dependencies = [
];
var devDependencies = [
    'react',
    'react-dom',
    'babel-core',
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-3',
    'gulp',
    'gulp-rename',
    'gulp-uglify',
    'shelljs'
];

function exec(projectName) {
    var upperCaseName = helper.upperCaseName(projectName);
    helper.mkdir('demo');
    helper.mkdir('dist');
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        build: 'node build.js --src src --dist dist' ,
        dev: 'node build.js --src src --dist dist'
    }
    json.main = 'index.js';
    fs.writeFileSync('package.json', JSON.stringify(json));
    fs.writeFileSync('README.md', '# ' + projectName);
    helper.mv('node_modules/spencer-kit-project-templates/templates/npm_package', './');
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;