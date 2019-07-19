// 渲染页面的模块 根据init中传入的类型判断商品或购物车 1.获取数据 2.获取模版 3.返回可以直接插入页面上的html  
define(["jquery"], function($) {
      'use strict';
      return {
            init:function(res, type){ //res为函数调用时传入的数据，type为调用时传入的类型，包括商品和购物车
                  if(type == "goods"){
                        return this.renderGoodsList(res);
                  }
                  if(type == "cart"){
                        return this.renderCartList(res);
                  }
            },
            renderGoodsList:function(res){
                  var html = ""
                  $.each(res.goods_list, function(index, item){
                        // console.log(index, item)
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
            renderCartList:function(res){
                  // 将res中的数据和本地的localStrorage做对比，获取到完整的数据
                  var la = JSON.parse(localStorage.getItem("carts"));
                  // console.log(la)
                  var cartList = [];
                  $.each(res.goods_list, function(index1, item1){
                        // console.log(item)
                        $.each(la,function(index2, item2){
                              if(item1.goods_id == item2.id){
                                    cartList.push(item1);
                                    // console.log(cartList)
                              }
                        })
                  })
                  //合并la和cartList中的内容,对象的合并
                  // 获取到购物车里的数据后渲染到界面
                  var html = "";
                  // console.log(cartList)
                  cartList.forEach( function(item){
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
      }
});