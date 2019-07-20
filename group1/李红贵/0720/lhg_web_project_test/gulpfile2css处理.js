
// // 一个指令111111111111111111
// function sayHello(){
//     return console.log("hello i am gulp");
// }
// exports.sayHello = sayHello;


// // 简单转存22222222222222
// let gulp = require("gulp");//一个实例对象
// function styles(){
//     return gulp.src("./src/styles/index/*.css")//原始相对路径
//     .pipe(gulp.dest("./dist/styles/"))//转存路径
// }
// exports.styles = styles;

// 路径抽离33333333333333
let gulp = require("gulp");//一个实例对象
let paths = {
    styles : {
        src : "./src/styles/index/*.css",
        dist : "./dist/styles/"
    },
    scripts :{
        src : "./src/javascripts/index/*.js",
        dist : "./dist/javascripts/"
    }
}
function styles(){
    return gulp.src(paths.styles.src)//原始相对路径
    .pipe(concat("index.css"))//合并成一个index.css文件
    .pipe(cleanCss())//压缩代码样式，清空格注释
    // .pipe(rename({
    //     // basename :"main",//合并
    //     suffix:"min"//后缀名
    // }))
    .pipe(gulp.dest(paths.styles.dist))//转存路径
}
// gulp指令定义
exports.styles = styles;

function scripts(){
    return gulp.src(paths.scripts.src)//原始相对路径
    .pipe(gulp.dest(paths.scripts.dist))//转存路径
}
// gulp指令定义
exports.scripts = scripts;



// 监听444444444444444
function watch(){
    gulp.watch(paths.styles.src,styles)
}
// 指令定义
exports.watch = watch;


// 创建一个指令包含 指令列队5555555
let build = gulp.series(styles,scripts);
exports.default = build;//gulp 指令顺序执行列队


// 插件 66666666
// 先加载插件再使用
// 清除空格注释，丑化
let cleanCss = require("gulp-clean-css");
let rename = require("gulp-rename");
let concat = require("gulp-concat");