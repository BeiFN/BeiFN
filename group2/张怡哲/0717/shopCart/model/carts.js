define([
    'jquery'
], function() {
    'use strict';
    function Carts(){
        //观察者名单;
        this.cblist = {};
    }
    $.extend( Carts.prototype , {
        init : function(){
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.carts = $(".cart-wrap");
            this.main.on("click" , ".add-cart" , $.proxy(this.addCart , this));
            this.main.on("click" , ".add-cart" , $.proxy(this.sumCartNum , this));
            this.carts.on("click" , $.proxy(function(){
                var clear = confirm("手否清空购物车");
                // clear ? (localStorage.clear()) && (this.sumCartNum()) : "";
                if(clear){
                    localStorage.clear();
                    this.sumCartNum();
                }
            },this));

            //渲染时执行一遍，保证购物车中数字刷新显示;
            this.sumCartNum();

            this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceGoodsNum , this));
            this.main.on("click" , ".btn-add" , $.proxy(this.addGoodsNum , this));
        },
        addCart : function(evt){
            var e = evt || event;
            var target = evt.target || evt.srcElement;

            //将data-id添加进按钮的属性中,方便下面的代码取出;
            var id = $(target).attr("data-id");

            this.saveCard(id);
        },
        saveCard : function(id){
            var s = localStorage.getItem("carts");
            //判断localStorage中是否存在该商品;
            if(s === null){
                var a = [{
                    id : id,
                    count : 1
                }]
                //将a中数据存放进localStorage中;
                localStorage.setItem("carts" , JSON.stringify(a));
            }else{
                var la = JSON.parse(s);

                //标识符判断该元素是否id重复;
                var has_same_id = false;
                $.each(la , function(index , item){
                    if(item.id === id){
                        item.count++;
                        has_same_id = true;
                    }
                })
                if(!has_same_id){
                    la.push({
                        id : id,
                        count : 1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));
            }
        },
        sumCartNum : function(){
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0;
            $.each(la , function(index , item){
                sum += item.count;
            })
            this.cartsNum.html(sum);
            return sum;
        },
        reduceGoodsNum : function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach( function(item , index){
                if(item.id === id){
                    item.count --;
                    if(item.count === 0){
                        la.splice(index , 1);
                    }
                }
            })
            localStorage.setItem("carts" , JSON.stringify(la));
            this.fire("changeNum");
            //刷新购物车标志内的数字;
            this.sumCartNum();
        },

        addGoodsNum : function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach( function(item , index){
                if(item.id === id){
                    item.count++;
                }
            })
            localStorage.setItem("carts" , JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add : function(cb , type){
            if(!(this.cblist[type] instanceof Array)){
                this.cblist[type] = [];
            }
            this.cblist[type].push(cb);
        },
        fire : function(type){
            this.cblist[type].forEach(function(item){
                typeof item === "function" ? item() : "";
            })
        }
    })
    return new Carts();
});