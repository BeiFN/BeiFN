define(["jquery", "config"], function($, config){
    //加载数据
    'use strict';
      // 加载数据!  => 加载数据的封装;
      // 1. 复用型模块;
      // 2. 业务型模块;
      // 模块不负责执行行为 , 只负责定义行为 ;
      return {
            init : function(){
                  return $.ajax({url :config.ajaxUrl.products, 
                                 data : "v=1&appKey=100001&pageSize=20&pageNum=1&dispId=003001021&sessionId=27bcc746-a177-4cef-8e1e-cc0d79e70407&deviceNumber=1563367575823&channel=1",
                                dataType : "json"});
            }
      }
})