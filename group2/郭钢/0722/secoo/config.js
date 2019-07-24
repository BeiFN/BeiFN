module.exports = {
      paths : {
            styles : {
                  src  : "./src/scss/*.css",
                  dist : "./dist/styles/"
            },
            font :{
                  src :"./src/scss/font/*",
                  dist :"./dist/styles/font/"
            },
            scripts : {
                  src  : "./src/scripts/*.js",
                  dist : "./dist/scripts/"
            },
            libs : {
                  src  : "./src/scripts/libs/*.js",
                  dist : "./dist/scripts/libs/"
            },
            html    : {
                  src : "./src/html/*.html",
                  dist: "./dist/"
            }
      },
      proxyList : {
            // "/baidu" : {
            //       target : "https://www.baidu.com",
            //       changeOrigin : true ,
            //       pathRewrite : {
            //             "^/baidu" : ""
            //       }
            // }
      }
 }