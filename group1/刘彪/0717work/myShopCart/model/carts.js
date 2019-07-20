define([
    'jquery',
], function (require, factory) {
    'use strict';
    function Carts() {
        this.cbList = {};
    }
    $.extend(Carts.prototype, {
        init: function () {
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.carts = $(".cart-wrap");
            this.main.on("click", ".add-cart", $.proxy(this.addCart, this));
            this.main.on("click", ".add-cart", $.proxy(this.sumCartNum, this));
            this.carts.on("click",$.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    localStorage.clear();
                    this.sumCartNum();
                    this.fire("changeNum");
                }
            },this))
            //初始化显示商品数量;
            this.sumCartNum();
            //加减按钮;
            this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceGoodsNum , this));
            this.main.on("click" , ".btn-add"    , $.proxy(this.addGoodsNum , this));


        },
        addCart: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr("data-id");
            //把数据放在localStroage里面；
            this.saveCart(id);

        },
        //1.carts不存在,=>创建结构放入数据;
        //2.carts存在:
        //      =>有相同id ,count++;
        //     =>没有相同id,新建对象插入
        saveCart: function (id) {
            var s = localStorage.getItem("carts");
            //carts不存在;
            if (s === null) {
                var a = [{
                    id: id,
                    count: 1,
                }]
                localStorage.setItem("carts", JSON.stringify(a));
            }//carts存在;
            else{
                //将carts转为json对象;
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each(la,function(index,item){
                    if(item.id ===id){
                        item.count ++;
                        has_same_id = true;
                    }
                })
                if(!has_same_id){
                    //没有一样的id;
                    la.push({
                        id:id,
                        count:1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));

            }
        },
        //渲染购物车里的商品数量;
        sumCartNum : function(){
           
            //取出localStorage里的carts 
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0;
            la.forEach(item => {
                sum +=item.count;
            });
            //将商品数量显示在购物车;
            this.cartsNum.html(sum);
            return sum;
        },
        reduceGoodsNum : function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
              //la 是购物车中的商品数组
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count--;
                    if(item.count === 0){
                        //如果某商品数量减为0,从商品数组中删除该商品
                        la.splice(index,1);
                    }
                }
            })
            //重新设置carts;
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum : function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
              //la 是购物车中的商品数组
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count++;
                }
            })
            //重新设置carts;
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add : function(cb,type){
            if(!(this.cbList[type] instanceof Array)){
                this.cbList[type] = [];
               
            }
            this.cbList[type].push(cb);
        },
        fire: function(type){
            this.cbList[type].forEach(function(item){
                typeof item === "function" ? item() : "" ;
            })
        }


    })
return new Carts();
});