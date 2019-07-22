// function sayHello(){
//   console.log("hello i'm gulp");
// }
// exports.sayHello = sayHello;
// 模块;
let gulp = require("gulp");
let cleanCss = require("gulp-clean-css");
let rename = require("gulp-rename");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let connect = require("gulp-connect");
// 路径;
let paths = {
  styles : {
        src  : "./src/styles/**/*.css",
        dist : "./dist/styles/"
  },
  scripts : {
        src  : "./src/scripts/**/*.js",
        dist : "./dist/scripts/"
  },
  html : {
        src : "./src/*.html",
        dist : "./dist"
  }
}
function styles(){
      return gulp.src(paths.styles.src)
      .pipe(concat("index.css"))
      .pipe(cleanCss())
      .pipe(rename({
            suffix: '.min'
      }))
      .pipe(gulp.dest(paths.styles.dist));
}
function scripts(){
      return gulp.src(paths.scripts.src)
      .pipe(concat("main.min.js"))
      .pipe(babel({
            presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dist));
}
function html(){
      return gulp.src(paths.html.src)
      .pipe(gulp.dest("paths.html.dist"))
      .pipe(connect.reload())
}
function useConnect(){
      return connect.server({
            root : "./src",
            port : 8888,
            livereload : true
      });
}
function watch(){
      gulp.watch(paths.styles.src, styles);
      gulp.watch(paths.scripts.src, scripts);
      gulp.watch(paths.html.src, html);
}
// var build = gulp.series(gulp.parallel(styles));
// var build = gulp.series(styles,scripts);
let build = gulp.series(gulp.parallel(useConnect, watch));
exports.styles = styles;
exports.scripts = scripts;
exports.connect = useConnect;
exports.watch = watch;
exports.html = html;
exports.default = build;