define([
      'jquery',
], function() {
      'use strict';
      function Carts(){
            // 实例
            this.cbList = {};
      }
      $.extend( Carts.prototype , {
            // 原型添加方法属性
            init : function(){
                  this.main = $(".goods-list");
                  this.cartsNum = $(".cart-num");
                  this.carts = $(".cart-wrap");
                  // 添加购物车事件
                  this.main.on("click" , ".add-cart" ,$.proxy(this.addCart , this) )
                  this.main.on("click" , ".add-cart" ,$.proxy(this.sumCartNum , this) )

                  // 点击购物车清空
                  this.carts.on("click", $.proxy(function(){
                        var clear = confirm("是否清空购物车");
                        if(clear){
                              // 本地存储购物车数据清空
                              localStorage.clear();
                              this.sumCartNum();
                        }
                  },this))
                  // 计算购物车商品总数
                  this.sumCartNum();
                  // 购物车加减;
                  this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceGoodsNum , this));
                  this.main.on("click" , ".btn-add"    , $.proxy(this.addGoodsNum , this));
            },

            addCart:function(evt){
                  // console.log(1);
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).attr("data-id");
                  // console.log(id);
                  //把数据放入localStroage 里面;  
                  this.saveCart(id);
            },
            saveCart : function(id){
                  // 获取购物车数据
                  var s = localStorage.getItem("carts");
                  if(s === null){
                        // 购物车为空直接添加商品id
                        var a = [{
                              id    : id,
                              count : 1
                        }]
                        // 将购物车数据存储到本地localStorage
                        localStorage.setItem("carts",JSON.stringify(a));
                  }else{
                        var la = JSON.parse(s);
                        var has_same_id = false;
                        // 购物车存储数据则遍历，存在相同id则数目添加
                        $.each(la , function( index , item){
                              if(item.id === id){
                                    item.count ++;
                                    has_same_id = true;
                              }
                        })
                        if(!has_same_id){
                              // 不存在相同id，直接添加id
                              la.push({
                                    id : id,
                                    count : 1
                              })
                        }
                        //本地存购物车储数据更新
                        localStorage.setItem("carts",JSON.stringify(la));
                  }
            },
            // 购物车总数目计算
            sumCartNum : function(){
                  var ls = localStorage.getItem("carts");
                  var la = JSON.parse(ls === null ? "[]" : ls);
                  var sum = 0;
                  la.forEach( function(item){
                        sum += item.count;
                  })
                  this.cartsNum.html(sum);
                  return sum;
            },
            // 点击减少商品
            reduceGoodsNum : function(evt){
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).parent().attr("data-id");
                  var la = JSON.parse(localStorage.getItem("carts"));
                  la.forEach( function(item,index){
                        if(item.id == id){
                              item.count --
                              if(item.count === 0){
                                    la.splice(index,1);
                              }
                        }
                  })
                  localStorage.setItem("carts" , JSON.stringify(la));
                  this.fire("changeNum");
                  this.sumCartNum ();
            },
            // 点击添加商品
            addGoodsNum : function(evt){
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var id = $(target).parent().attr("data-id");
                  var la = JSON.parse(localStorage.getItem("carts"));
                  la.forEach( function(item,index){
                        if(item.id == id){
                              item.count ++
                        }
                  })
                  localStorage.setItem("carts" , JSON.stringify(la));
                  this.fire("changeNum");
                  this.sumCartNum ();
            },
            // 添加监听者方法
            add :function(cb,type){
                  console.log(this.cbList);
                  if(!(this.cbList[type] instanceof Array)){
                        this.cbList[type] = []  
                  } 
                  this.cbList[type].push(cb);
            },
            // 发布监听
            fire: function(type){
                  this.cbList[type].forEach( function(item){
                        typeof item === "function" ? item() : "";
                  })
            }
      })

      return new Carts();
});