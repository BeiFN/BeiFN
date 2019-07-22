var gulp  = require("gulp") //实例
//这个用来做压缩 丑化 合并 语法修改的操作
var cleanCss = require('gulp-clean-css');
//重命名的  一般用来更改css名字的 
var rename = require("gulp-rename");
//合并的
var concat = require("gulp-concat")
//jsES6-ES5
var babel = require("gulp-babel")
//js丑化
var uglify = require("gulp-uglify")
//引入dev
var dev = require("./gulp.dev")

//sass css压缩用的
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

//路径  解构的形式 获取其中的path
var {paths} = require("./gulp.config")

// var type = process.argv[3]
// type = type?type:"dev"
//修改css
function styles(){
    return gulp.src(paths.styles.src)
            //sass处理
            .pipe(sass().on('error', sass.logError))
            //压缩
            .pipe(cleanCss())
            //转存
            .pipe(gulp.dest(paths.styles.dist))
}

//修改js
function scripts(){
    return gulp.src(paths.scripts.src)
            //js合并
            .pipe(concat('all.js'))
            //babel 负责将es6转换成es5
            .pipe(babel({
                presets: ['@babel/env']
            }))
            //js压缩丑化
            .pipe(uglify())
            //转存到目的地
            .pipe(gulp.dest(paths.scripts.dist))
}
//修改html的目录
function html(){
    //直接转存
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dist))
}

let build = gulp.series(styles,scripts,html);


//执行时 直接执行这个导出的
exports.build = build
exports.dev = dev

