define(["jquery","./loadMsg"], function($,loadMsg) {
    'use strict';
    function carts(){

    }
    $.extend(carts.prototype , {
        init : function(){
            this.main     = $(".goods-list");
            this.cartsNum = $(".cart-num");//购物车,显示数量
            this.carts    = $(".cart-wrap");
            //事件委托，点击加入购物车按钮，添加商品
            this.main.on("click",".add-btn",$.proxy(this.addCart , this));
            //改变购物车数量
            this.main.on("click",".add-btn",$.proxy(this.sumCartNum , this));
            //事件绑定，清空购物车
            this.carts.on("click",$.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    localStorage.clear();//清空数据
                    //重新渲染购物数量
                    this.sumCartNum();
                }
            },this))
            this.sumCartNum();//每次都刷新
            //购物车加减;
            this.main.on("click",".btn-reduce",$.proxy(this.reduceGoodsNum,this));
            this.main.on("click",".btn-add"   ,$.proxy(this.addGoodsNum,this));
        },
        addCart : function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            //获取当前商品的id
            var id = $(target).attr("data-id");
            //放入localStroage("key","value"),存字符串的地方  value = id 和 商品数量 [ { id:123 , count:12 } ](数组形式)
            this.saveCart(id);
        },
        //商品的保存，判断商品的有无 , 有无相同id，数量的添加 三种
        saveCart : function(id){
            var s = localStorage.getItem("carts");//本地中的数据
            // 没有，则添加进购物车
            if(s === null ){
                var a = [{
                    id : id ,
                    count : 1
                }];
                //将数据转为字符串，存到localStorage中
                localStorage.setItem("carts",JSON.stringify(a));
            }
            else{
                var la = JSON.parse(s);//数组 对象
                var has_same_id = false;
                $.each(la,function(index , item){
                    if(item.id === id){
                        item.count ++;
                        has_same_id = true;
                    }
                })
                //没有相同的id
                if(!has_same_id){
                    la.push({
                        id : id ,
                        count : 1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));//json形式，覆盖之前的数据
            }
            
        },
        //购物车商品总数量
        sumCartNum : function(){
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? "[]" : ls);
            var sum = 0 ;
            //遍历数组
            la.forEach(function(item){
                sum += item.count;
            })
            this.cartsNum.html(sum);//购物车总数
        },
        reduceGoodsNum: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function (item, index) {
                if (item.id == id) {
                    item.count--
                    if (item.count === 0) {
                        la.splice(index, 1);
                    }
                }
            })
            localStorage.setItem("carts", JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum: function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function (item, index) {
                if (item.id == id) {
                    item.count++
                }
            })
            localStorage.setItem("carts", JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add : function(cb , type){
            if(!(this.cbList[type] instanceof Array)){
                this.cbList[type] = []
            }
            this.cbList[type].push(cb);
        },
        fire : function(type){
            this.cbList[type].forEach(function(item){
                typeof item === "function" ? item() : "" ;
            })
        }

    })
    return new carts();
});