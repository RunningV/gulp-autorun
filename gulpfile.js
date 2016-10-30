var path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    copy = require('gulp-copy'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-html-tag-include'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open');

gulp.task('less', function(cb) {
  return watch('./src/css/**/*.less', {ignoreInitial: false})
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'not ie <= 9']
    }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('js-copy', function() {
  return watch('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('html-copy', function() {
  return watch('./src/**/*.html', {ignoreInitial: false})
    .pipe(include())
    .pipe(gulp.dest('./dist/'));
})

gulp.task('default', ['html-copy', 'less', 'js-copy'], function() {
  livereload.listen();
  gulp.src('dist/')
    .pipe(open({app: 'google-chrome', uri: 'http://localhost:3000'}));
})
