//first gulp command
const gulp = require("gulp");

//task("指令名",callback);
gulp.task("html",()=>{
    //src里的路径支持正则表达式
    return gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
})

gulp.task("style",()=>{
    return gulp.src("./src/styles/index/*.css").pipe(gulp.dest("./dist/style"));
})

gulp.task("script",()=>{
    return gulp.src("./src/scripts/index/*.js").pipe(gulp.dest("./dist/script"));
})

//gulp.task("default",["html","style","script"]);


gulp.task("watch",()=>{
    gulp.watch("./src/*.html",["html"]);
    gulp.watch("./src/styles/index/*.css",["style"]);
    gulp.watch("./src/scripts/index/*.js",["script"]);
})