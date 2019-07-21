define(["jquery","./render"],function($,render){
	
	function Carts(){
	}
	$.extend( Carts.prototype , {
		init : function(){
			this.main = $(".goods-list");
			this.add_btn = $(".add-cart");
			this.cart_num = $(".cart-num");
			var cart_warp = $(".cart-wrap");
			var con_title = $(".content-title");
			var goods_content = $(".goods-list .row");
			
			cart_warp.on("click" , $.proxy( function(){
				if(confirm("是否清空购物车")){
					localStorage.clear();
					this.changeCartNum();
					if(con_title.html() === "购物车"){
						var cartsHtml = render.init([] , "carts");
						goods_content.html(cartsHtml);
					}
				}
			},this));
			this.main.on("click" , ".add-cart" , $.proxy(this.addGoodsInCart , this) );
			this.main.on("click" , ".add-cart" , $.proxy(this.changeCartNum , this) );
			
			this.changeCartNum();

		},
		addGoodsInCart : function(evt){ 
			var e = evt || window.event;
			var target = e.target || e.srcElement;
			var id = $(target).attr("data-id");
			this.saveId(id);
		},
		changeCartNum : function(){
			var count = 0;
			var s = JSON.parse(localStorage.getItem("carts"));
			$.each(s, function(index , item){
				count += item.count;
			})
			this.cart_num.html(count);
		},
		saveId : function(id){
			var s = localStorage.getItem("carts");
			if(s === null){
				//当前无相关localStorage，创建一个新的
				var a = [{
					id : id,
					count : 1
				}]
				localStorage.setItem("carts", JSON.stringify(a))
			}else{
				//当前已有localStorage，直接判断当前id是否存在
				var list = JSON.parse(s);
				var has_same_id = false;
				$.each(list , function(index,item){
					if(item.id === id){
						item.count ++;
						has_same_id = true;
					}
				})
				//不存在相同的id，则新增
				if(!has_same_id){
					list.push({
						id : id,
						count : 1
					})
				}
				localStorage.setItem("carts", JSON.stringify(list))
			}
		}
	})
	
	return new Carts();
})
