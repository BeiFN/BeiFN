define(["jquery"], function($) {
    'use strict';
    function Carts(){
        this.cb_list = {};
    }
    
    $.extend(Carts.prototype , {
        init : function(){
            this.main = $(".goods-list");
            this.cartsNum = $(".carts-num");
            this.clearCart = $(".clear-cart");

            //添加删除按钮
            // this.carts_details = $(".carts-details");
           //添加绑定事件实现加入购物车
           this.main.on("click",".add-cart",$.proxy(this.addCart,this))
           //添加进购物车
           this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this))
           //清空购物车
           this.clearCart.on("click",".cart",$.proxy(this.clearCartNum,this))
           this.sumCartNum();

            //购物车加减
           this.main.on("click",".btn-reduce ,.btn-add" , $.proxy(this.changeGoodsNum,this));

        },
        addCart : function(evt){
            // console.log(2);
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            //获取商品id
            var id = $(target).attr("data-id");
            // console.log(id);、
            //将数据存入localstorage
            //不确定的就是id 与 添加的数量
            // localStorage.setItem("")
            this.saveCard(id)
        },
        saveCard : function(id){
            // var arr = [{
            //     id : id,
            //     count : 1
            // }]
            // localStorage.setItem("carts",JSON.stringify(arr));
            //console.log(localStorage.getItem("carts"))
            //两种情况 carts不存在 创建结构放入数据
            //第二种 carts存在 id是否相同，相同count++  不相同新建对象插入
            var s = localStorage.getItem("carts");

            if(s === null){
                var arr = [{
                    id : id,
                    count : 1
                }]
                localStorage.setItem("carts",JSON.stringify(arr));
            // console.log(localStorage.getItem("carts"))
            }
            else{
                //将字符串s 变成 数组
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each( la , function(index,item){
                    item.id === id && item.count++ && (has_same_id =true);           
                })
                !has_same_id && la.push({
                    id : id,
                    count : 1
                })

                //一定记得设置回去
                localStorage.setItem("carts",JSON.stringify(la));
            }
            // console.log(localStorage.getItem("carts"));
        },
        sumCartNum : function(){
            var la = localStorage.getItem("carts"); //local里边是字符串
            la === null ? "[]" : la;
            la = JSON.parse(la);
            var sum = 0;
            la.forEach(function(item){
                sum += item.count;    
            });
            // console.log(sum)
            this.cartsNum.html(sum);
            return sum;
        },
        clearCartNum : function(){
            var clear = confirm("是否清空购物车?");
            if(clear){
                localStorage.clear("carts");
                this.cartsNum.html("0");
            }
        },
        changeGoodsNum : function(evt){
           var e = evt || window.event;
           var target = e.target || e.srcElement;
        //    console.log(target)
           var id = $(target).parent().attr("data-id");
           //console.log(id); 

           var la = JSON.parse(localStorage.getItem("carts"));
           la.forEach($.proxy(function(item,index){
            //    if(item.id === id){
            //        item.count -- ;
            //        if(item.count === 0) la.splice(index,1);          
            //    }
            // var a = $(target).hasClass("btn-reduce");
            
             $(target).hasClass("btn-reduce") && item.id === id && (item.count -- || la.splice(index,1));
             $(target).hasClass("btn-add") && item.id === id && item.count ++;
            
            
           },this))
           localStorage.setItem("carts",JSON.stringify(la));
            //console.log(la)
            this.fire("changeNum");
            this.sumCartNum();
        },
        add : function(cb , type){
            if(!(this.cb_list[type] instanceof Array)) this.cb_list[type] = [];
            this.cb_list[type].push(cb);
            
        },
        fire : function(type){
            // console.log(this.cb_list);
            this.cb_list[type].forEach(function(item){
                typeof item === "function" ? item() : "";
            }) 
        }
    })



    return new Carts();
});