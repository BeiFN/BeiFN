//开发环境
let connect = require("gulp-connect");
let gulp    = require("gulp");
let { paths } = require("./gulp.config");

//纯粹的对源数据进行转存  
function devStyle(){
    return gulp.src(paths.styles.src)
            .pipe(gulp.dest(paths.styles.dist))
            .pipe(connect.reload());
}
function devScript(){
    return gulp.src(paths.scripts.src)
            .pipe(gulp.dest(paths.scripts.dist))
            .pipe(connect.reload());
}
function devHtml(){
    return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
            .pipe(connect.reload())
}
//代理服务器 
function myConnect(){
    connect.server({
        port : 8888 , //端口号
        root : "./dist" , // 服务器地址
        livereload : true , // 现存重载
    })
}
//监听  
function watch(){ //当源数据改变时，转存地址的数据也会随着改变
    gulp.watch( paths.styles.src   , devStyle );
    gulp.watch( paths.scripts.src , devScript);
    gulp.watch( paths.html.src    , devHtml  );
}
//执行队列 ( 异步执行 ) 
// gulp.series() 用于串行（顺序）执行
// gulp.parallel() 用于并行执行
let dev = gulp.series( gulp.parallel(myConnect , watch) );
//默认指令 导出
module.exports = dev ;