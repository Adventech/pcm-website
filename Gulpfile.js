var gulp = require("gulp"),
    less = require("gulp-less"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    embedlr = require("gulp-embedlr"),
    livereload = require("gulp-livereload"),
    nodemon = require("nodemon");

gulp.task("clean", function () {
  return gulp.src("dist")
    .pipe(clean({force: true}));
});

gulp.task("less", function () {
  return gulp.src("src/assets/style/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/assets/style/"))
    .pipe(livereload());
});

gulp.task("app", function() {
  return gulp.src(["src/main.js", "src/routes/**/*", "src/views/**/*"], {base: "src"})
    .pipe(gulp.dest("dist"));
});

gulp.task("html", ["app"], function() {
  return gulp.src("dist/views/header.ejs")
    .pipe(embedlr({src: "http://localhost:35729/livereload.js?snipver=1"}))
    .pipe(gulp.dest("dist/"))
    .pipe(livereload());
});

gulp.task("icon", function(){
  return gulp.src("src/assets/images/icon/favicon.ico")
    .pipe(gulp.dest("dist/assets"));
});

gulp.task("images", ["icon"], function(){
  return gulp.src("src/assets/images/**/*.*")
    .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("fonts", function(){
  return gulp.src("src/assets/fonts/**/*.*")
    .pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task("js", function(){
  return gulp.src(["src/assets/scripts/jquery-1.12.2.min.js", "src/assets/scripts/respond.min.js", "src/assets/scripts/main.js"])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("dist/assets/scripts"))
    .pipe(livereload());
});

gulp.task("watch", function(){
  livereload.listen();
  gulp.watch(["src/assets/style/**/*.less"], ["less"]);
  gulp.watch(["src/*.ejs"], ["html"]);
  gulp.watch(["src/assets/scripts/*.js"], ["js"]);
});

gulp.task("webserver", function() {
  nodemon({
    script: "bin/www"
  });
});

gulp.task("compile", ["clean"], function(){
  return gulp.start("less", "html", "app", "fonts", "images", "js");
});

gulp.task("dev", function(){
  return gulp.start("compile", "watch", "webserver");
});

gulp.task("default", function(){
  return gulp.start("compile");
});