'use strict'
var reactMixProject = require('./react-mix-project');
var npmPackage = require('./npm-package');
var reactMultipage = require('./react-multipage');
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
        case 'react-package':
            
            break;
        case 'npm-package':
            npmPackage(project);
            break;
        case 'react-native':
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