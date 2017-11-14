var minimist = require('minimist');
var fs = require('fs');
var sh = require('shelljs');
var rename = require('gulp-rename');
var url = require('url')

var gulp = require('gulp');
var replace = require('gulp-replace');
var hash = require('gulp-hash');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var connect = require('gulp-connect');

var proxy = require('http-proxy-middleware');


var options = minimist(process.argv.slice(2));

var dest = options.dest || 'release';// release dir
var env = options.env || 'dev';//environment,dafault is dev



var projectConfig = require('project.js');

if (typeof projectConfig == 'function') {
    projectConfig = projectConfig(env);
}


var serverConfig = {
    root: dest,// server root
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
    if (fs.existsSync(dest)) {
        sh.rm('-rf', dest);
    }
    fs.mkdir(dest);
}

function getTemplate(path) {
    path = 'templates/' + path;
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
                    return dest + '/js/' + name.replace('\.', '*\.');
                })
            })
        }
        if (config.css) {
            injectFiles.push({
                name: 'css',
                files: config.css.map(function (name) {
                    return dest + '/css/' + name.replace('\.', '*\.');
                })
            })
        }
        
        if (template) {
            template = HTMLComplie(config, template, dest);
            injectFiles.forEach(function (config) {
                template = injectFile(template, config);
            });
            if(config.prerender&&env!=='dev'){
                require('./AppRegister.prerender');                
                var files = [];
                injectFiles[0].files.forEach(function(v){
                    if(v.indexOf('react') <0){
                        files.push(v);
                    }
                })
                gulp.src(files).pipe(
                    concat(config.output+'.js')
                ).pipe(gulp.dest(dest)).addListener('end',function(){
                    AppRegister.setTag(config.output);                    
                    require('./'+dest+'/'+config.output);
                    sh.rm(dest+'/'+config.output+'.js');
                    var html = AppRegister.getTag(config.output);
                    template.pipe(
                        replace('html_placeholder\'>','html_placeholder\'>'+html)
                    ).pipe(gulp.dest(dest));
                });
            }else{
                template.pipe(gulp.dest(dest));
            }      
        }
    });
}
function asset() {
    var assets = fs.readdirSync('asset');
    gulp.src(['asset/**'])
        .pipe(gulp.dest(dest));
}
function HTMLComplie(config, template, dest) {
    return template.pipe(replace(
        /<%=[^%>]+%>/g,
        function (matcher) {
            matcher = matcher.replace(/(<%=\s*|\s*%>)/g, '');
            if (matcher != '') {
                return new Function('config', 'return config.' + matcher+'||\'\'')(config);
            } else {
                return matcher;
            }
        }
    )).pipe(rename(config.output));
}

function webpack(env, entry, output) {
    entry = encodeURI(JSON.stringify(entry));
    sh.exec('webpack --colors --env=' + env + '--' + entry + '--' + output +
        ' --progress --profile --define process.env.NODE_ENV=\'production\'');
}



function hashmifify() {
    return Promise.resolve();
    var readyList = [];
    if (env == 'dev') {
        return Promise.resolve();
    }
    return new Promise(function (resolve) {
        function checkReady() {
            readyList.push(true);
            if (readyList.length == 2) {
                sh.rm('-fr',[dest + '/js1',dest + '/css1']);
                resolve();

            }
        }
        sh.mv('-f',dest + '/js',dest + '/js1');
        sh.mv('-f',dest + '/css',dest + '/css1');
        process.nextTick(function () {
            gulp.src([dest + '/css1/**']).
                pipe(minifyCss()).
                pipe(hash()).
                pipe(gulp.dest(dest + '/css'))
                .addListener('end', checkReady);

            gulp.src([dest + '/js1/**']).
                pipe(uglify()).
                pipe(hash()).
                pipe(gulp.dest(dest + '/js')).
                addListener('end', checkReady);
        })

    })

}

function concatJS(list, dest) {
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
                pipe(concat(js + '.js')).
                pipe(gulp.dest(dest))
                .addListener('end', checkReady);
            taskList.push(true)
        }
    });
}



//buile config
function generateBuildConfigJS(){
    var buildConfig = require('buildConfig/BuildConfig');
    var envBuildConfig = require('buildConfig/BuildConfig.'+env);
    buildConfig = meger(envBuildConfig,buildConfig);
    var js = '(function(){window.BuildConfig='+JSON.stringify(buildConfig)+'}());';
    var appregister = fs.readFileSync('AppRegister.js');
    js+'/r/n'+appregister;
    fs.writeFileSync('buildconfig.js');
    
    
}
function injectFile(template, config) {
    return template.pipe(
        inject(
            gulp.src(config.files),
            { relative: false, name: config.name, ignorePath:dest }
        ));
}
function css() {
    if(!projectConfig.compass){
        return Promise.resolve();
    }
    sh.exec('compass compile --sass-dir ' + projectConfig.scssDIR + ' --force');
    return new Promise(function (resolve) {
        process.nextTick(function(){
            sh.rm('-fr', dest + '/css');
            sh.mv('-f','css', dest + '/css');
            process.nextTick(resolve);
        });
    })
}
function js() {
    generateBuildConfigJS();
    if (projectConfig.webpackEntry) {
        webpack(env, projectConfig.webpackEntry, dest + '/js');
    }
    return concatJS(projectConfig.commonJS, dest + '/js');

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
    if (options.env == 'dev') {
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
