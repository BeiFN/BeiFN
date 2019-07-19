define(["jquery"], function($) {
      'use strict';
      return {
            init:function(){
                  $(".row").click(function(evt){
                        var e = evt||window.event;
                        var target = e.target||e.srcElement;
                        // console.log($(target).attr("data-id"));
                        // 点击的元素将元素的id放进localStorage中，localStorage中只是存放元素的id和count,获取时通过和res中的比较
                        localStorage.setItem("cart",{
                              id:$(target).attr("data-id"),
                              count:1,
                        });
                        // 通过localStorage.getItem("carts")中获取的数据和res中的数据做对比，并且渲染到购物车的页面
                        
                  })
            },
            cartCount:function(){
                  var la = JSON.parse(localStorage.getItem("carts"));
                  var count = 0;
                  $.each(la, function(index,item){
                        count+=item.count;
                  })
                  return count;
            }
            
      }
});