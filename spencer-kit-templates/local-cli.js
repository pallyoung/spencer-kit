#!/usr/bin/env node
var minimist = require('minimist');
var commands = require('./commands');

var options = minimist(process.argv.slice(2));
function start(options){
    commands.exec(options.p,options.t);
}
start(options)
