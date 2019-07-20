// render.js 渲染页面
define(["jquery","./load"],function(){
    function Render(){};
    $.extend(Render.prototype,{
        init : function(res,type){
            if(type === "goods_list"){
                // 商品列表
                return this.renderGoodsList(res);
            }
            if(type === "carts_list"){
                // 购物车
                return this.renderCartsList(res);
            }
        },
        renderGoodsList: function (res) {
            // console.log("商品列表")
            var html = "";
            // 循环列表
            $.each(res, function (index, item) {
                // console.log(index,item);
                // console.log(item.goods_name);
                html += `
                        <div class="col-md-3 goods-box">
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
                        </div>
                    `;
            })
            return html;
        },
        renderCartsList: function (res) {
            // console.log("购物车");
            // 获取本地储存的数据
            var l = localStorage.getItem("carts");
            var t = JSON.parse( l===null? "[]" : l)
            // console.log(t);
            res  = res.filter(function (goods){
                return t.some(function(carts){
                    if(goods.goods_id == carts.id){
                        goods.count = carts.count;
                        return true;
                    }
                })
            });
            var html = "";
            res.forEach(function(item){
                html += `
                        <div class="col-md-12 carts-item">
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
                        </div>
                    `
            })
            // console.log(html);
            return html;
        }
    });



    return new Render();

});
