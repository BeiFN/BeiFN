// 加载数据
import config from "../config/config.js";
export default {
    init : function(){
      return $.ajax({
        url : config.ajaxUrl.goods, 
        dataType : "json"
      });
    }
  }
