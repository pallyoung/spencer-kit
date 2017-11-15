'use strict'
var helper = require('./helper');
var fs = require('fs');
var sh = require('shelljs');
var dependencies = [
];
var devDependencies = [
    'react',
    'react-dom',
    'webpack',
    'babel-core',
    'babel-loader',
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-3',
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
        build: 'node build.js ' + projectName,
        dev: 'node build.js ' + projectName + '--dev'
    }
    json.main = 'index.js';
    fs.writeFileSync('package.json', JSON.stringify(json));
    fs.writeFileSync('README.md', '# ' + projectName);
    helper.mv('node_modules/spencer-kit-project-templates/templates/npm_package', './');
    helper.replace('webpack.config.js', /npmpackage/g, projectName);
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}

module.exports = exec;