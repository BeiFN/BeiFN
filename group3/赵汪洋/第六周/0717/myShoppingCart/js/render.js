define([
    'jquery'
], function ($) {
    'use strict';

    function Render() {};
    Render.prototype.init = function (list, type) {
        if (type === "goods_list") return this.renderGoodsList(list);
        if (type === "carts_list") return this.renderCartsList(list); // 问题：能否优化？？？
    };
    Render.prototype.renderGoodsList = function (list) {
        var html = "";
        // console.log(list);
        $.each(list, function (index,item) {
            // console.log(item);
            html += `<div class="col-md-3 goods-box">
                         <div class="goods-img">
                         <img src="${item.thumb_url}" alt="">
                         </div>
                         <p>${item.goods_name}</p>
                         <div class="goods-detail">
                             <span>￥${item.group_price/100}</span>
                             <del>${item.market_price/100}￥</del>
                              <em>${item.sales_tip}</em>
                         </div>
                         <div class="goods-btn">
                             <button class="add-cart btn btn-danger" data-id=${item.goods_id}>加入购物车</button>
                         </div>
                     </div>`; // 问题：这是es6写法，能否优化？？？
            
        });
        // console.log(html);
        return html;
    };
    Render.prototype.renderCartsList = function () {};
    return new Render();
});