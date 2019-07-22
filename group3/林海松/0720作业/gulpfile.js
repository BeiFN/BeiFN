//这是打包环境

// 现行引入所需插件
let gulp     = require("gulp");
let cleanCss = require("gulp-clean-css");
let babel    = require("gulp-babel");
let uglify   = require("gulp-uglify");
let dev      = require("./gulp.dev");
//还可以拼接、重命名
let { paths } = require("./gulp.config");//地址外置  方便配置

function styles(){
    return gulp.src(paths.styles.src)//路径
            .pipe(cleanCss()) //压缩 
            .pipe(gulp.dest(paths.styles.dist))//转存
}
function scripts(){
    return gulp.src(paths.scripts.src)
            .pipe(babel({ // ES6 转 ES5
                presets : ['@babel/env']
            }))
            .pipe(uglify()) // 丑化(压缩) 
            .pipe(gulp.dest(paths.scripts.dist) )//转存
}
function html(){
    return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist)) //转存
}

let build = gulp.series( styles , scripts , html );

exports.build = build;
exports.dev   = dev  ;