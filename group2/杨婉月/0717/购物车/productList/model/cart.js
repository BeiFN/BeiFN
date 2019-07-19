define(["jquery"], function($){
    function Cart(){
    }
    $.extend(Cart.prototype, {
        init : function(){
            $btn_cart = $(".item-cart");
            //购物车图标
            $btn_icon = $(".btn-cart");
            //点击加入购物车按钮
            $btn_cart.on("click", $.proxy(function(){
                this.addCart();
                this.sumCartNum();
            }, this))
            //点击购物车图标，弹出提示：是否清空购物车
            $btn_icon.on("click", $.proxy(function(){
                var clear = confirm("是否清空购物车");
                if(clear){
                        localStorage.clear();
                        //重置购物车中商品数量显示
                        this.sumCartNum();
                }
            }, this))
            this.sumCartNum();
        },
        addCart : function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            //获取当前按钮上的id
            var p_id = $(target).attr("btn-id");
            var has = false;
            // console.log(p_id);
            // console.log(target);
            //从localstorge中取出cart,判断是否存在
            //如果不存在，则创建一个cart
            //如果存在,取出当前btn上的id,判断cart中是否存在
            //如果不存在，直接加入
            //如果存在，count++
            var cart_s = localStorage.getItem("carts");
            // console.log(cart_s);
            if(cart_s === null){
                //创建一个cart
                var c = [{
                    id : p_id,
                    count : 1
                }]
                //放入localStroge中
                localStorage.setItem("carts", JSON.stringify(c));
            }
            // console.log(localStorage.getItem("carts"));
            else{
                //判断 当前id是否已经存在于cart中
                c = JSON.parse(localStorage.getItem("carts"));
                $(c).each(function(index, ele){
                    if(p_id === ele.id){
                        ele.count++;
                        has = true;
                    }
                })
                //如果不存在，存入cart中
                if(!has){
                    c.push({
                        id : p_id,
                        count : 1
                    })  
                }
                localStorage.setItem("carts", JSON.stringify(c));
                console.log(localStorage.getItem("carts"));
            }
        },

        //购物车内商品数量显示
        sumCartNum : function(){
            var c = JSON.parse(localStorage.getItem("carts"));
            console.log("..."+c);
            var sum = 0;
            $(c).each(function(index, item){
                console.log(item.count);
                sum += item.count;
            })
            //显示
            console.log(sum);
            $btn_icon.children("span").html(sum);
            console.log($btn_icon);
            console.log($btn_icon.children("span"));
        }
    })

    return new Cart();  //不要忘了return！！！

})