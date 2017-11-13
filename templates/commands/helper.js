'use strict'
var fs = require('fs');
var path = require('path');
function rf(src,callback){
    if(fs.existsSync(src)){
        var stats=fs.statSync(src);
        callback(src);
        if(stats.isDirectory(src)){
            fs.readdirSync().forEach(function(file){
                rf(path.join(srr,file),callback);
            })
        } 
    }
}
function mv(src,dest){
    rf(src,function(file){
        if(file!==src){
            var stats=fs.statSync(file);
            var destFile = file.replace(src,dest).replace(/\/\//g,'/');
            if(stats.isDirectory()){
                fs.mkdirSync(destFile);
            }else{
                destFile = destFile.replace(/\/_\w/,function(w){
                    return w.replace('_','.');
                })
                fs.createReadStream(file).pipe(fs.createWriteStream(destFile));
            }
        }
    })
}
function rm(src){
    if(fs.existsSync(src)){
        let stats = fs.statSync(src);
        if(stats.isDirectory()){
            fs.readdirSync(src).forEach(function(file){
                rm(path.join(src,file));
            })
            fs.rmdirSync(src);            
        }else{
            fs.unlinkSync(src);
        }
    }
}

function rename(src,dest){
    fs.renameSync(src,dest);
}

module.exports = {
    mv,
    rename,
    rm
}