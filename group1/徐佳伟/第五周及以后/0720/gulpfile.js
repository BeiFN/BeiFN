//COMMONJS => require => module.exports

//gulp.src  找到数据源 流buffer
//gulp.pipe()   操作数据源
//gulp.dest()   转存
//gulp.series() 列队指令
//gulp.parallel() 列队指令

//第二遍 稍微明白了点道道
//首先引入gulp
// let gulp = require("gulp");
// //引入之后在找到数据源
// function styles()
// {
//     //获取数据源
//     return gulp.src("./src/styles/index/**/*.css")
//     //通过管转存
//     .pipe(gulp.dest("./dist/styles/"));
// }
// exports.styles = styles;

//gulpfile.js 只要输入gulp就执行了这个js文件了

// //导入gulp
// let gulp = require("gulp");

//这样写不太优雅
// function styles(){
//     //获取目标文件的路径 也就是源
//     return gulp.src("./src/styles/index/**/*.css")
//     //将获取的源转到 指定路径下
//     .pipe(gulp.dest("./daweige/styles/"))
// }

// function scripts(){
//     return gulp.src("./src/scripts/index/**/*.js")
//     .pipe(gulp.dest("./daweige/scripts"))
// }

let {paths} = require("./src/gulp.config")
let gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
let rename = require("gulp-rename");
let uglify = require("gulp-uglify");
let babel  = require("gulp-babel");
let concat = require("gulp-concat");
let connect = require("gulp-connect");

let dev = require("./gulpdev");

function styles(){
    return gulp.src(paths.styles.src)
    //压缩css代码
    .pipe(cleanCSS())
  
    //放位置的弄最后边总没错
    .pipe(gulp.dest(paths.styles.daweige))
}

function html(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.daweige))
    //加载页面自动刷新的插件
    .pipe(connect.reload())
}


function scripts(){
    return gulp.src(paths.scripts.src)
    //重新命名并合并多个js文件
    //记住哦 先合并在编译
    .pipe(concat(".min.js"))
    //es6 编译成es5
    .pipe(babel({
        //可以的 靠谱 记在小本本上
        presets:['@babel/env']
    }))
    //js代码全都变成一行
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.daweige))
}

let build = gulp.series(html,styles,scripts);
exports.default = build;
exports.dev = dev;

//-------------------------------------------核心-------
//导入gulp
// let gulp = require("gulp");
// let cleanCSS = require("gulp-clean-css");
// let rename = require("gulp-rename");
// let uglify = require("gulp-uglify");
// let babel  = require("gulp-babel");
// let concat = require("gulp-concat");
// let connect = require("gulp-connect");

//配置服务器
//通过配置的服务器发现默认的层级就是这个js文件



// function conn(){
//     return connect.server({
//         //设置服务器的默认路径
//         root :'./src',
//         //设置端口号
//         port : 1234,
//         //表示自动刷新功能
//         livereload : true
//     });
// }


//通过改写路径 这样就优雅了很多了
// let paths = {
//     styles : {
//         src : "./src/styles/index/**/*.css",
//         daweige : "./daweige/styles/"
//     },
//     scripts : {
//         src : "./src/scripts/index/**/*.js",
//         daweige : "./daweige/scripts/"
//     },
//     html :{
//         src : "./src/**/*.html",
//         daweige : "./daweige/"
//     }
// }

// function html(){
//     return gulp.src(paths.html.src)
//     .pipe(gulp.dest(paths.html.daweige))
//     //加载页面自动刷新的插件
//     .pipe(connect.reload())
// }

// function styles(){
//     return gulp.src(paths.styles.src)
//     //压缩css代码
//     .pipe(cleanCSS())
//     //css文件重命名
//     .pipe(rename({
//         // basename : "main",
//         suffix : "min"
//     }))
//     //放位置的弄最后边总没错
//     .pipe(gulp.dest(paths.styles.daweige))
// }

// function scripts(){
//     return gulp.src(paths.scripts.src)
//     //重新命名并合并多个js文件
//     //记住哦 先合并在编译
//     .pipe(concat(".min.js"))
//     //es6 编译成es5
//     .pipe(babel({
//         //可以的 靠谱 记在小本本上
//         presets:['@babel/env']
//     }))
//     //js代码全都变成一行
//     .pipe(uglify())
//     .pipe(gulp.dest(paths.scripts.daweige))
// }

// //但是这种方法每改一次都需要重新创建一次
// //过于繁琐 于是采用监听的模式
// function watch(){
//     //watch方法第一个参数获取要改项目的路径
//     //第二个参数设置对应要执行的语句
//     //可以这么监听多个事件对象
//     gulp.watch(paths.styles.src,styles);
//     gulp.watch(paths.scripts.src,scripts);
//     gulp.watch(paths.html.src,html);
// }

// //这就是一个列队，可以同时执行多个函数
// //如果不加parallel异步函数就只能把watch放在最后 或者监听多个
// //parallel相当于一个二次列队
// // var build = gulp.series(styles,scripts,watch);
// // var build = gulp.series(styles,scripts);
//                         //两个异步放在一起
// var build = gulp.series(gulp.parallel(conn,watch));

// //exports的后缀就是cmd输入命令行的指定 等号右边是赋值的函数名哦
// exports.watch = watch;
// exports.styles = styles;
// exports.scripts = scripts;
// exports.default = build;
// exports.connect = conn;
// // exports.build = build;
// //这个是默认执行的指定，只要输入gulp 就执行它
// // exports.default = build




//---------------------照着小智的第一便---------------------
// //module模块一般两个步骤 引入 定义
// //引入require 定义就不是之前的导入了 改变成模块暴露:module.exports =xxx
// var gulp = require("gulp");

// //这个require的找寻方式 首先找的是 ./gulp.js
// //                     然后再node_modules/gulp index.js

// //等成功获取到了gulp的实例对象后
// //只要执行gulp指令那么就会执行gulpfile.js

// //打包路径的创建
// var paths = {
//     styles :{
//         //这个*是代表不论层级内的以.css为后缀的文件都被加载
//         src : "src/styles/**/*.css",
//         dest : "dist/styles/"
//     },
//     scripts : {
//         src : "src/scripts/**/*.js",
//         dest : "dist/scripts"
//     }
// };

// //处理css =>找到css放进管道进行转存
// function styles(){
//     //这句是找到了源文件 ;系可以理解为流 buffer
//     return gulp.src(paths.styles.src)
//     //gulp => pipe ;处理流都在管理处理
//     .pipe(gulp.dest(paths.styles.dest))
// }

// function watch (){
//     gulp.watch(paths.styles.src ,styles);
// }
// //進行列隊 也就是列队指令series parallel
// var build = gulp.series(gulp.parallel(styles));

// exports.styles = styles;
// exports.watch  =watch;
// exports.default = build;