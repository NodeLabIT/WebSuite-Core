const gulp = require('gulp'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),
    del = require('del');

gulp.task('package-core', function () {
    return gulp.src('./core')
        .pipe(tar('core.tar'))
        .pipe(gulp.dest('dist'));
});

gulp.task('package-system', function () {
    return gulp.src('./system')
        .pipe(tar('system.tar'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del('dist/');
});

gulp.task('package', ['package-core', 'package-system'], function () {
    return gulp.src(['core.tar', 'system.tar'], {base: 'dist'})
        .pipe(tar('websuite.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['package']);