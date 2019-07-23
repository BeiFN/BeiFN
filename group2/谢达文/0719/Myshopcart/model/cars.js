
    function Carts(){
        this.cbList = {}
    }
    $.extend(Carts.prototype,{
        init:function(){
            
            this.main = $(".goods-list");
            this.cartsNum = $(".cart-num");
            this.btn_cart = $(".cart-wrap");
            this.main.on("click",".add-cart",$.proxy(this.addCart,this));
            this.main.on("click",".add-cart",$.proxy(this.sumCartNum,this));
            this.main.on("click",".btn-reduce",$.proxy(this.reduceGoodsNum,this));
            this.main.on("click",".btn-add",$.proxy(this.addGoodsNum,this));
            this.btn_cart.on("click",$.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                    localStorage.clear();
                    // this.sumCartNum();
                    location.reload();
                    
                }
            },this))
            this.sumCartNum();
        },
        addCart:function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            // console.log(target);
            var id = $(target).attr("data-id");
            var s = localStorage.getItem("carts");
            // console.log(s);
            if(s == null){
                var a = [{
                    id    : id,
                    count :1
                }]
                localStorage.setItem("carts",JSON.stringify(a));
    
            }
            else{
                var la = JSON.parse(s);
                var has_same_id = false;
                $.each(la,function(index,item){
                    if(item.id === id ){
                        item.count ++;
                        has_same_id = true;
                    }
                })
                if(!has_same_id){
                    la.push({
                        id : id,
                        count :1
                    })
                }
                localStorage.setItem("carts",JSON.stringify(la));
            }
            
        },
        sumCartNum : function(){
            
            var ls = localStorage.getItem("carts");
            var la = JSON.parse(ls === null ? []:ls);
            var sum = 0;
            $.each(la,function(index,item){
                sum += item.count;
            })
            this.cartsNum.html(sum);
            // console.log(sum);
            return sum;
        },
        reduceGoodsNum:function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count --
                    if(item.count == 0){
                        la.splice(index,1);
                    }
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        addGoodsNum : function(evt){
            var e = evt || event;
            var target = e.target || e.srcElement;
            var id = $(target).parent().attr("data-id");
            var la = JSON.parse(localStorage.getItem("carts"));
            la.forEach(function(item,index){
                if(item.id == id){
                    item.count ++
                }
            })
            localStorage.setItem("carts",JSON.stringify(la));
            this.fire("changeNum");
            this.sumCartNum();
        },
        add:function(cb,type){
            console.log(type);
            
            if(!(this.cbList[type] instanceof Array)){
                this.cbList[type] = [];
            }
            this.cbList[type].push(cb);
            console.log(this.cbList);
        },
        fire:function(type){
            console.log(111)
            this.cbList[type].forEach(function(item){
                typeof item === "function" ? item() : "";
            })
        }
    })
 export default new Carts();
