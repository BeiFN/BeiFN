define([
        "jquery",
        "conf",
        "dao",
        "render"
    ],
    function ($, conf, data, render) {
        'use strict';

        function SetUp() {
            this.goodslistBox = $(".goods-list .row");
            this.carButton = $(".btn-carts");
            this.title = $(".content-title")
            this.goodslistBtn = $(".btn-goodslist");
            this.cartsNum = $(".cart-num");
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.carts = $(".cart-wrap");
            this.ini();
        }
        $.extend(
            SetUp.prototype, {
                async ini() {

                    let dataGoodsListRes = data.done("goodslist");
                    this.cachGoodsList = await dataGoodsListRes;
                    this.renderList("goodslist");
                    this.cartsNumBrash();
                    // 加载购物车视图
                    this.carButton.on("click", (ev) => {
                        let e = ev || window.event;
                        let capatureE = e.target || e.srcElement;
                        $(capatureE.parentNode).addClass("active")
                            .siblings()
                            .removeClass("active");
                        this.renderList("cartslist");
                    });
                    // 加载 商品列表视图
                    this.goodslistBtn.on("click", (ev) => {
                        let e = ev || window.event;
                        let capatureE = e.target || e.srcElement;
                        $(capatureE.parentNode).addClass("active")
                            .siblings()
                            .removeClass("active");
                        this.renderList("goodslist");
                    });

                    this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
                    // 购物车加减;
                    this.main.on("click", ".btn-reduce", $.proxy(this.reduceGoodsNum, this));
                    this.main.on("click", ".btn-add", $.proxy(this.addGoodsNum, this));

                },
                addCart(evt) {
                    let e = evt || window.event;
                    let target = e.target || e.srcElement;
                    let id = $(target).attr("data-id");
                    let car = data.db("shopcart");
                    let hasGoods = false;
                    car.forEach(item => {
                        if (item.id == id) {
                            item.count++;
                            hasGoods = true;
                        }
                    });

                    hasGoods ? data.db("shopcart", car) : data.db("shopcart", {
                        id,
                        count: 1
                    });

                    this.cartsNumBrash();
                },
                cartsNumBrash: function () {
                    var la = data.db("shopcart");
                    var sum = 0;
                    la.forEach(function (item) {
                        sum += item.count;
                    })
                    this.cartsNum.html(sum);
                    return sum;
                },
                reduceGoodsNum: function (evt) {
                    var e = evt || window.event;
                    var target = e.target || e.srcElement;
                    var id = $(target).parent().attr("data-id");
                    var la = data.db("shopcart");
                    la.forEach(function (item, index) {
                        if (item.id == id) {
                            item.count--
                            if (item.count === 0) {
                                la.splice(index, 1);
                            }
                        }
                    })
                    data.db("shopcart", la);
                    this.cartsNumBrash();
                    this.renderList("cartslist");
                },
                addGoodsNum: function (evt) {
                    var e = evt || window.event;
                    var target = e.target || e.srcElement;
                    var id = $(target).parent().attr("data-id");
                    var la = data.db("shopcart");
                    la.forEach(function (item, index) {
                        if (item.id == id) {
                            item.count++
                        }
                    })
                    data.db("shopcart", la);
                    this.renderList("cartslist");
                    this.cartsNumBrash();
                },

                renderList(type) {
                    let html = render(this.cachGoodsList, type).html;
                    this.goodslistBox.html(html);
                    type === "goodslist" ? this.title.html("商品列表") : this.title.html("购物车");
                }


            }
        )


        new SetUp();
    });
//  console.log(this.cachGoodsList);
//  console.log(html);
// console.log(conf);
// console.log(data);
// console.log(render);
//   let dataGoodsListRes = data.get("goodslist");
// dataGoodsListRes.done((res) => {
//     cachGoodsList = res
//     console.log(cachGoodsList);
// })