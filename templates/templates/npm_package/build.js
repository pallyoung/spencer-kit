var gulp = require('gulp');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var filename = process.argv[2]||'index';
function min(){
    gulp.src('release/*.js').pipe(uglify()).pipe(rename({suffix:'.min'})).pipe(gulp.dest('release'));
}
function webpack(){
    sh.exec('webpack');
}
function start(){
    webpack();
    min();
}
start();