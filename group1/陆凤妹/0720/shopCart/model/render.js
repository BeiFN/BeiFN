// 渲染页面

// 1、商品列表渲染
// 2、购物车小列表渲染

define([
          
          'jquery'
], function(require, factory) {
          'use strict';
          // console.log($);

          function Render(){
                    // 面向对象开发
                    $.extend(Render.prototype,{
                              // 根据数据，传入内容
                              init : function(list , type){
                                        if(type === "goods_list"){
                                                  this.renderGoodsList(list);
                                        }
                                        if( type === "cart_list"){
                                                  this.renderCartsList(this);
                                        }
                              },
                              renderGoodsList : function(list){
                                        var html = "";
                                        $.each(list,function(index,item){
                                                  console.log(item);
                                        })
                              }
                    })
                    return new Render();
          }
          
});