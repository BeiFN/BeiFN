// gulp的配置文件， 让gulp做些啥 都在这里面设置
// nodejs => commonsjs module  引入require  定义 模块暴露  module.exports = xxx;

// require  找寻方式 1../gulp.js   2.node_moduls/gulp index.js
var gulp = require("gulp");
console.log(gulp);   

// 成功的获取到了gulp的实例对象;

// 只要执行gulp指令那么就会执行gulpfile.js;


// gulp => 路径规则 : **/*.css 不论层级内的以 .css 为后缀的文件;
// dest => 转存 ;
var paths = {
    styles: {
          src: 'src/styles/**/*.css',
          dest: 'dist/styles/'
    },
    scripts: {
          src: 'src/scripts/**/*.js',
          dest: 'dist/scripts/'
    }
};

// 处理css的 => 找到css 放进管道进行转存。
function styles() {
    // 找到源文件;  =>  流 buffer;
    return gulp.src(paths.styles.src)
    // gulp => pipe; 处理流都在管里处理;
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
}


var build = gulp.series(gulp.parallel(styles));


exports.styles  = styles;
exports.watch   = watch;
exports.default = build;


// require  module.exports
// gulp.src();找到源文件，流文件buffer
// gulp.pipe();管子，操作源数据
// gulp.dest();转存
// gulp.series();