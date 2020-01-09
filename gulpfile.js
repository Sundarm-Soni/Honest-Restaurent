'use strict'

var gulp = require('gulp');
var  sass = require('gulp-sass');
var    browserSync = require('browser-sync');

gulp.task('sass',gulp.series(function() {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
}));

gulp.task('sass:watch',gulp.series(function(){
    gulp.watch('./css/*.scss', ['sass']);

}));

gulp.task('browser-sync',gulp.series(function(){
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];
    browserSync.init(files,{
        server:{
            baseDir: './'
        }
    });

}));


gulp.task('default', gulp.series('browser-sync',function(){
    
    gulp.start('sass:watch');

}));