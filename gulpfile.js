const gulp = require("gulp"),
    tar = require("gulp-tar"),
    gzip = require("gulp-gzip"),
    del = require("del");

gulp.task("package-core", function () {
    return gulp.src("./core/**")
        .pipe(tar("core.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("temp"));
});

gulp.task("package-system", function () {
    return gulp.src("./system/**")
        .pipe(tar("system.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("temp"));
});

gulp.task("package-cp", function () {
    return gulp.src("./cp/**")
        .pipe(tar("cp.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("temp"));
});

gulp.task("package-frontend", function () {
    return gulp.src("./frontend/**")
        .pipe(tar("frontend.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("temp"));
});

gulp.task("clean", function () {
    return del("temp/");
});

gulp.task("package", ["package-core", "package-system", "package-cp", "package-frontend"], function () {
    return gulp.src(["temp/*.tar.gz", "index.js", "package.json", "config.example.json"])
        .pipe(tar("websuite.tar"))
        .pipe(gzip())
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["package"]);