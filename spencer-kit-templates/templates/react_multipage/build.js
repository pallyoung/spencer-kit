var minimist = require('minimist');
var fs = require('fs');
var sh = require('shelljs');
var rename = require('gulp-rename');
var url = require('url')
var path = require('path');
var gulp = require('gulp');
var replace = require('gulp-replace');
var hash = require('gulp-hash');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var connect = require('gulp-connect');

var proxy = require('http-proxy-middleware');


var options = minimist(process.argv.slice(2));

var DIST = options.dist || 'dist';// dist dir
var ENV = options.env || 'dev';//environment,dafault is dev


var ENTRY = path.resolve(options.entry||'./project.js');//build entry file

var projectConfig = require(ENTRY);

if (typeof projectConfig == 'function') {
    projectConfig = projectConfig(ENV);
}


var serverConfig = {
    root: DIST,// server root
    port: 8080,//server port 
    livereload: false,
    /**
     * @ description
     * proxy config,you can uncomment the code below for cross 
     * origin ajax;
     */
    // middleware: function (connect, opt) {
    //     return [
    //         proxy( function (pathname, req) {
    //             return pathname.match('^/ppi');
    //         }, {
    //             target: 'https://proxyapi.com',
    //             changeOrigin: true,
    //         })
    //     ]
    // }
}
function meger(source,dest){
    for(var o in source){
        if(source.hasOwnProperty(o)){
            if(!dest[o] || typeof dest[o]!=='object'){
                dest[o] = source[o];
            }else{
                dest[o] = meger(source[o],dest[o]);
            }
        }
    }
    return dest;
}
function TaskDelayer() {
    this.timeoutTokens = {};
    TaskDelayer.prototype.delay = function (fn, token) {
        clearTimeout(this.timeoutTokens[token]);
        this.timeoutTokens[token] = setTimeout(fn, 1000);
    }
}
function mkdir() {
    if (fs.existsSync(DIST)) {
        sh.rm('-rf', DIST);
    }
    fs.mkdir(DIST);
}

function getTemplate(path) {
    if (fs.existsSync(path)) {
        return gulp.src(path);
    } else {
        console.log(path + ' not exist');
    }
}
function html() {
    HTMLgenerate(projectConfig.pages);
}
function HTMLgenerate(pages) {
    pages.forEach(function (config) {
        var template = getTemplate(config.template);
        var injectFiles = [

        ]
        config.js = config.js || [];
        config.js.unshift('buildconfig.js');
        if (config.js) {
            injectFiles.push({
                name: 'js',
                files: config.js.map(function (name) {
                    return DIST + '/js/' + name.replace('\.', '*\.');
                })
            })
        }
        if (config.css) {
            injectFiles.push({
                name: 'css',
                files: config.css.map(function (name) {
                    return DIST + '/css/' + name.replace('\.', '*\.');
                })
            })
        }
        
        if (template) {
            template = HTMLComplie(config, template, DIST);
            injectFiles.forEach(function (config) {
                template = injectFile(template, config);
            });
            if(config.prerender&&ENV!=='dev'){
                require('./AppRegister.prerender');                
                var files = [];
                injectFiles[0].files.forEach(function(v){
                    if(v.indexOf('react') <0){
                        files.push(v);
                    }
                })
                gulp.src(files).pipe(
                    concat(config.output+'.js')
                ).pipe(gulp.dest(DIST)).addListener('end',function(){
                    AppRegister.setTag(config.output);                    
                    require('./'+DIST+'/'+config.output);
                    sh.rm(DIST+'/'+config.output+'.js');
                    var html = AppRegister.getTag(config.output);
                    template.pipe(
                        replace('html_placeholder\'>','html_placeholder\'>'+html)
                    ).pipe(gulp.dest(DIST));
                });
            }else{
                template.pipe(gulp.dest(DIST));
            }      
        }
    });
}
function asset() {
    gulp.src([projectConfig.assetDIR+'/**'])
        .pipe(gulp.dest(DIST));
}
function HTMLComplie(config, template) {
    return template.pipe(replace(
        /<%=[\s\S]*?(?:%>)/g,
        function (matcher) {
            matcher = matcher.replace(/(<%=\s*|\s*%>)/g, '');
            if (matcher != '') {
                return new Function('config', 
                                        'return '+ String(matcher))(config);
            } else {
                return matcher;
            }
        }
    )).pipe(rename(config.output));
}

