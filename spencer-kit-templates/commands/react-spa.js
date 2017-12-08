'use strict'
var helper = require('./helper');
var fs = require('fs');
var reactMultipage = require('./react-multipage');
var dependencies = [
    'react-navigation'
];
function _exec(projectName){
    helper.rm('js/views');
    helper.cp('node_modules/spencer-kit-project-templates/templates/react_spa_project/js/','./js/');

    helper.rm('./templates');
    helper.cp('node_modules/spencer-kit-project-templates/templates/react_spa_project/templates/','./templates/');
    helper.rm('./scss');
    helper.cp('node_modules/spencer-kit-project-templates/templates/react_spa_project/scss/','./scss/');
    
    helper.replace('project.js','./js/views/pages/Index','./js/views');
}

function exec(projectName) {
    reactMultipage(projectName,{
        exec:_exec,
        dependencies
    })
}

module.exports = exec;