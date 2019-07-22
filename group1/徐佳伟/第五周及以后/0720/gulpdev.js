//开发环境
//服务器
//watch
let gulp =require("gulp");

let {paths} = require("./src/gulp.config");
let connect = require("gulp-connect");

function devStyles(){
    return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.daweige))
    .pipe(connect.reload())
}

function devScripts(){
    return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.daweige))
    .pipe(connect.reload())
}

function devHtml(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.daweige))
    .pipe(connect.reload())
}
function conn(){
    return connect.server({
        //设置服务器的默认路径
        root :'./src',
        //设置端口号
        port : 1234,
        //表示自动刷新功能
        livereload : true
    });
}

function watch(){
    //watch方法第一个参数获取要改项目的路径
    //第二个参数设置对应要执行的语句
    //可以这么监听多个事件对象
    gulp.watch(paths.styles.src,devStyles);
    gulp.watch(paths.scripts.src,devScripts);
    gulp.watch(paths.html.src,devHtml);
}

let dev = gulp.series(gulp.parallel(conn,watch));

module.exports = dev;
