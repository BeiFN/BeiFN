// 一般安装的插件,js里调用时,前面不用加gulp. 使用方法 函数名();
//gulp内置的方法前面需要加上gulp.
let gulp = require("gulp"); 
let cleanCss = require("gulp-clean-css");
let rename = require("gulp-rename");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let connect = require("gulp-connect");
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
        .pipe(concat("main.css"))    //要先合并再压缩;
        .pipe(cleanCss())
        // .pipe(rename({  //更名操作;
        //     suffix : '.min', //后缀名;
        // }))

        .pipe(gulp.dest(paths.styles.dist));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat("main.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))
         .pipe(uglify())
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