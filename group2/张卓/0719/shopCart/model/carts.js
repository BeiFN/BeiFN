define([
    'jquery',
    // 'dependency'
], function ($) {
    'use strict';
    function Cart() {
        this.cbList={}
    }
    $.extend(Cart.prototype, {
        init: function () {
            this.goodsList = $(".goods-list")
            this.cartNum = $(".cart-num")
            console.log(this.cartNum)
            this.cartLogo = $(".cart-wrap");
            this.goodsList.on("click", ".add-cart", $.proxy(this.addCart, this))
            this.goodsList.on("click", ".add-cart", $.proxy(this.changeNum, this))
            this.changeNum();
            this.cartLogo.on("click", $.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    //清空缓存
                      localStorage.clear();
                      //在显示数字
                      this.changeNum();
                }
          },this))
           // 购物车加减;
           this.goodsList.on("click" , ".btn-reduce" , $.proxy(this.reduceNum , this));
           this.goodsList.on("click" , ".btn-add"    , $.proxy(this.addNum , this));
        },

        //添加到购物车要进行一次页面上的购物车数据的更改
        addCart: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            //获取商品的id
            var id = $(target).attr("data-id")
            //更改缓存中的数据
            this.addToStorage(id)
        },
        //购物车缓存是否存在 不存在添加 
        //商品数据是否存在，不存在了增加商品数据
        //商品数据存在，增加数量
        addToStorage: function (id) {
            var cartList = localStorage.getItem("carts")
            if (cartList == null) {
                var carts = [{
                    id: id,
                    count: 1
                }]
                localStorage.setItem("carts", JSON.stringify(carts))
            } else {
                var c = JSON.parse(cartList)
                var hasId = false;
                //遍历看是否有
                $.each(c, function (item) {
                    if (item.id == id) {
                        item.count++;
                        hasId = true;
                    }
                })
                //没有这个id
                if (!hasId) {
                    var cart = {
                        id: id,
                        count: 1
                    }
                    c.push(cart);
                }
                localStorage.setItem("carts", JSON.stringify(c))
            }
        },
        //更改购物车中的数据
        changeNum: function () {
            var cartListStr = localStorage.getItem("carts")
            var cartList = JSON.parse(cartListStr);
            var sum = 0;
            console.log(cartList)
            // $.each(cartList, function (item) {
            //     console.log(item.count)
            //     sum += item.count;
            // })
            cartList.forEach(function (item) {
                sum += item.count;
            })
            this.cartNum.html(sum)
        },
         //减少商品数量的
         reduceNum : function(evt){
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
            this.changeNum ();
      },
      //增加商品数量的
      addNum : function(evt){
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
            this.changeNum ();
      },
      //调用add函数  观察者模式  
      add :function(cb,type){
            //第一次创建数组  {type:[function],}
            if(!(this.cbList[type] instanceof Array)){
                  this.cbList[type] = []  
            } 
            this.cbList[type].push(cb);
      },
      fire: function(type){
            //遍历里面的函数
            this.cbList[type].forEach( function(item){
                  typeof item === "function" ? item() : "";
            })
      }
    })
    return new Cart();
});