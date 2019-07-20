define([
    "jquery"
], function ($) {
    'use strict';
    function Cart() {
        this.cbList = {};
    }
    $.extend(Cart.prototype, {
        init: function () {
            this.main = $(".goods-list");
            this.cartNum = $(".cart-num");
            this.cart = $(".cart-wrap");
            this.title = $(".content-title");
            this.main.on("click", ".add-cart", $.proxy(this.addToCart, this));
            this.main.on("click", ".add-cart", $.proxy(this.sumCartGoodsNum, this));
            this.cart.on("click", $.proxy(function () {//点击清空购物车
                var clear = confirm("是否清空购物车?");
                if (clear) {
                    localStorage.clear();
                    if (this.cartNum.html() === "0") {
                        alert("购物车为空!");
                        return false;
                    }
                    if (this.title.html() === "商品列表") {
                        this.sumCartGoodsNum();
                        return false;
                    }
                    this.execute("againRenderCart");
                    this.sumCartGoodsNum();
                }
            }, this));
            //购物车商品数量增减
            this.main.on("click", ".btn-reduce", $.proxy(this.reduceCartGoodsNum, this));
            this.main.on("click", ".btn-add", $.proxy(this.addCartGoodsNum, this));
            this.sumCartGoodsNum();//加载完获取购物车中商品数量
        },
        //获取选中的商品id并调用函数存入本地存储
        addToCart: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr("data-id");//获取商品id
            this.storeToLocalStorage(id);//存入本地存储
        },
        //将对应id的商品数据存入本地存储
        storeToLocalStorage: function (id) {
            var ls = localStorage.getItem("cart");
            if (ls === null) {
                var item = [{
                    id: id,
                    count: 1
                }];//使用数组格式存储每一种商品的信息
                localStorage.setItem("cart", JSON.stringify(item));//转换为JSON格式的字符串
                // console.log(JSON.stringify(item));
            }
            else {
                var ls_list = JSON.parse(ls);//解析完为数组
                console.log(ls_list);
                var has_same_id = false;
                $.each(ls_list, function (index, item) {
                    if (item.id === id) {//存在一样的商品,就将对应商品数量加1
                        item.count++;
                        has_same_id = true;
                    }
                });
                if (!has_same_id) {
                    //没有一样的商品
                    ls_list.push({
                        id: id,
                        count: 1
                    });//向数组中加入新的一项
                }
                localStorage.setItem("cart", JSON.stringify(ls_list));
            }
        },
        //统计购物车中所有商品的数量
        sumCartGoodsNum: function () {
            var ls = localStorage.getItem("cart");
            var ls_list = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0;
            $.each(ls_list, function (index, item) {
                sum += item.count;
            });
            this.cartNum.html(sum);
            return sum;
        },
        //减少商品数量
        reduceCartGoodsNum: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var ls_list = JSON.parse(localStorage.getItem("cart"));
            // $.each(ls_list, function (index, item) {
            //     if (item.id === id) {
            //         item.count--;
            //         if (item.count === 0) {
            //             // console.log(index);
            //             ls_list.splice(index, 1);
            //         }
            //     }
            // });
            ls_list.forEach(function (item, index) {
                if (item.id === id) {
                    item.count--;
                    if (item.count === 0) {
                        // console.log(index);
                        ls_list.splice(index, 1);
                    }
                }
            });
            localStorage.setItem("cart", JSON.stringify(ls_list));
            this.execute("againRenderCart");
            this.sumCartGoodsNum();
        },
        //增加商品数量
        addCartGoodsNum: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var ls_list = JSON.parse(localStorage.getItem("cart"));
            $.each(ls_list, function (index, item) {
                if (item.id === id) {
                    item.count++;
                }
            });
            localStorage.setItem("cart", JSON.stringify(ls_list));
            this.execute("againRenderCart");
            this.sumCartGoodsNum();
        },
        //将外部函数传入内部
        addOutterFunction: function (cb, type) {//添加订阅功能
            //不存在当前类型的函数数组时,创建当前类型的数组
            if (!(this.cbList[type] instanceof Array)) {
                this.cbList[type] = [];
            }
            this.cbList[type].push(cb);//否则就将传入的函数存入数组中
        },
        //根据type执行相应函数
        execute: function (type) {//观察者模式:发布者发布消息;订阅者收到消息执行相应方法
            $.each(this.cbList[type], function (index, item) {
                typeof item === "function" ? item() : "";
            });
        }
    });
    return new Cart();
});