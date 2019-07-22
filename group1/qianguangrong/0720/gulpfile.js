
let gulp = require("gulp");

let cleanCss = require("gulp-clean-css");//需先请求在使用（压缩整合）
let rename   = require("gulp-rename");//更名
let concat   = require("gulp-concat");//合并
let babel    = require("gulp-babel");//更名 （可以加后缀.mim）
let uglify   = require("gulp-uglify");//丑化压缩


// 路径;
let paths = {
    styles : {
          src  : "./src/styles/index/*.css",
          dist : "./dist/styles/"
    },
    scripts : {
          src  : "./src/scripts/index/*.js",
          dist : "./dist/scripts/"
    }
}

//处理css的 => 找到css 放进管道进行转存
function styles() {
    // 找到源文件;  =>  流 buffer;
    return gulp.src(paths.styles.src)
        .pipe(concat("index.css"))
        .pipe(cleanCss())
        .pipe(rename(
            {suffix:'.min'}
        ))
        .pipe(gulp.dest(paths.styles.dist));
}
function scripts(){
    return gulp.src(paths.scripts.src)
        .pipe(concat("comp.js"))
        .pipe(rename(
            {suffix:'.min'}
        ))
        .pipe(babel({
            presets : ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dist));
}

// 监听 
function watch(){
    gulp.watch(paths.styles.src,styles)
}

let build = gulp.series(styles,scripts);//按顺序执行某些程序
// 记住bulid结束后导出****
exports.default = build;//默认指令

exports.styles = styles;
exports.watch   = watch;
exports.scripts = scripts;