
    function Carts(){
        this.cbList = {};
    };
    $.extend(Carts.prototype , {
        init : function(){
            //选定元素   绑定事件
            // console.log(1);
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.carts    = $(".cart-wrap");
            this.main.on("click",".add-cart",$.proxy(this.addCart,this));
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this));
            //点击购物车的时候代表的是清空购物车
            this.carts.on("click" , $.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    localStorage.clear();
                    this.sumCartNum();
                }
            },this))
            this.sumCartNum();

            //加减事件
            this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceGoodsNum,this))
            this.main.on("click" , ".btn-add" , $.proxy(this.addGoodsNum,this))

        },
        addCart : function (evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).attr("data-id"); //  获取点击商品的ID
            this.saveCart(id);
        },
        saveCart : function(id){
            var s = localStorage.getItem("carts");//获取localStorage中的carts 
            if( s === null ){ // 为null代表的是第一次点击加购   我们需要创建新的对象
                var a = [{
                    id : id ,
                    count : 1
                }]
                localStorage.setItem("carts",JSON.stringify(a)); //创建localStorage 由于其接受的是字符串所以我们需要转化为json；
            }else{
                //如果不是第一次添加  那么分为两种情况  
                //  商品是第一次添加    商品是重复添加
                var la = JSON.parse(s);
                var has_same_id = false; 
                $.each(la,function(index, item){
                    if(item.id === id){
                        item.count ++;
                        has_same_id = true ;
                    }
                })
                if(!has_same_id){
                    la.push({
                        id : id ,
                        count : 1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));
            }
        },
        //计算购物车中商品的总量
        sumCartNum : function(){
            var ls = localStorage.getItem("carts");
            var la = JSON.parse( ls === null ? "[]" : ls );
            var sum = 0 ;
            la.forEach(function(item){
                sum += item.count;
            })
            this.cartsNum.html(sum);
            return sum ;
        },
        reduceGoodsNum :function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count --;
                    if(item.count == 0){
                        la.splice(index,1);
                    }
                }
            })
            localStorage.setItem("carts" , JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum :function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count ++;
                }
            })
            localStorage.setItem("carts" , JSON.stringify(la));
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
            // console.log(this.cbList[type])
            this.cbList[type].forEach(function(item){
                typeof item === "function" ? item() : "";
            })
        }

    } )
export default new Carts();
