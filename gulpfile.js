var gulp = require("gulp");
var less = require("gulp-less");


gulp.task("less", function () {
  return gulp.src("src/style/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/style/"));
});

gulp.task("html", function() {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist/"));
});