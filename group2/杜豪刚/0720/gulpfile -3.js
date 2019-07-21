// console.log("hello i am gulpfile.js")

// 获取实例对象
let gulp     = require("gulp");
let cleanCss = require("gulp-clean-css");
let rename   = require("gulp-rename");
let concat   = require("gulp-concat");
let babel    = require("gulp-babel");
let uglify   = require("gulp-uglify");
let connect  = require("gulp-connect");

// 路径
let { paths } = require("./src/gulp.config.js");
let type = process.argv[3] ? process.argv[3] : "dev";

// 处理css
function styles(){
    return gulp.src(paths.styles.src)
            .pipe(concat("index.css"))          //合并成一个文件
            .pipe(cleanCss())                   //丑化，去掉注释
            .pipe(rename({                      //更改名字
                suffix : ".min"     //后缀名.min
            }))
            .pipe(gulp.dest(paths.styles.dest)) 
}
// 处理js
function scripts(){
    return gulp.src(paths.scripts.src)
            .pipe(concat("index.js"))       //合并成一个文件
            .pipe(babel({                   //es6语法改为es5语法
                presets: ['@babel/env']
            }))
            .pipe(uglify())                 //丑化，去掉注释
            .pipe(gulp.dest(paths.scripts.dest))
}
// 页面刷新功能
function html(){
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())                 //页面刷新
}
// 处理服务器
function userconnect(){
    return connect.server({
        root : "./src",         //地址
        port : 8888,            //端口号
        livereload : true,      //是否开启自动刷新功能
    });
}

// 监听
function watch(){
    gulp.watch(paths.styles.src,styles);
    gulp.watch(paths.scripts.src,scripts);
    gulp.watch(paths.html.src,html)
}

// 放入列队中
let build = gulp.series(gulp.parallel(userconnect,watch));

// 默认值
exports.default = build;

// 指令
exports.styles  = styles;
exports.scripts = scripts;
exports.watch   = watch ;
exports.connect = userconnect; 
exports.html    = html;