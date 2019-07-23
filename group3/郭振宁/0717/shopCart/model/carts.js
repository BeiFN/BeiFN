define([
    'jquery'
], function() {
    'use strict';
    function Carts() {
        this.cblist = {};
    }
    $.extend(Carts.prototype , {
        init : function() {             
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.cart = $(".cart");
            // console.log(this.main);
            this.main.on("click" , ".add-cart" , $.proxy(this.addCart , this));
            this.main.on("click" , ".add-cart" , $.proxy(this.sumCartsNum , this));            
            this.cart.on("click" , $.proxy(function() {
                var answer = confirm("是否要清空购物车");
                if(answer) {
                    localStorage.clear();
                }
                this.sumCartsNum();
            },this))
            this.sumCartsNum();
            this.main.on("click" , ".btn-reduce" ,$.proxy(this.reduceNum , this));
            this.main.on("click" , ".btn-add" ,$.proxy(this.addNum , this));
        },
        addCart : function(evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr("data-id");
            this.saveCart(id);
        },
        saveCart : function(id) {
            // var arr = [{
            //     id : id,
            //     count : 1
            // }];
            // localStorage.setItem("id" , JSON.stringify(arr));

            var s = localStorage.getItem("carts");
            if(s === null) {
                var a = [{
                    id : id,
                    count : 1
                }]
                console.log(a[0].count);
                localStorage.setItem("carts" , JSON.stringify(a));
            }else {
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each(la , function(index , item) {
                    if(item.id === id) {
                        item.count ++;
                        has_same_id = true;
                    }
                })
                if(!has_same_id) {
                    la.push({
                        id : id,
                        count : 1
                    });
                }
                localStorage.setItem("carts" , JSON.stringify(la));
            }
        },
        sumCartsNum : function() {
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0;
            // console.log(la);
            la.forEach(function(item) {
                sum += item.count;
            })
            // console.log(sum);
            this.cartsNum.html(sum);
        },
        reduceNum : function(evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            // console.log(id);
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function(item , index) {
                if(item.id === id) {
                    item.count--;
                    if(item.count === 0) {
                        la.splice(index , 1);
                    }
                }
            })
            console.log(this.cblist);
            localStorage.setItem("carts" , JSON.stringify(la));
            this.fire("changenum");
            this.sumCartsNum();
        } ,
        addNum : function(evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            // console.log(id);
            la.forEach(function(item , index) {
                if(item.id === id) {
                    item.count++;
                }
            })
            localStorage.setItem("carts" , JSON.stringify(la));
            this.fire("changenum");
            this.sumCartsNum();
        },
        add : function(cb , type) {
            if(!(this.cblist[type] instanceof Array)) {
                this.cblist[type] = [];
            }
            this.cblist[type].push(cb);
        },
        fire : function(type) {
            this.cblist[type].forEach(function(item) {
                typeof item === "function" ? item() : "";
            })
        }
    })
    return new Carts();
});