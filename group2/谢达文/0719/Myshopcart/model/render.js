

    // console.log($);
    function Render(){}
    $.extend(Render.prototype,{
        init:function(list,type){
            
            if(type == "goods_list"){
                return this.renderGoodList(list);
            }
            if(type == "carts_list"){
               return this.renderCartList(list);
            }
        },
        renderGoodList : function(list){
            var html = "";
            $.each(list,function(index,item){
                html +=`  <div class="col-md-3 goods-box">
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
        renderCartList : function(list){
            var html = "";
            // $.each()
            // console.log(list);
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ?"[]":ls);
            // console.log(la);
            // console.log(list,la);
            list = list.filter(function(goods_item){
                return la.some(function(carts_item){
                    if(goods_item.goods_id == carts_item.id){
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })
            })
            // console.log(list);
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
            // console.log(ls);
            // console.log(html);
            return html;
        }
    })
export default new Render();
