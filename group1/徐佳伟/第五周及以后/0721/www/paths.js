module.exports = {
    paths : {
        styles  : {
            src : "./src/styles/index/**/*.css",
            daweige : "./daweige/styles/"
        },
        scripts : {
            src : "./src/scripts/index/**/*.js",
            daweige : "./daweige/scripts/"
        }, 
        html : {
            src : "./src/",
            daweige : "./daweige/"
        }
    },
    proxys :{
        "/baidu" :{
            target :'https://www.baidu.com',
            changeOrigin:true,
            //正则 去掉baidu
            pathRewrite : {
                "^/baidu" : ""
            }
        },
        "/fangta" :{
            target :'https://www.duitang.com/napi/blog/list/by_filter_id/?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E6%89%8B%E5%B7%A5DIY&start=24&_=1563637507507',
            changeOrigin :true,
            pathRewrite :{
                "^/fangta" : ""
            }
        }
    }

}

