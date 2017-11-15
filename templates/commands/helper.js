'use strict'
var fs = require('fs');
var path = require('path');
var processExec = require('child_process').exec;
function rf(src, callback) {
    if (fs.existsSync(src)) {
        var stats = fs.statSync(src);
        callback(src);
        if (stats.isDirectory(src)) {
            fs.readdirSync(src).forEach(function (file) {
                rf(path.join(src, file), callback);
            })
        }
    }
}
function mv(src, dest) {
    rf(src, function (file) {
        var stats = fs.statSync(file);
        var destFile = file.replace(src, dest).replace(/\/\//g, '/');
        if (stats.isDirectory()) {
            !fs.existsSync(destFile) && fs.mkdirSync(destFile);
        } else {
            destFile = destFile.replace(/\/_\w/, function (w) {
                return w.replace('_', '.');
            })
            fs.writeFileSync(destFile, fs.readFileSync(file));
            // fs.createReadStream(file).pipe(fs.createWriteStream(destFile));
        }
    })
}
function rm(src) {
    if (fs.existsSync(src)) {
        let stats = fs.statSync(src);
        if (stats.isDirectory()) {
            fs.readdirSync(src).forEach(function (file) {
                rm(path.join(src, file));
            })
            fs.rmdirSync(src);
        } else {
            fs.unlinkSync(src);
        }
    }
}

function rename(src, dest) {
    fs.renameSync(src, dest);
}
function replace(src, patten, value) {
    if (fs.existsSync(src)) {
        var result = fs.readFileSync(src).toString().replace(patten, value);
        fs.writeFileSync(src, result);
    }
}
function exec(cmd) {
    var c = processExec(cmd);
    c.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
    c.stderr.on('data', function (data) {
        process.stderr.write(data);
    });
}
function mkdir(path) {
    fs.mkdirSync(path);
}
function upperCaseName(name) {
    return name.replace(/-\w/g, function (c) {
        return c[1].toUpperCase();
    }).replace(/^\w/, function (c) {
        return c.toUpperCase();
    });
}
var exports = {
    mv,
    rename,
    rm,
    replace,
    exec,
    mkdir,
    upperCaseName
}

var command = process.argv.slice(2);
if (exports[command[0]]) {
    exports[command[0]].apply(exports, command.slice(1));
}
module.exports = exports;