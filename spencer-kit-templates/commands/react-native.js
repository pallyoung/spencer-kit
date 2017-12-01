'use strict'
var helper = require('./helper');
var fs = require('fs');
var sh = require('shelljs');

var dependencies = [
    "mlux",
    "prop-types",
    "react",
    "react-native",
    "react-native-alertui",
    "react-native-improver",
    "react-native-modalui",
    "react-native-storage-tool",
    "react-navigation"
];
var devDependencies = [
    "babel-jest",
    "babel-preset-react-native",
    "jest",
    "react-test-renderer",
];
function exec(projectName) {
    var json = JSON.parse(fs.readFileSync('package.json'));
    json.scripts = {
        "start": "node node_modules/react-native/local-cli/cli.js start",
        "test": "jest"
    };
    json.jest = {
        "preset": "react-native"
    };
    helper.cp('node_modules/spencer-kit-project-templates/templates/react_native', './')
    helper.exec('npm i ' + dependencies.join(' ') + ' -S');
    helper.exec('npm i ' + devDependencies.join(' ') + ' -D');
}
function init() {

}
module.exports = exec;