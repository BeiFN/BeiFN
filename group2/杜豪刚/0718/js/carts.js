// carts 购物车
define(["jquery"],function(){
    // console.log(1);
    function Carts(){};
    $.extend(Carts.prototype,{
        init : function(){
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.carts = $(".cart-wrap");
            // 事件委托
            this.main.on("click",".add-cart",$.proxy(this.addCart,this));
            // this.sumCartNum();
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this));
            // 清空购物车    
            this.carts.on("click",$.proxy(function(){
                var clear = confirm("您确定要清空购物车吗？");
                if(clear){
                    // 清空localstorage
                    localStorage.clear();
                    // location.reload();
                    // 在页面实现不刷新的情况下，改变购物车的数量
                    this.sumCartNum();
                }
            },this));
            // 在页面一加载就渲染购物车数量的初始值
            this.sumCartNum();
            // 购物车的加减
            this.main.on("click","btn-reduce",$.proxy(this.reduceNum,this));
            this.main.on("click","btn-add",$.proxy(this.addNum,this));
        },
        addCart : function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            // console.log(target)
            // 获取ID
            var id = target.getAttribute("data-id")
            // console.log(id)
            this.saveCart(id);
        },
        saveCart : function(id){
            // console.log(id);
            // 利用localStorage.setItem进行本地储存
            var s = localStorage.getItem("carts");
            // console.log(s,id);
            if(s === null){
                // 如果没有carts，则创建一个
                var arr = [{
                    id : id,        //编号
                    count :1        //点击次数默认为1
                }]
                localStorage.setItem("carts",JSON.stringify(arr));
            }else{
                // 如果有则对比俩次是否点击的为同一个商品
                var l = JSON.parse(s);
                var temp = false;
                $.each(l,function(index,item){
                    if(item.id === id){ //相同
                        item.count++;
                        temp = true;
                    }
                })
                if(!temp){      // 不相同
                    l.push({
                        id : id,
                        count :1
                    }) 
                }
                localStorage.setItem("carts",JSON.stringify(l))
            }
        },
        // 购物车求和
        sumCartNum : function(){
            // 获取getItem
            var l = localStorage.getItem("carts");
            var t = JSON.parse(l===null? "[]":l);
            var sum=0;
            $.each(t,function(index,item){
                sum += item.count;
            })
            if(sum>=10){
                this.cartsNum.css({
                    left : "50%"
                })
            }else{
                this.cartsNum.css({
                    left : "60%"
                })
            }
            // console.log(sum);
            this.cartsNum.html(sum);
            return sum;
        },
        // 购物车的加减
        reduceNum : function(){
            console.log("+");
        },
        addNum : function(){
            console.log("-");
        }
    })
    return new Carts();
});