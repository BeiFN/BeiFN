//配置模块，专门负责的是容易变更的东西，比如开发时的路径
define(function(require, factory) {
    'use strict';
    return {
          ajaxUrl : {
              goods : "./data/data.json"
            // goods : "https://apiv2.pinduoduo.com/api/fiora/subject/goods?subject_id=5574&page=1&size=40"

          }
    }
});