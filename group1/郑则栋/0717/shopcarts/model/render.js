//页面渲染
define([
    'jquery',
    './loaddate'
], function () {
    'use strict';
    function render() { }
    $.extend(render.prototype, {
        init: function (list, type) {
            
            if (type === 'goods_list') {
                return this.renderGoods(list);

            }
            if (type === 'carts_list') {
                return this.renderCarts(list);
            }
        },
        renderGoods: function (list) {
            var html = '';
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
                      <del>${ (item.market_price / 100).toFixed(2)}￥</del>
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
            // $('.row').html(html);
        },
        renderCarts: function (list) {
            var localStorageInformations = JSON.parse(localStorage.getItem('carts'));
            // console.log(localStorageInformations)
            list = list.filter(function (goods_item, goods_index) {
                return localStorageInformations.some(function (localStorageInformations_item, localStorageInformations_index) {
                    if(localStorageInformations_item.id==goods_item.goods_id){
                        goods_item.count=localStorageInformations_item.count;
                        return true;
                    }
                })
            })
            var html = '';
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

    return new render();
}

);