define([
    'jquery',
    './loadData',
    './render'
], function($,loadData,render) {
    'use strict';
    function Carts(){
        this.option={};
    }
    $.extend(Carts.prototype,{
        init:function(){
            this.goodList = $(".goods-list");
            this.cartNum = $(".cart-num");
            this.carts = $(".cart-wrap");
            this.sumCartsNum();
            this.goodList.on("click",".add-cart",$.proxy(function(evt){
                var e=evt||window.event;
                var target=e.target;
                var id=$(target).attr("data-id");
                this.saveCarts(id);
            },this));
            this.goodList.on("click",".btn-reduce",$.proxy(function(evt){
                var e=evt||window.event;
                var target=e.target;
                var id=$(target).parent().attr("data-id");
                var Ls=localStorage.getItem("carts");
                Ls=JSON.parse(Ls);
                $.each(Ls,function(index,item){
                    if(item.id==id){
                        item.count--;
                        if(item.count==0){
                            Ls.splice(index,1);   
                        }
                    }
                });
                localStorage.setItem("carts",JSON.stringify(Ls));
                this.fire("changenum");
                this.sumCartsNum();

            },this));
            this.goodList.on("click",".btn-add",$.proxy(function(evt){
                var e=evt||window.event;
                var target=e.target;
                var id=$(target).parent().attr("data-id");
                var Ls=localStorage.getItem("carts");
                Ls=JSON.parse(Ls);
                $.each(Ls,function(index,item){
                    if(item.id==id){
                        item.count++;
            
                    }
                });
                localStorage.setItem("carts",JSON.stringify(Ls));
                this.fire("changenum");
                this.sumCartsNum();

            },this));
        },
        saveCarts:function(id){
            var carts=[];
            var Ls=localStorage.getItem("carts");
            if(Ls==null){
                var item={
                    id:id,
                    count:1
                }
                carts.push(item);
                localStorage.setItem("carts",JSON.stringify(carts));
            }else{
                var arr=JSON.parse(Ls);
                var has=false;
                $.each(arr,function(index,item){
                    if(item.id==id){
                        item.count++;
                        has=true;    
                    }
                });
                if(!has){
                    arr.push({
                        id:id,
                        count:1,
                    })
                }
                localStorage.setItem("carts",JSON.stringify(arr));
            }
            this.sumCartsNum();
        },
        sumCartsNum:function(){
            var Ls=localStorage.getItem("carts");
            var sum=0;
            if(Ls==null){
                this.cartNum.html(0);
            }else{
                var arr=JSON.parse(Ls);
                $.each(arr,function(index,item){
                    sum+=item.count;
                })
                this.cartNum.html(sum);
            }   
        },
        add:function(type,cb){
            console.log(this.option);
            if(! (this.option[type] instanceof Array)){

                this.option[type]=[];
            };
            console.log(this.option);
            this.option[type].push(cb);
            console.log(this.option);
        },
        fire:function(type){
            $.each(this.option[type],function(index,item){
                    if(typeof item =="function"){
                        item();
                    }
                })
        } 
    })
    return new Carts();
});