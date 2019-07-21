//1.一个指令;
function sayHello(){
    return console.log("hello i'm gulp");
}
exports.sayHello = sayHello;
//模块;

let gulp        =require("gulp");//gulp是一个实例对象;
let clean       =require("gulp-clean-css");
let renama      =require("gulp-rename");
let contat      =require("gulp-contat")
let babel       =require("gulp-bable");
let uglify      =require("gulp-uglify");

//路径;
let paths = {
    styles : {
        src : ".src/styles/index/*.css",
        dist: "./dist/styles/"
    },
    scripts :{
        src : "./src/javascripts/index/*.js",
        dist: "./dist/javascripts/"
    }
}
//转存;
function styles(){
    return gulp.src(path.styles.src)
    .pipe(cleanCss())
    .pipe(rename({
        suffix : '.min'
    }))
    .pipe(gulp.dest(paths.styles.dist))
}
function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(concat("main.min.js"))
    .pipe(balel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dist))
}

//监听
function watch(){
    gulp.watch(paths.styles.src,styles)
}

let bulid = gulp.series(styles,scripts);

//指令;
exports.styles   =styles;
exports.watch    =watch;
exports.scripts   =scripts;



//默认指令;
exports.default = bulid;