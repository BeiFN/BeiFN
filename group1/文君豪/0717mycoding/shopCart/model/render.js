 define(["jquery"], function() {
    //我们在模块化开发之中，需求某个类库时，
    //就在这个模块中引入类库，这是需求前置，例如：因为在别的模块中引入的，在这个模块中
    //jquery会是异步的，所以会找不到jquery，
    //商品列表渲染
    //购物车小列表渲染
    function Render(){}
    $.extend(Render.prototype,{
          init: function(list,type){
                if(type === "goods_list"){
                  
                      return this.renderGoodslist(list)
                }
                if(type === "cart_list"){
                      return this.renderCartslist(list)
                }

          },
          renderGoodslist: function(list) {
              
                var html = "";
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
          },
          renderCartslist: function(){

          }
          
    })
    return new Render();
     
      
 });
