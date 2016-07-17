var gulp = require("gulp"),
    less = require("gulp-less"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    embedlr = require("gulp-embedlr"),
    livereload = require("gulp-livereload"),
    webserver = require("gulp-webserver");

gulp.task("clean", function () {
  return gulp.src("dist")
    .pipe(clean({force: true}));
});

gulp.task("less", function () {
  return gulp.src("src/style/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/style/"))
    .pipe(livereload());
});

gulp.task("heroku-build", function(){
  return gulp.src("src/index.php")
    .pipe(gulp.dest("dist/"));
});

gulp.task("html", ["heroku-build"], function() {
  return gulp.src("src/index.html")
    .pipe(embedlr({src: "http://localhost:35729/livereload.js?snipver=1"}))
    .pipe(gulp.dest("dist/"))
    .pipe(livereload());
});

gulp.task("icon", function(){
  return gulp.src("src/images/icon/favicon.ico")
    .pipe(gulp.dest("dist"));
});

gulp.task("images", ["icon"], function(){
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

gulp.task("watch", function(){
  livereload.listen();
  gulp.watch(["src/style/**/*.less"], ["less"]);
  gulp.watch(["src/*.html"], ["html"]);
});

gulp.task("webserver", function() {
  gulp.src("dist")
    .pipe(webserver({
      open: true
    }));
});

gulp.task("compile", ["clean"], function(){
  return gulp.start("less", "html", "fonts", "images", "js");
});

gulp.task("dev", function(){
  return gulp.start("compile", "watch", "webserver");
});

gulp.task("default", function(){
  return gulp.start("compile");
});