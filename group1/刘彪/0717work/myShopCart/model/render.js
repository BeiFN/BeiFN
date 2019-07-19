//渲染页面;
//1.商品列表渲染;
//2.购物车小列表的渲染;
define([
    'jquery',
    './loaddata'
], function ($) {
    'use strict';
    function Render() { }

    $.extend(Render.prototype, {
        init: function (list, type) {
            if (type === "good_list") {
                return this.renderGoodList(list);
            }
            else if (type === "carts_list") {
                return this.renderCartsList(list);
            }
        },
        renderGoodList: function (list) {
            var html = "";
            $.each(list, function (index, item) {
                html += ` <div class="col-md-3 goods-box">
                <div class="goods-img">
                      <img src="${item.thumb_url}" alt="">
                </div>
                <p>
                ${item.goods_name}
                </p>
                <div class="goods-detail">
                      <span>￥${(item.group_price / 100).toFixed(2)}</span>
                      <del>￥${(item.market_price / 100).toFixed(2)}</del>
                      <em>${item.sales_tip}</em>
                </div>
                <div class="goods-btn">
                      <button class="add-cart btn btn-danger" 
                      data-id="${item.goods_id}">加入购物车</button>
                </div>
          </div>`;
            })
            return html;
        },

        //渲染购物车商品列表
        renderCartsList: function (list) {
            // console.log(list); //list是放全部商品数组
            var ls = localStorage.getItem("carts");
            // console.log(ls);//ls是存放购物车商品的字符串;
            var la = JSON.parse(ls === null ? "[]" : ls);
            // console.log(la) //将ls转换成存放购物车商品的数组;

            //对全部商品数组进行筛选
            list = list.filter(function (goods_item) {
                return la.some(function (carts_item) {
                    //相当于双层for循环
                    if (goods_item.goods_id == carts_item.id) {
                        goods_item.count = carts_item.count;
                        return true; //结束本层循环;
                    };
                })

            })
            var html = "";


            //这里把筛选后的商品数组拼接
            list.forEach(item => {
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
            return html;

        }

    })
    return new Render();
});

