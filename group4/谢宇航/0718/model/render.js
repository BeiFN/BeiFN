// 渲染页面;
// 1. 商品列表渲染;
// 2. 购物车小列表渲染;
define(["jquery"], function ($) {
    'use strict';
    function Render() { }
    $.extend(Render.prototype, {
        init: function (list, type) {
            if (type === "goods_list")
                return this.renderGoodsList(list);
            if (type === "carts_list")
                return this.renderCartsList(list);
        },
        renderGoodsList: function (list) {
            var html = "";
            // 需要对list商品列表进行遍历，然后返回html
            $.each(list, function (index, item) {
                html += `  <div class="col-md-3 goods-box">
                                <div class="goods-img">
                                    <img src="${item.thumb_url}" alt="">
                                </div>
                                <p>
                                ${item.goods_name}
                                </p>
                                <div class="goods-detail">
                                    <span>￥${ (item.group_price / 100).toFixed(2)}</span>
                                    <del>${ (item.normal_price / 100).toFixed(2)}￥</del>
                                    <em>${item.sales_tip}</em>
                                </div>
                                <div class="goods-btn">
                                    <button class="add-cart btn btn-danger"
                                    data-id=${item.goods_id}
                                    >加入购物车</button>
                                </div>
                        </div>`;
            })
            return html;
        },
        renderCartsList: function (list) {
            // 渲染购物车列表，首先考虑从哪获取数据=>本地local storage(以对象型数组保存，获取到的是JSON字符串)
            var ls = localStorage.getItem("carts");
            // 需要json.parse转换成数组, 还需要判断缓存是否为空
            var la = JSON.parse(ls === "null" ? "[]" : ls);
            // 然后根据数据的id和缓存的id进行匹配，获取到缓存中每个商品的信息，保存到数组里等待渲染
            list = list.filter(function (goods_item) {
                return la.some(function (carts_item) {
                    if (carts_item.id === goods_item.goods_id) {
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })
            })
            var html = "";
            $.each(list, function (index, item) {
                html += `  <div class="col-md-12 carts-item">
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
        }
    })
    return new Render();
})