define(["jquery"], function($, factory) {
    'use strict';
    function Carts(){}
    $.extend( Carts.prototype , {
        init : function(){
            //获取元素 绑定事件
            this.main = $(".goods-list");
            this.carts_num = $(".carts-num");
            this.clear_cart = $(".clear-cart");

            this.main.on("click" , ".add-cart" , $.proxy(this.handlerAddCarts , this));

            this.main.on("click",".add-cart",$.proxy(this.changeCartNum,this));
            this.clear_cart.on("click",".cart",$.proxy(this.clearCartNum,this));

            this.changeCartNum();
        },

        handlerAddCarts : function(evt){
            //获取点击的事件源
            var e = evt || window.event;
            var target = e.target || e.srcElement;

            var id = $(target).attr("data-id");
            // console.log(id);
            //成功获取了id
            // var la = localStorage.setItem("carts")
            //下面运用数据共享进行id的保存
            this.saveGoodsList(id);          
        },
        saveGoodsList : function(id){
            //------------------------这里出现了未知的bug--------
            //通过clear 可以让这货重新回到null 而不是undefined
            var s = localStorage.getItem("carts");
            if(s === null){
                  var arr = [{
                        id    : id,
                        count : 1
                  }]
                  localStorage.setItem("carts",JSON.stringify(arr));
                // console.log(localStorage.getItem("carts"))
            }
            else if(s){
                //将la变成对象
                // console.log(ls);
                // ls = JSON.stringify(ls);
                var la = JSON.parse(s);
                // console.log(la)
                var has_same_id = false;
                $.each(la,function(index,item){
                    if(item.id == id){
                        item.count ++;
                        has_same_id = true;
                    }
                })
                //如果没有相同的id
                !has_same_id && la.push({
                            id : id,
                            count : 1
                        }); 
                    
                
                localStorage.setItem("carts",JSON.stringify(la));    
            }
            else{
                localStorage.clear("carts");
            }
            //千万记得把la设置回去
            
          
            // var s = localStorage.getItem("carts");
            // if(s === null){
            //       var a = [{
            //             id    : id,
            //             count : 1
            //       }]
            //       localStorage.setItem("carts",JSON.stringify(a));
            // }else{
            //       var la = JSON.parse(s);
            //       var has_same_id = false;
            //       $.each(la , function( index , item){
            //             if(item.id === id){
            //                   item.count ++;
            //                   has_same_id = true;
            //             }
            //       })
            //       if(!has_same_id){
            //             // 没有一样的;
            //             la.push({
            //                   id : id,
            //                   count : 1
            //             })
            //       }
            //       localStorage.setItem("carts",JSON.stringify(la));
            // }
        },
        changeCartNum : function(){
            var la = localStorage.getItem("carts");
            la = (JSON.parse(la === null ? "[]" : la));
            var sum = 0;
            la.forEach(function(item){
                sum += item.count;
            });
            // console.log(sum);
            this.carts_num.html(sum);
            return sum;
        },
        clearCartNum : function(){
           var clear =  confirm("确认要删除吗?") ;
           if(clear){
                localStorage.clear("carts");
                this.carts_num.html(0);
           } 
            
        }

    })
    return new Carts();
});