define([
    'jquery',
    './loaddata'
], function() {
    'use strict';
    function Render(){};
    $.extend(Render.prototype,{
        init:function(list,type){
            if(type==="goods_list"){
               return this.renderGoodsList(list)
            }
            if(type==="carts_list"){
                return renderCartsList(list)
            }
        },
        renderGoodsList:function(list){
            var html="";
            $.each(list,function(index,item){
                html+=` <div class="col-md-3 goods-box">
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
            });
            return html;
        },
        renderCartsList:function(list){

        }
    });
    return new Render();
});