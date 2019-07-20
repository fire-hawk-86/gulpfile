var gulp = require('gulp')
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var browserSync = require('browser-sync').create()

gulp.task('watch', ['sass', 'pug', 'html'], function () {
    
    browserSync.init({
        server: "./dist"
    })

    gulp.watch(['./src/scss/**/*.scss', './src/scss/**/*.sass'], ['sass'])
    gulp.watch("./src/*.pug", ['pug']).on('change', browserSync.reload)
})

gulp.task('sass', function () {
    return gulp.src(['./src/scss/**/*.scss', './src/scss/**/*.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
})

gulp.task('pug', function () {
    gulp.src('./src/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['watch'])
