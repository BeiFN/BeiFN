define(["jquery"], function ($) {
    'use strict';
    function Render() { }
    //商品列表渲染，购物车列表渲染
    $.extend(Render.prototype, {

        init: function (res, type) {
            if (type === "goods_list") {
                return this.goodsRender(res);
            }
            if (type === "carts_list") {
                return this.cartsRender(res);
            }
        },
        goodsRender: function (res) {
            // console.log(res);
            var html = "";
            $.each(res, function (index, item) {
                html += `<div class="col-md-3 goods-box">
                            <div class="goods-img">
                                <img src=${item.thumb_url} alt="">
                            </div>
                            <p>
                                ${item.goods_name}
                            </p>
                            <div class="goods-detail">
                                <span>￥${parseInt(item.group_price / 100)}</span>
                                <del>￥${parseInt(item.market_price / 100)}</del>
                                <em>${item.sales_tip}</em>
                            </div>
                            <div class="goods-btn">
                                <button class="add-cart btn btn-danger" data-id=${item.goods_id}>加入购物车</button>
                            </div>
                        </div>`;
            })
            return html;
        },
        cartsRender: function (res) {
            var s = localStorage.getItem("carts");
            var la = JSON.parse(s);

            var res = res.filter(function(goods_item){
                return la.some(function(carts_item){
                    if(carts_item.id == goods_item.goods_id){
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })
            })


            var html = "";
            $.each(res, function (index, item) {
                html += `<div class="col-md-12 carts-item">
                            <div class="carts-img">
                                <img src="${item.thumb_url}" alt="">
                            </div>
                            <p class="carts-title">
                            ${item.goods_name}
                            </p>
                            <div class="carts-details" data-id="${item.goods_id}">
                                <button class="btn btn-default btn-reduce">-</button>
                                <span>${item.count}</span>
                                <button class="btn btn-default btn-add">+</button>
                            </div>
                            <div class="carts-total-price">￥${ parseInt(item.count * item.group_price / 100)}</div>
                        </div>`;
            })
            return html;
        },
    })
    return new Render();
});