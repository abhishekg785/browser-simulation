/**
 * @author : abhishek goswami ( hiro )
 * abhishekg785@gmail.com
 *
 * gulpfile.js : for automating the stuff
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// creating a task for the gulp
gulp.task('browserSync', function() {
    browserSync.init({
        server : {
            baseDir : 'app'
        }
    });
});

// running browserSync before any other activity to run the server first
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('app/*.html', browserSync.reload());
    gulp.watch('app/js/**/*.js', browserSync.reload);
});