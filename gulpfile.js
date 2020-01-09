'use strict'

var gulp = require('gulp'),
 sass = require('gulp-sass'),
 browserSync = require('browser-sync'),
 del = require('del'),
 imagemin = require('gulp-imagemin'),
 uglify = require('gulp-uglify'),
 usemin = require('gulp-usemin'),
 rev = require('gulp-rev'),
 cleanCss = require('gulp-clean-css'),
 flatmap = require('gulp-flatmap'),
 htmlmin = require('gulp-htmlmin');

gulp.task('sass',gulp.series(async function() {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css'));
}));

gulp.task('sass:watch',gulp.series(async function(){
    gulp.watch('./css/*.scss', ['sass']);

}));

gulp.task('browser-sync',gulp.series(async function(){
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


gulp.task('default', gulp.series('browser-sync',async function(){

    gulp.start('sass:watch');

}));

gulp.task('clean',gulp.series(async function(){
    return del(['dist']);

}));

gulp.task('copyfonts', gulp.series(async function(){
    gulp.src('./nodelmodules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
}));

gulp.task('imagemin', gulp.series(async function() {
    return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
  }));

  gulp.task('usemin', gulp.series(async function() {
    return gulp.src('./*.html')
    .pipe(flatmap(async function(stream, file){
        return stream
          .pipe(usemin({
              css: [ rev() ],
              html: [ async function() { return htmlmin({ collapseWhitespace: true })} ],
              js: [ uglify(), rev() ],
              inlinejs: [ uglify() ],
              inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
      .pipe(gulp.dest('dist/'));
  }));
  
  gulp.task('build', gulp.series('clean',async function() {
      gulp.series('copyfonts','imagemin','usemin');
  }));

  

