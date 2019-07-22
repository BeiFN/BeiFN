//dev开发环境配置
var gulp = require("gulp")
////获取connect
var connect = require("gulp-connect")
//获取代理
var proxy = require("http-proxy-middleware")

//sass
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
//请求路径
var { paths, proxyList } = require("./gulp.config")

//转存之后再刷新
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(connect.reload())
}

//
function scripts() {
    return gulp.src(paths.styles.src)
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(connect.reload())
}
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist))
        .pipe(connect.reload())
}
//代理服务
function useconnect() {
    connect.server({
        //开启那个文件可以访问的
        root: "/dist",
        //端口号
        port: 8888,
        livereload: true,
        //中间件
        middleware: function (connect, opt) {
            let arr = [];
            for (let attr in proxyList) {
                arr.push(proxy(attr, proxyList[attr]))
            }
            return arr;
        }
    });
}

function watch(){
    gulp.watch(paths.styles.src,styles)
    gulp.watch(paths.scripts.src,scripts)
    gulp.watch(paths.html.src,html)
}

//开启服务和监听  并行执行
var dev = gulp.series(gulp.parallel(useconnect,watch))
//导出dev
module.exports=dev