'use strict'
var reactMixProject = require('./react-mix-project');
var npmPackage = require('./npm-package');
var reactMultipage = require('./react-multipage');
var reactPackage = require('./react-package');
var reactNative = require('./react-native');
var reactSPA = require('./react-spa');
var DEFAULT_TEMPLATE = 'react-mix-project';
function switchCommand(project,template){
    if(template===true){
        template = DEFAULT_TEMPLATE;
    }
    switch(template){
        case 'react-mix-project':
            reactMixProject(project);
        case 'react-multipage-project':
            reactMultipage(project);
            break;
        case 'react-spa-project':
            reactSPA(project);
            break;
        case 'react-package':
            reactPackage(project);
            break;
        case 'npm-package':
            npmPackage(project);
            break;
        case 'react-native':
            reactNative(project);
            break;
        case 'react-native-package':
            break;
        case 'react-mix-native':
            break;
    }
}

function exec(project,template){
    switchCommand(project,template)
}
module.exports = {exec}