// 整个项目的配置文件，配置的内容可以在整个项目中访问
// define接收两个参数，第一个为地址数组，第二个为回调函数，配置文件中的define的第一个数组参数可以省略
define(function() {
      'use strict';
      // 配置假json的地址，项目中都可以访问，方便修改，
      return {
            jsonUrl:{
                  // config中的goods中的地址最终是在index.html中访问的，所以应该相对于index.html设置
                  goods:"./data/data.json"
            }
      }
});