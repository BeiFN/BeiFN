//一个指令

// function sayHello(){
//     return console.log("hello,i am gulp");
// }
// exports
// .sayHello=sayHello;
let gulp=require("gulp");
function styles(){
    return gulp.src("./src/styles/index/*  .css")
    .pipe (gulp.dest("./dist/styles/"));
}
exports.styles=styles;