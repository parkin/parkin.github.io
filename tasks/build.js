'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var path = require('path');
var del = require('del');

var basePath = path.join(__dirname, '..');

var srcDir = path.join(basePath, 'site');
var destDir = path.join(basePath, 'build');
var stylesheetsDir = path.join(destDir, 'stylesheets');

var paths = {
  jsCodeToTranspile: [
    'site/**/*.js',
    '!site/node_modules/**',
    '!site/bower_components/**',
    '!site/vendor/**'
  ],
  toCopy: [
    'site/node_modules/**',
    '!site/node_modules/bower/**',
    'site/bower_components/snap.svg/dist/*.js',
    'site/**/*.html',
    'site/favicon.ico',
    'site/assets/**/*',
    'site/data/**',
    'site/css/**',
    'site/images/**',
    'site/vendor/**',
    '!site/**/*.scss'
  ]
}

gulp.task('clean', function(cb) {
  del(destDir, cb);
});

var copyTask = function() {
  return gulp.src(paths.toCopy, {base: srcDir})
    .pipe(gulp.dest(destDir))
    .pipe(connect.reload());
}
gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', copyTask);

var transpileTask = function() {
  return gulp.src(paths.jsCodeToTranspile)
    .pipe(babel())
    .pipe(gulp.dest(destDir))
    .pipe(connect.reload());
}
gulp.task('transpile', ['clean'], transpileTask);
gulp.task('transpile-watch', transpileTask);

var sassTask = function() {
  return gulp.src('site/stylesheets/main.scss')
    .pipe(sass())
    .pipe(gulp.dest(stylesheetsDir))
    .pipe(connect.reload());
}
gulp.task('sass', ['clean'], sassTask);
gulp.task('sass-watch', sassTask);

gulp.task('watch', function() {
  gulp.watch(paths.jsCodeToTranspile, ['transpile-watch']);
  gulp.watch(paths.toCopy, ['copy-watch']);
  gulp.watch('site/stylesheets/**/*.scss', ['sass-watch']);
})

gulp.task('build', ['transpile', 'sass', 'copy']);

gulp.task('connect', ['build', 'watch'], function() {
  connect.server({
    root: destDir,
    livereload: true
  });
});
