//
//var gulp = require('gulp'),
//    jshint = require('gulp-jshint'),
//    browserify = require('gulp-browserify'),
//    concat = require('gulp-concat'),
//    //rimraf = require('gulp-rimraf'),
//    //sass = require('gulp-sass'),
//    //autoprefixer = require('gulp-autoprefixer'),
//    taskListing = require('gulp-task-listing');
///*config = require('./gulp.config')();*/
//
////gulp plugin shorthand ($)
////util...
//
////// Modules for webserver and livereload
////var express = require('express'),
////    refresh = require('gulp-livereload'),
////    livereload = require('connect-livereload'),
////    livereloadport = 35729,
////    serverport = 5000;
//
//// Set up an express server (not starting it yet)
////var server = express();
////// Add live reload
////server.use(livereload({
////    port: livereloadport
////}));
//
//// Use our 'dist' folder as rootfolder
////server.use(express.static('./dist'));
//// Because I like HTML5 pushstate .. this redirects everything back to our index.html
////server.all('/*', function (req, res) {
////    res.sendfile('./config/index.html', {
////        root: 'dist'
////    });
////});
//
//// Dev task
//gulp.task('dev', [ 'views', 'lint', 'browserify'], function () {});
//
//// Clean task
////gulp.task('clean', function () {
////    gulp.src('./dist/views', {
////        read: false
////    }) // much faster
////        .pipe(rimraf({
////            force: true
////        }));
////});
//
//gulp.task('help', taskListing);
//
//// JSHint task
//gulp.task('lint', function () {
//    gulp.src('./config/js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});
////
////// Styles task
////gulp.task('styles', function () {
////    gulp.src('./app/styles/*.scss')
////        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
////        .pipe(sass({
////            onError: function (e) {
////                console.log(e);
////            }
////        }))
////        // Optionally add autoprefixer
////        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
////        // These last two should look familiar now :)
////        .pipe(gulp.dest('./dist/css/'));
////});
//
//// Browserify task
//gulp.task('browserify', function () {
//    // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
//    gulp.src(['./config/main.js','./config/*.js','./config/js/*.js', './config/js/modules/**/*.js', './config/js/modules/**/**/*.js'])
//        .pipe(browserify({
//            insertGlobals: true,
//            debug: false
//        }))
//        // Bundle to a single file
//        .pipe(concat('bundle.js'))
//        // Output it to our dist folder
//        .pipe(gulp.dest('./dist/js'));
//});
//
//// Views task
//gulp.task('views', function () {
//    // Get our index.html
//    gulp.src('./config/index.html')
//        // And put it in the dist folder
//        .pipe(gulp.dest('./dist/'));
//
//    // Any other view files from app/views
//    gulp.src('./config/js/modules/**/views/*')
//        // Will be put in the dist/views folder
//        .pipe(gulp.dest('./dist/views/'));
//});
//
//gulp.task('watch', ['lint'], function () {
//    // Start webserver
//    //server.listen(serverport);
//    // Start live reload
//    //refresh.listen(livereloadport);
//
//    // Watch our scripts, and when they change run lint and browserify
//    gulp.watch(['./config/*.js','./config/js/*.js', './config/js/modules/**/*.js', './config/js/modules/**/**/*.js'], [
//        'lint',
//        'browserify'
//    ]);
//    //// Watch our sass files
//    //gulp.watch(['./app/styles/**/*.scss'], [
//    //    'styles'
//    //]);
//
//    gulp.watch(['./config/*.html'], [
//        'views'
//    ]);
//
//    //gulp.watch('./dist/**').on('change', refresh.changed);
//
//});
//
//gulp.task('default', ['dev', 'watch']);

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('minifyjs', function() {
    return gulp.src(['./config/*.js','./config/js/*.js', './config/js/modules/**/*.js', './config/js/modules/**/**/*.js'])
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));  //输出
});

gulp.task('default', ['minifyjs']);