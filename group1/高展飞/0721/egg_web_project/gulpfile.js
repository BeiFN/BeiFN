//1。一个指令
//  function say (){
//      return console.log("震雷削");
//  }
//  //和模块化定义一样
//  exports.say = say;

//模块
let gulp = require ("gulp");//gulp是一个实例对象，找寻路线从自己到node_modules
//压缩整合css
let cleanCss = require("gulp-clean-css");
//重命名
let rename   = require("gulp-rename");
//合并
let concat   = require("gulp-concat");
//转义 es6 -》es5
let babel    = require("gulp-babel");
// 压缩js
let uglify   = require("gulp-uglify");
let dev  = require("./gulp.dev");
// 
let connect  =require("gulp-connect");

//为了方便更改路径，径路经提取出来
//路径
let {paths }= require ("./gulp.config");

let type = process.argv[3] ? process.argv[3] : "dev";

    function styles (){
        return  gulp.src(paths.styles.src)//*.css表示所有css文件，如果index也是**表示不分层级的所有.css文件
            //.pipe(concat("index.css"))
            .pipe(cleanCss())
            // .pipe(rename({
            //     //basename : 'main',//改最后一个
            //     suffix : '.min'
            // }))
            .pipe(gulp.dest(paths.styles.dist))
    }
    
    function scripts(){
        return gulp.src(paths.scripts.src)
                    .pipe(concat("index.js"))
                    .pipe(babel({
                        presets : ['@babel/env']
                    }))
                    .pipe(uglify())
                    .pipe(gulp.dest(paths.scripts.dist))
    }
    
    function html(){
        return gulp.src(paths.html.src)
                .pipe(gulp.dest(paths.html.dist))
    }
    //列队机制，将二者集合，顺序执行
    let build = gulp.series(styles,scripts,html)
    // return build;
    


//默认指令
exports.build = build;
exports.dev = dev;