function webpack(env, entry, output) {
    entry = encodeURI(JSON.stringify(entry));
    sh.exec('webpack --colors --env=' + env + '--' + entry + '--' + output +
        ' --progress --profile');
}



function hashmifify() {
    return Promise.resolve();
    var readyList = [];
    if (ENV == 'dev') {
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        function checkReady() {
            readyList.push(true);
            if (readyList.length == 2) {
                sh.rm('-fr',[DIST + '/js1',DIST + '/css1']);
                resolve();

            }
        }
        sh.mv('-f',DIST + '/js',DIST + '/js1');
        sh.mv('-f',DIST + '/css',DIST + '/css1');
        process.nextTick(function () {
            gulp.src([DIST + '/css1/**']).
                pipe(minifyCss()).
                pipe(hash()).
                pipe(gulp.dest(DIST + '/css'))
                .addListener('end', checkReady);

            gulp.src([DIST + '/js1/**']).
                pipe(uglify()).
                pipe(hash()).
                pipe(gulp.dest(DIST + '/js')).
                addListener('end', checkReady);
        })

    })

}

function concatJS(list, DIST) {
    list = list || {};
    return new Promise(function (resolve, reject) {
        var readyList = [];
        var taskList = [];
        function checkReady() {
            readyList.push(true);
            if (readyList.length == taskList.length) {
                resolve();
            }
        }
        for (var js in list) {
            gulp.src(list[js]).
                pipe(sourcemaps.init()).
                pipe(concat(js + '.js')).
                pipe(sourcemaps.write()).
                pipe(gulp.dest(DIST))
                .addListener('end', checkReady);
            taskList.push(true)
        }
    });
}



//buile config
function generateBuildConfigJS(dir){
    var buildConfig = projectConfig.buildConfig&&projectConfig.buildConfig.defaultConfigs||{};
    var envBuildConfig = projectConfig.buildConfig&&projectConfig.buildConfig[ENV];
    buildConfig = meger(envBuildConfig,buildConfig);
    var js = '(function(){window.BuildConfig='+JSON.stringify(buildConfig)+'}());';
    var appregister = fs.readFileSync('AppRegister.js');
    js =  js+'\r\n'+appregister;
    fs.writeFileSync(path.join(dir,'buildconfig.js'),js);
    
    
}
function injectFile(template, config) {
    return template.pipe(
        inject(
            gulp.src(config.files),
            { relative: false, name: config.name, ignorePath:DIST }
        ));
}
function css() {
    if(!projectConfig.compass){
        return Promise.resolve();
    }
    sh.exec('compass compile --sass-dir ' + path.resolve(projectConfig.scssDIR) + ' --force');
    return new Promise(function (resolve) {
        process.nextTick(function(){
            sh.rm('-fr', DIST + '/css');
            sh.mv('-f','css', DIST + '/css');
            process.nextTick(resolve);
        });
    })
}
function js() {
    var jsDIR = path.join(DIST,'js');
    if(!fs.existsSync(jsDIR)){
        fs.mkdirSync(jsDIR)
    }
    generateBuildConfigJS(jsDIR);
    if (projectConfig.webpackEntry) {
        webpack(ENV, projectConfig.webpackEntry,jsDIR);
    }
    return concatJS(projectConfig.commonJS, jsDIR);

}
function clear() {
    // sh.rm('-rf', 'css');
}

function start() {
    mkdir();
    asset();
    css().then(js).then(hashmifify).then(html).then(server);
}

start();
function server() {
    if (ENV == 'dev') {
        connect.server(serverConfig);
        var delayer = new TaskDelayer();
        gulp.watch(['asset/**'], function () {
            delayer.delay(function () {
                asset();
                process.nextTick(function () {
                    connect.reload();
                })
            }, 'asset')
        })
        gulp.watch([ projectConfig.scssDIR + '/**'], function () {
            delayer.delay(function () {
                css().then(function () {
                    connect.reload();
                });
            }, 'scss')
        })
        gulp.watch(['js/**'], function () {
            delayer.delay(function () {
                js().then(function () {
                    connect.reload();
                })
            }, 'scss')
        })
    }
}
