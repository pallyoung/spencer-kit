'use strict'
var fs = require('fs');
function rf(src,callback){
    fs.exists(src,function(exists){
        var stats=fs.statSync(src);
        if(stats.isDirectory()){
            fs.readdir(src,function(err,files){
                files.forEach(function(file){
                    rf(src+'/'+file,callback);
                })
            })
        } 
        callback(src);
    })
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
function rm(){

}

module.exports = {
    mv
}