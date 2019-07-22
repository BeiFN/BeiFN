//1。一个指令
//  function say (){
//      return console.log("震雷削");
//  }
//  //和模块化定义一样
//  exports.say = say;

//模块
let gulp = require ("gulp");//gulp是一个实例对象，找寻路线从自己到node_modules

//为了方便更改路径，径路经提取出来
//路径
let paths ={
    styles :{
        src : "./src/styles/index/*.css",
        dist : "./dist/styles"
    },
    scripts :{
        src : "./src/javascripts/index/*.css",
        dist : "./dist/javascripts"
    }
}
//转存
function styles (){
    return  gulp.src(paths.styles.src)//*.css表示所有css文件，如果index也是**表示不分层级的所有.css文件
        .pipe(gulp.dest(paths.styles.dist))
}

function scripts(){
    return gulp.src(paths.scripts.src)
                .pipe(gulp.dest(paths.scripts.dist))
}

//监听
function watch(){
    gulp.watch(paths.styles.src,styles)
}

//列队机制，将二者集合，顺序执行
let build = gulp.series(styles,scripts)

//指令
exports.styles = styles ;
exports.watch = watch;
exports.scripts = scripts;
//默认指令
exports.default = build;