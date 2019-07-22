
 
    
    function Render(){}
    $.extend( Render.prototype , {   
        init : function( list , type){
            //页面有商品与购物车都需要渲染
            // console.log(list)
            // type === "goods_list" ? this.renderGoodsList(list) : this.renderCartsList(list);
            if(type === "goods_list") return this.renderGoodsList(list);
            if(type === "carts_list") return this.renderCartsList(list);
        },
        renderGoodsList : function(list){
            var html = "";
            $.each(list , function(index,item){
                // console.log(item);
                html += `<div class="col-md-3 goods-box">
                                <div class="goods-img">
                                    <img src="${item.thumb_url}" alt="">
                                </div>
                                <p>${item.goods_name}</p>
                                <div class="goods-detail">
                                    <span>￥${(item.group_price/100).toFixed(2)}</span>
                                    <del>￥${(item.market_price/100).toFixed(2)}</del>
                                    <em>${item.sales_tip}</em>
                                </div>
                                <div class="goods-btn">
                                    <button class="add-cart btn btn-danger" data-id=${item.goods_id}>加入购物车</button>
                                </div>           
                        </div>`
            })
            // console.log(html)
            return html;
        },
        renderCartsList : function(list){
            //购物车的数据以localstorge为准
            var la = localStorage.getItem("carts");
            la = JSON.parse(la === null ? "[]" : la);
           
            //进行筛选
            list = list.filter(function(goods_item){
                //some函数 当有一个符合条件就返回true
               return la.some(function(carts_item){
                    //card之中id为字符串 good中是数字不能绝对等
                    if(carts_item.id == goods_item.goods_id){
                        //将购物车中的数量赋值给商品列表 方便页面渲染
                        goods_item.count = carts_item.count;
                        return true;
                    }
                })

            })
            var html = "";
            list.forEach( function(item){
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
            // console.log(html);
            return html;
        }
        
    })
    //new关键字会创建构造实例就会调用原型方法
export default new Render();
