define(["jquery", "./loaddata"], function($, loaddata){
    function Render(){}
    $.extend(Render.prototype, {
        init : function(list){
            var html = "";
            $.each(list, function(index, item){
                html += `<li class="item">
                    <div class="item-logo" style="background-image: url(${item.proPictDir});">
                    </div>
                    <div class="item-point">${item.brandName}</div>
                    <div class="item-name">${item.productName}</div>
                    <div class="item-price">
                        <span class="price-unit">¥</span>
                        ${item.cuPrice}
                    </div>
                    <button class="item-cart" btn-id ="${item.productSid}">加入购物车</button>
                </li>`
            })
            return html;
        }

    })
    return new Render();
})