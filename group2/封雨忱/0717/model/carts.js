define([
    'jquery',
], function() {
    'use strict';
    function Carts(){
        this.cbList=[]
    };
    $.extend(Carts.prototype,{
        init:function(){
            this.main=$(".goods-list");
            this.cartsNum = $(".cart-num");
            this.main.on("click",".add-cart",$.proxy(this.addCart,this))
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this))
            this.carts = $(".cart-wrap");
            this.carts.on("click",$.proxy(function(){
                var clear=confirm("是否清除购物车");
                if(clear){
                    localStorage.clear();
                    this.sumCartNum();
                }
            },this))
            this.sumCartNum();
            this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceGoodsNum , this));
            this.main.on("click" , ".btn-add"    , $.proxy(this.addGoodsNum , this));
        },
        addCart:function(evt){
            var e=evt||window.event;
            var target=e.target||e.srcElement;
            var id = $(target).attr("data-id");
            this.saveCart(id);
        },
        saveCart:function(id){
            var s =localStorage.getItem("carts");
            if(s===null){
                var a=[{
                    id:id,
                    count:1
                }]
                localStorage.setItem("carts",JSON.stringify(a));
            }else{
                var la =JSON.parse(s);
                var same_id=false;
                $.each(la,function(index ,item){
                    if(id===item.id){
                        item.count++;
                        same_id=true;
                    }
                })
                if(!same_id){
                    la.push({
                        id:id,
                        count:1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la))
            }
        },
        sumCartNum:function(){
            var ls =localStorage.getItem("carts");
            var la =JSON.parse(ls===null?"[]":ls);
            var sum =0;
            la.forEach(function(item,index){
                sum+=item.count;
            })
            this.cartsNum.html(sum)
        },
        reduceGoodsNum:function(evt){
            var e=evt||Window.event;
            var target=e.target||e.srcElement;
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls);
            var id = $(target).parent().attr("data-id");
            la.forEach(function(item,index){
                if(item.id==id){
                    item.count--;
                    if(item.count===0){
                        la.splice(index,1)
                    }
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum:function(evt){
            var e=evt||Window.event;
            var target=e.target||e.srcElement;
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls);
            var id = $(target).parent().attr("data-id");
            la.forEach(function(item,index){
                if(item.id==id){
                    item.count++;
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();

        },
        add:function(cb,type){
            if(!(this.cbList[type]instanceof Array)){
                this.cbList[type]=[];
            }
            this.cbList[type].push(cb);
        },
        fire:function(type){
            this.cbList[type].forEach(function(item){
                typeof item === "function"?item():""
            })
        }
            
    })
    return new Carts();
});