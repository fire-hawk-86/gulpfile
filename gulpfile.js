var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('copy', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['sass'], function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch("./src/*.html", ['copy']).on('change', browserSync.reload);
});
