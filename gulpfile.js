'use strict';

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('watch-files', function() {
  gulp.watch('./app/*.md', ['markdown']);
  gulp.watch('./app/scss/*.scss', ['scss']);
});

gulp.task('markdown', function() {
  gulp.src('./app/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('public'));
});

gulp.task('open', function () {
  gulp.src('./public/index.html')
    .pipe(open({uri: 'http://localhost:8282'}));
})

gulp.task('public-server', function (){
  connect.server({
    root: './public',
    port: 8282,
    livereload: true
  });
});

gulp.task('default', ['markdown', 'scss', 'public-server', 'open', 'watch-files']);
