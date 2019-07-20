//1.开头加封号避免被别人坑，别人写匿名，你的不能用
;;

//首先得到jquery
(function(){
    //3.插件的使用场景=》全局||局部
    //全局 extend each post get 和dom操作无关，只是实现某一功能
    //局部 find show hidden animate
    //操作cookie=》全局
    //设置 获取 删除
    cookie =  $.cookie = function( name, value,options){  //连等，方便引用  实现赋值功能，方便后续引用
                    //如果输入一位参数，查
                  if(arguments.length === 1){ 
                        var a = document.cookie.split("; "); //返回键值对 数组
                        var res = ""; 
                        $.each( a , function( index ,item){
                            if(item.split("=")[0] === name){
                                res = item.split("=")[1]
                            } //遍历 拆分键值对 找到要查的内容    
                        })
                        return res;
                  }
                  options === undefined? options = {}:"";
                  typeof options === "object" ? "" : options = {};
                  return (document.cookie = [
                        name + "=" + value ,
                        options.expires ?";expires=" + ((d = new Date()).setDate(d.getDate() + options.expires) && d ): "",
                        options.path   ?";path=" +  options.path : "",
                        options.domain ?";domain=" +  options.domain : "",
                        options.secure ?";secure=" +  options.secure : "",
                  ].join(""));
     
                  $.removeCookie = function(name,path){
                    cookie(name,"",{
                           expires:-1,
                           path : path? path:""
                    })
                }
    //2.传入jQuery作为实参，用局部变量形参$接受，确保$就指向jQuery
}})(jQuery,window)