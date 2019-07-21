define([
   'jquery'
], function() {
    'use strict';
    function Carts(){}
    $.extend(Carts.prototype,{
        init:function(){
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.main.on("click",".add-cart",$.proxy(this.addCart,this));
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this));
            this.sumCartNum();
        },
        addCart:function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            // console.log(target);
            var id = $(target).attr("data-id");
            var s = localStorage.getItem("carts");
            // console.log(s);
            if(s == null){
                var a = [{
                    id    : id,
                    count :1
                }]
                localStorage.setItem("carts",JSON.stringify(a));
    
            }
            else{
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each(la,function(index,item){
                    if(item.id === id ){
                        item.count ++;
                        has_same_id = true;
                    }
                })
                if(!has_same_id){
                    la.push({
                        id : id,
                        count :1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));
            }
            
        },
        sumCartNum : function(){
            
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? []:ls);
            var sum = 0;
            $.each(la,function(index,item){
                sum += item.count;
            })
            this.cartsNum.html(sum);
            // console.log(sum);
            return sum;
        }

    })
    return new Carts();
});