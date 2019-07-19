//渲染页面
// console.log($); //Uncaught ReferenceError: $ is not defined


//在renderjs之中开发模块需要使用jquery,
// 这个时候我们需要在编程之前的依赖之中引入jquery; 
define(["jquery"], function(require, factory) {//依赖前置;模块定义前 引入依赖
    'use strict';
    // console.log($); //可以了

    function Render(){}
    $.extend(Render.prototype,{
        init : function(){
            return this.renderGoodslist(list);
        },
        renderGoodslist : function(list){
            var html = "";
            $.each(list,function(index , item){
                html += ` <div class="col-md-3 goods-box">
                                <div class="goods-img">
                                    <img src="${item.thumb_url}" alt="">
                                </div>
                                <p>${item.goods_name}</p>
                                <div class="goods-detail">
                                    <span class="discount">￥${ (item.group_price/100).toFixed(2)}</span>
                                    <del>￥${ (item.market_price/100).toFixed(2)}</del>
                                    <span>${item.sales_tip}</span>
                                </div>
                                <div class="goods-btn">
                                    <div class="btn btn-danger" data-id=${item.goods_id}>加入购物车</div>
                                </div>
                            </div>`
                return html;
            })
        }
    })
    
});