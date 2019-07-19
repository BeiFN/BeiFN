define(["jquery"], function ($) {
    "use strict";
    function Carts() {
        this.cbList = {};
    }
    // 购物车功能无非就是添加各种乱七八糟的事件，然后写各种乱七八糟的处理函数
    $.extend(Carts.prototype, {
        init: function () {
            this.main = $(".goods-list");  // 商品列表 
            this.carts = $(".cart-wrap");  // 清空购物车按钮
            this.cartsNum = $(".cart-num");  // 购物车总数统计
            // 给加入购物车添加事件
            this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
            this.main.on("click", ".add-cart", $.proxy(this.sumCartNum, this));
            // 还得给购物车加个清空事件
            this.carts.on("click", $.proxy(function () {
                var clear = confirm("是否清空购物车");
                if (clear) {
                    localStorage.clear();
                    this.sumCartNum();
                }
            }, this));
            this.sumCartNum();
            // 购物车加减;
            this.main.on("click", ".btn-reduce", $.proxy(this.reduceGoodsNum, this));
            this.main.on("click", ".btn-add", $.proxy(this.addGoodsNum, this));
        },
        addCart: function (evt) {
            var id = $(evt.target).attr("data-id");
            this.saveCart(id);
        },
        saveCart: function (id) {
            // var arr = [{
            //       id    : id,
            //       count : 1
            // }]
            // localStorage.setItem("carts",JSON.stringify(arr));
            // console.log(localStorage.getItem("carts"));
            // 1. carts不存在; => 创建结构放入数据;
            // 2. carts存在  : 
            //              有相同id => count ++;
            //             没有相同id => 新建对象插入;
            var s = localStorage.getItem("carts");
            if (s === null) {
                var a = [{
                    id: id,
                    count: 1
                }];
                localStorage.setItem("carts", JSON.stringify(a));
            }
            else {
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each(la, function (index, item) {
                    if (item.id === id) {
                        item.count++;
                        has_same_id = true;
                    }
                })
                if (!has_same_id) {
                    // 没有一样的;
                    la.push({
                        id: id,
                        count: 1
                    })
                }
                localStorage.setItem("carts", JSON.stringify(la));
            }
        },
        sumCartNum: function () {
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0;
            $.each(la, function (index, item) {
                sum += item.count;
            })
            this.cartsNum.html(sum);
            return sum;
        },
        reduceGoodsNum: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            // 獲取到購物車列表之後就遍歷，然後保存local storage
            $.each(la, function (index, item) {
                if (item.id == id) {
                    item.count--;
                    if (item.count === 0) {
                        la.splice(index, 1);
                    }
                }
            })
            localStorage.setItem("carts", JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum: function (evt) {   // 增加某件商品数量
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            // 獲取到購物車列表之後就遍歷，然後保存local storage
            $.each(la, function (index, item) {
                if (item.id == id) {
                    item.count++;
                }
            })
            localStorage.setItem("carts", JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add: function (cb, type) {
            console.log(this.cbList)
            if (!(this.cbList[type] instanceof Array)) {
                this.cbList[type] = []
            }
            this.cbList[type].push(cb);
        },
        fire: function (type) {
            this.cbList[type].forEach(function (item) {
                typeof item === "function" ? item() : "";
            })
        }
    })

    return new Carts();   //不要忘记return！！！
})