define(["jquery"], function($, factory) {
    'use strict';
    function Render(){}
    $.extend(Render.prototype , {
        //业务层传来数据 方便渲染
        init : function( data , type){
            if(type === "goods_list"){
                return this.renderGoodsList(data);
            }
            
        },
        renderGoodsList : function(data){
            var html = "";
            $.each(data , function(index,item){
                html += `<div class="col-md-3 goods-box">
                            <div class="goods-img">
                                <img src="${item.hd_thumb_url}" alt="">
                            </div>
                            <p>${item.goods_name}</p>
                            <div class="goods-detail">
                                <span>￥${(item.group_price / 100).toFixed(2) }</span>
                                <del>￥${(item.market_price/100).toFixed(2)}</del>
                                <em>${item.sales_tip}</em>
                            </div>
                            <div class="goods-btn">
                                <button class="add-cart btn btn-danger" data-id=${item.goods_id}>加入购物车</button>
                            </div>           
                        </div>`
            }) 
            // console.log(html);
            return html; 
        }

        
    })
    return new Render();
});