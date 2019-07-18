// 1.开头加分号，避免被别人坑;
;;
(function ($){
      // 3. 插件的使用场景 => 局部插件 | 全局插件;
      // 方便引用;
      var cookie = $.cookie = function( name , value , options){
            if (arguments.length === 1) {
                  var a = document.cookie.split("; ");
                  var res = "";
                  $.each(  a , function( index , item ){
                        if(item.split("=")[0] === name){
                              res = item.split("=")[1]
                        }
                  })
                  return res;
            }
            options === undefined ? options = {} : "";
            // 设置cookie;
            return (document.cookie = [
                  name + "=" + value,
                  options.expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + options.expires) && d) : "",
                  options.path ? ";path=" + options.path : "",
                  options.domain ? ";domain=" + options.domain : "",
                  options.secure ? ";secure=" + options.secure : ""
            ].join(""))
      }

      $.removeCookie = function( name ,  path){
            cookie(name , "" , {
                  expires : - 1,
                  path : path ? path : ""
            });
      }
// 2. 传入jQuery 作为实参,用 局部变量形参 $ 接受 , 确保 $ 就指向jQuery;
})(jQuery)