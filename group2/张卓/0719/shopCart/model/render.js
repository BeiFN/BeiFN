define([
    'jquery',
    // 'dependency'
], function ($) {
    'use strict';
    function Render() { }
    $.extend(Render.prototype, {
        init: function (goodsList, type) {
            if (type === "goods_list") {
                return this.goodsListRender(goodsList);
            }
            if (type === "cart_list") {
                return this.cartListRender(goodsList);
            }
        },
        //渲染商品列表
        goodsListRender: function (list) {
            var html = ""
            //这里记得要把获取到的数据中再获取goods_list
            $.each(list, function (index, item) {
                //遍历里面的每一个元素
                // console.log(item)
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
        },
        cartListRender: function (list) {
            //购物车渲染  
            //获取到了缓存的数据
            var cache = localStorage.getItem("carts")
            //这个是将字符串转换成为数组的形式
            console.log(cache)
            var cartList = JSON.parse(cache === null ? "[]" : cache)
            //遍历商品信息  再看缓存中是否有这些数据   filter如果返回true就会保留当前的数据
            list = list.filter(function (goods_item) {
                return cartList.some(function (cart_item) {
                    if (goods_item.goods_id == cart_item.id) {
                        //将数量进行赋值
                        goods_item.count = cart_item.count
                        return true;
                    }
                })
            })
            console.log(list)
            var html = "";
            list.forEach(function (item) {
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
                              </div>`
            })
            //将生成的购物车模板返回
            return html;
        }

    })

    //将构造函数的实例返回
    return new Render();
});