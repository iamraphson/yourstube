/**
 * Created by Raphson on 6/28/16.
 */
var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index', function () {
    var target = gulp.src('./public/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./public/vendor/**/*.js', './public/vendor/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});