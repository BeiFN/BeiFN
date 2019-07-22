
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

// let paths = {
//     styles : {
//         src : "./src/styles/index/*.css",
//         dist : "./dist/styles/"
//     },
//     scripts :{
//         src : "./src/javascripts/index/*.js",
//         dist : "./dist/javascripts/"
//     },
//     html :{
//         src : "./src/*.html",
//         dist : "./dist/"
//     }
// }

//拆分999999999999
// 外置路径，方便配置
let { paths } = require("./glup5config.js");


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
    .pipe(concat("allindex.js"))//合并js
    .pipe(babel({
        presets:['@babel/env']
    }))//es6转es5兼容
    .pipe(uglify())//压缩
    .pipe(gulp.dest(paths.scripts.dist))//转存路径
}
// gulp指令定义
exports.scripts = scripts;



// 监听444444444444444
function watch(){
    gulp.watch(paths.styles.src,styles);
    gulp.watch(paths.scripts.src,scripts);
    gulp.watch(paths.html.src,html);
}
// 指令定义
exports.watch = watch;


// // 创建一个指令包含 指令列队5555555
// let build = gulp.series(styles,scripts);

// 服务器实现同步刷新888888888888888888,执行gulp时开启服务器，并监听
let build = gulp.series(gulp.parallel(useconnect,watch));

exports.default = build;//gulp 指令顺序执行列队


// 插件 66666666
// 先加载插件再使用

// 文件处理
// 清除空格注释，丑化
let cleanCss = require("gulp-clean-css");
let rename = require("gulp-rename");//重命名、整合css
let concat = require("gulp-concat");//整合css

var babel = require("gulp-babel");//jsES6转es5，需配置
let uglify = require("gulp-uglify");//JS文件丑化压缩，去空格注释

// let server
let connect = require("gulp-connect");//服务器插件

// 服务器配置 777777777777777
function useconnect(){
    return connect.server({
        root:"./src",//根目录
        port : "8888",//端口
        livereload :true,//自动刷新
    });
}
exports.connect = useconnect;

function html(){
    return gulp.src(paths.html.src)//原路径
    .pipe(concat("index.html"))
    .pipe(gulp.dest(paths.html.dist))//转存
    .pipe(connect.reload());//实时刷新
}

exports.html = html;
