
let {paths ,proxys} = require("./paths");

let gulp = require("gulp");

let connect = require("gulp-connect");
//服务器代理
let proxy = require("http-proxy-middleware");

function conn(){
    return connect.server({
        root : './src',
        livereload : true,
        port : '5233',
        //请求过来的时候先进这里（中间件），再进服务器
        middleware : function(connect,opt){
            let arr=[];
            for(let attr in proxys){
                arr.push(proxy(attr,proxys[attr]))
            }
            return arr;
        }
    });
}

function devHtml(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.daweige))
    .pipe(connect.reload())
}

function devStyles(){
    return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.daweige))
    //无论你做什么都要刷新
    .pipe(connect.reload())
}

function devScripts(){
    return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.daweige))
    .pipe(connect.reload())
}

function watch(){
    gulp.watch(paths.html.src,devHtml);
    gulp.watch(paths.styles.src,devStyles);
    gulp.watch(paths.scripts.src,devScripts)
}

let dev = gulp.series(gulp.parallel(conn,watch));

module.exports = dev;