'use strict'
var helper = require('./helper');
var fs = require('fs');
var reactMultipage = require('./react-multipage');

function _exec(projectName){
    var projectEntry = 'projects/'+projectName+'.js';

    helper.replace('project.js','\'scss\'','\'scss/'+projectName+'\'');
    helper.replace('project.js','\'asset\'','\'asset/'+projectName+'\'');

    helper.mkdir('projects');
    helper.mv('project.js',projectEntry);

    helper.rename('asset',projectName);
    helper.mkdir('asset');
    helper.mv(projectName,'asset/'+projectName);

    helper.rename('scss',projectName);
    helper.mkdir('scss');    
    helper.mv(projectName,'scss/'+projectName);
    
    var ucName = helper.upperCaseName(projectName);

    helper.replace('package.json','ft','ft'+ucName);
    helper.replace('package.json','uat','uat'+ucName);
    helper.replace('package.json','release','prod'+ucName);
    helper.replace('package.json',/project.js/g,'projects/'+projectName+'.js');
}
function exec(projectName) {
    reactMultipage(projectName,{
        exec:_exec
    });
}

module.exports = exec;