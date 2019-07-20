define(["jquery"], function() {
    'use strict';
    function Carts(){
        this.cb_list = {};
    };
    $.extend(Carts.prototype,{
        init : function(){

            this.main = $(".goods-list");
            this.cart_num = $(".cart-num");
            this.cart = $(".cart");
            // this.btn_reduce = $(".btn-reduce");
            // console.log(this.main);
            this.main.on("click",".add-cart",$.proxy(this.addCart,this))
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this))
            this.cart.on("click",$.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    localStorage.clear();
                    this.sumCartNum();
                }
            },this))
            this.sumCartNum();
            this.main.on("click",".btn-reduce",$.proxy(this.reduceNum,this));
            this.main.on("click",".btn-add",$.proxy(this.addNum,this));
        },
        addCart : function(evt){
            // console.log(1);
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr("data-id");
            // console.log(id);
            //把数据放在localstorage里
            this.saveCart(id);
        },
        saveCart : function(id){
            //在localstorage里获取数据，如果有就count++，如果没有就创建数据
            //localstorage里存储的是字符串形式的键值对
            var s = localStorage.getItem("carts");
            if(s === null){
                var a = [{
                    id : id,
                    count : 1
                }]
                localStorage.setItem("carts",JSON.stringify(a));
            }else{
                var la = JSON.parse(s);
                var has_name_id = false;
                $.each(la,function(index,item){
                    if(item.id === id){
                        item.count ++;
                        has_name_id = true;
                    }
                })
                if(!has_name_id){
                    la.push({
                        id : id,
                        count : 1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));
                // console.log(la);                
            }
        },
        sumCartNum : function(){
            var s = localStorage.getItem("carts");
            var la = JSON.parse(s);
            // console.log(la);
            var count = 0;
            $.each(la,function(index,item){
                // console.log(1);
                count += item.count;
            })
            $(this.cart_num).html(count);
            return count;
        },
        reduceNum : function(evt){
            // console.log(1);
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var s = localStorage.getItem("carts");
            var la = JSON.parse(s);
            console.log(la);
            $.each(la,function(index,item){
                if(item.id == id){
                    item.count --;
                    if(item.count === 0){
                        la.splice(index,1);
                    }
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addNum : function(evt){
            // console.log(2);
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var s = localStorage.getItem("carts");
            var la = JSON.parse(s);
            $.each(la,function(index,item){
                if(item.id == id){
                    item.count ++;
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add : function(cb,type){
            if(!(this.cb_list[type] instanceof Array)){
                this.cb_list[type] = [];
            }
            this.cb_list[type].push(cb);
        },
        fire : function(type){
            $.each(this.cb_list[type],function(index,item){
                typeof item === "function" ? item() : "";
            })
        }
    })
    return new Carts();
});