//专门渲染商品页面，以及购物车页面

define(["jquery","./loadMsg"],function($,loadMsg){  // 提前注入依赖(需要用到的东西，提前定义)
    'use strict';
    function Render(){

    }
    $.extend(Render.prototype,{
        init : function( list , type ){
            //商品列表
            if(type == "goods_list"){
               return this.renderGoodsList(list);
            }   
            //购物车列表
            if(type == "carts_list"){
               return this.renderCartsList(list);
            }
        },
        renderGoodsList : function(list){
            var html = "";
            $.each( list , function( index , item ){
                html += `<div class="col-md-3 goods-box">
                            <div class="goods-img">
                                <img src="${item.thumb_url}" alt="">
                            </div>
                            <p> 
                                ${item.goods_name}
                            </p>
                            <div class="detail">
                                <span>￥${(item.group_price / 100).toFixed(2)}</span>
                                <del>￥${(item.market_price / 100).toFixed(2)}</del>
                                <em>${item.sales_tip}</em>
                            </div>
                            <div class="goods-btn ">
                                <button class="btn btn-danger add-btn" data-id=${item.goods_id}>加入购物车</button>
                            </div>
                        </div> ` ;
            });
            return html;
        },
        renderCartsList : function(list){
            //获取localStorage中的数据，再进行渲染
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls == null ? "[]" : ls);
            list = list.filter(function(goods_item){ // 重新筛选商品   list数组中goods_item是每个对象  返回新数组
                return la.some(function(carts_item){ // 两个数组进行比对
                    if(carts_item.id == goods_item.goods_id){ // 购物车 与 商品列表进行比对
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })
            })
            var html="";
            //遍历新的数组(商品与购物车比对之后产生的新数组)
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
            return html;
        }
    })
    return new Render();//实例对象
})