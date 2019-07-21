

// // 一个指令
// function sayHello(){
//    return console.log("hello");

// }
// exports.sayHello = sayHello;


let gulp = require("gulp");//gulp 是一个实例对象
var paths = {
    styles :{
        src : "./src/styles/index/*.css",
        dist :"./dist/styles",
    },
    // scripts : {
    //     src: "./src/scripts",
    //     dist: "./dist/scripts",
    // }
}
// function styles(){
//     return gulp.src("./src/styles/*.css")
//     .pipe(gulp.dest("./dist/styles"))//转存路径
// }


function styles(){
    return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.dist))//转存路径
}
console.log(gulp);

exports.styles = styles;


// // function scri

// // 默认指令
// exports.default = function(){
//     console.log("hello")
// }