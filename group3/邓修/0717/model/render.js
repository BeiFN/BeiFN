define([
    "jquery"
], function ($) {
    'use strict';
    function Render() { }
    $.extend(Render.prototype, {
        init: function (list, type) {
            if (type === "goods_list") {
                return this.renderGoodsList(list);
            }
            else {
                return this.renderCartList(list);
            }
        },
        //渲染商品列表
        renderGoodsList: function (list) {
            var html = "";
            $.each(list, function (index, item) {
                html += `<div class="col-md-3 goods-box">
                            <div class="goods-img">
                                <img src="${item.thumb_url}" alt="">
                            </div>
                            <p>
                                ${item.goods_name}
                            </p>
                            <div class="goods-detail">
                                <span>￥${ (item.group_price / 100).toFixed(2)}</span>
                                <del>${ (item.market_price / 100).toFixed(2)}￥</del>
                                <em>${item.sales_tip}</em>
                            </div>
                            <div class="goods-btn">
                                <button class="add-cart btn btn-danger" data-id=${item.goods_id}>
                                    加入购物车
                                </button>
                            </div>
                        </div>`;
            });
            return html;
        },
        //渲染购物车列表
        renderCartList: function (list) {
            var ls = localStorage.getItem("cart");//从本地存储获取数据
            var ls_list = JSON.parse(ls === null ? "[]" : ls);//将获取的数据转换为json格式
            list = list.filter(function (goods_item) {//双层循环遍历传入的商品list和获取到的购物车list,对比商品并获取应该加入购物车中的商品数据
                return ls_list.some(function (cart_item) {
                    if (goods_item.goods_id == cart_item.id) {
                        goods_item.count = cart_item.count;//将购物车中每种商品的数量记录在list中
                        return true;
                    }
                });
            });
            var html = "";
            $.each(list, function (index, item) {
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
                            <div class="carts-total-price">
                                ￥${parseInt(item.count * item.group_price / 100)}
                            </div>
                        </div>`;
            });
            return html;
        }
    });
    return new Render();
});