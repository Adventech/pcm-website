var gulp = require("gulp");
var less = require("gulp-less");
var clean = require("gulp-clean");
var concat = require("gulp-concat");

gulp.task("clean", function () {
  return gulp.src("dist")
    .pipe(clean({force: true}));
});

gulp.task("less", function () {
  return gulp.src("src/style/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/style/"));
});

gulp.task("html", function() {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist/"));
});

gulp.task("images", function(){
  return gulp.src("src/images/**/*.*")
    .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function(){
  return gulp.src("src/fonts/**/*.*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("js", function(){
  return gulp.src(["src/scripts/jquery-1.12.2.min.js", "src/scripts/respond.min.js", "src/scripts/main.js"])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("dist/scripts/scripts.js"));
});

gulp.task("default", ["clean"], function(){
  return gulp.start("less", "html", "fonts", "images", "js");
});