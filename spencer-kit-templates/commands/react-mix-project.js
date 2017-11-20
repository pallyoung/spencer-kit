'use strict'
var helper = require('./helper');
var fs = require('fs');
var reactMultipage = require('./react-multipage');

function exec(projectName) {
    reactMultipage(projectName);
    var projectEntry = 'projects/'+projectName+'.js';
    /**
     * 文件存在缓存 暂时先用一个setTimeout处理
     */
    setTimeout(function(){
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
        
    },3000);

}

module.exports = exec;