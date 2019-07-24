    let gulp = require("gulp"); //gulp是一个实例对象;
let rename = require("gulp-rename");

// function sayHello(){
//    return   console.log("hello i'm gulp");
// }
let paths = {
    styles: {
        src: "./src/styles/*.css",
        dist: "./dist/styles"
    },
    scripts: {
        src: "./src/javascript/*.js",
        dist: "./dist/javascript"
    }
}

// 转存
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(rename({
            //basename=>创建一个名为main的文件,与最后一个文件内容相同,且转存之后只有一个main文件;
            //
            basename: "main",  
            suffix : ".min",
        }))
        .pipe(gulp.dest(paths.styles.dist));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dist));
}
//监听
function watch() {
    gulp.watch(paths.styles.src, styles);
}


//定义默认指令;
// exports.default = function(){
//     console.log("hello ,i'm default");
// }

//指令;
exports.styles = styles;
exports.watch = watch;
exports.scripts = scripts;

//指令组合;
let build = gulp.series(styles, scripts);
exports.default = build;