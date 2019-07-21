// console.log("hello i am gulpfile.js")

// 获取实例对象
let gulp = require("gulp");

// 路径
let paths = {
    styles : {
        src  : "./src/styles/*.css",
        dest : "./dist/styles/"
    },
    scripts : {
        src  : "./src/javascripts/*.js",
        dest : "./dist/javascripts/"
    }

}

// 处理css
function styles(){
    return gulp.src(paths.styles.src)
            .pipe(gulp.dest(paths.styles.dest)) 
}
// 处理js
function scripts(){
    return gulp.src(paths.scripts.src)
            .pipe(gulp.dest(paths.scripts.dest))
}

// 监听
function watch(){
    gulp.watch(paths.styles.src,styles)
}

// 放入列队中
let build = gulp.series(styles,scripts);

// 默认值
exports.default = build;

// 指令
exports.styles  = styles;
exports.scripts = scripts;
exports.watch   = watch ;
 

