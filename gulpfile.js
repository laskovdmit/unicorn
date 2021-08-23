'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

gulp.task('style', function(){
    return gulp.src('./sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', gulp.series('style'));
});
