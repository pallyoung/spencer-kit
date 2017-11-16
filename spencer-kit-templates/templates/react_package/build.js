var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var minimist = require('minimist');
var options = minimist(process.argv.slice(2));
var babelOptions = {
    presets:['react','env','stage-3']
}
function start(){    
    var src = options.src;
    var dist = options.dist;
    transform(src,dist);
}
function transform(src,dist){
    if(fs.existsSync(src)){
        var stat = fs.statSync(src);
        if(stat.isFile()){
            transformFileSync(src,dist)
        }else{
            !fs.existsSync(dist)&&fs.mkdirSync(dist);
            fs.readdirSync(src).forEach(function(file){
                transform(path.resolve(src,file),path.resolve(dist,file));
            })
        }
    }
}
function transformFileSync(file,dist){
    var result = babel.transformFileSync(file,babelOptions);
    fs.writeFileSync(dist,result.code);
}


start();