define([
    'jquery',
    './loaddata'
], function() {
    'use strict';
    function Render(){}
    $.extend(Render.prototype , {
        //判断传入数据类型，渲染目标;
        init : function(list , type){
            // if(type === "goods_list"){
            //     return this.renderGoodsList(list);
            // }
            // if(type === "carts_list"){
            //     return this.renderCartsList(list);
            // }
            // type === "goods_list" ? returnValue = this.renderGoodsList : returnValue = this.renderCartsList;
            //根据type 调用不同函数;
            return (type === "goods_list" ? this.renderGoodsList(list) : this.renderCartsList(list));
        },
        //渲染商品列表;
        renderGoodsList : function(list){
            var html = "";
            $.each(list , function(index , item){
                html += `  <div class="col-md-3 goods-box">
                                    <div class="goods-img">
                                        <img src="${item.thumb_url}" alt="">
                                    </div>
                                    <p>
                                    ${item.goods_name}
                                    </p>
                                    <div class="goods-detail">
                                        <span>￥${ (item.group_price/100).toFixed(2)}</span>
                                        <del>${ (item.market_price/100).toFixed(2)}￥</del>
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
        renderCartsList : function(list){
            //从localStorage中获取相关属性;
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);

            //list.filter  goods_item遍历商品列表中每一个元素
            list = list.filter(function(goods_item){
                //la.some   carts_item遍历购物车中每一个元素
                return la.some(function(carts_item){
                    //比对上面取出两组元素的id是否相等
                    //为何选取la.some进行比对，因为该函数可以同时取到上面所提到的两中元素;
                    if(carts_item.id == goods_item.goods_id){
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })
            })

            var html = "";

            list.forEach(function(item){
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
                        </div>`
            })
            // console.log(html);
            return html;
        }
    })
    return new Render();
});