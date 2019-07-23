let gulp = require("gulp"); //gulp是一个实例对象
let cleanCss = require("gulp-clean-css");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
var sass     = require('gulp-sass');
sass.compiler = require('node-sass');
// 外置路径;=>方便配置
let {paths} = require("./gulp.config");
let dev = require("./gulp.dev");

// 打包的时候压缩代码
function styles(){
      return gulp.src(paths.styles.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat("index.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.styles.dist));
}
function scripts(){
      return gulp.src(paths.scripts.src)
            .pipe(concat("index.js"))
            .pipe(babel({
                  presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dist));
}
function html(){
      return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
}
let build = gulp.series(html, styles, scripts);

// 默认指令
exports.build = build;
exports.dev = dev;
