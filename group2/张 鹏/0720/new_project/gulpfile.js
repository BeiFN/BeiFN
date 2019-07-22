//引入开发环境
//搭建打包环境
let gulp = require("gulp"); //gulp是一个实例对象;
let cleanCss = require("gulp-clean-css");
let rename = require("gulp-rename");
let concat = require("gulp-concat");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");

let sass = require("gulp-sass");
sass.compiler = require("node-sass");

//外置路径,方便配置;
let { paths } = require("./gulp.config");

// let devConfig = require("./gulp.dev");

let dev = require("./gulp.dev");


    // 转存
    function styles() {
        return gulp.src(paths.styles.src)
            .pipe(sass().on('error',sass.logError))
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


    function html() {
        return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
    }

    let build = gulp.series(html,styles,scripts);

    
exports.build = build;
exports.dev = dev;