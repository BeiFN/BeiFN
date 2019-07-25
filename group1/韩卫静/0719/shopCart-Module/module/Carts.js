import render from "./render.js";

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
		this.cbList = {};
		
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
		this.main.on("click" , ".btn-add" , $.proxy(this.addCartNum , this) );
		this.main.on("click" , ".btn-reduce" , $.proxy(this.reduceCartNum , this) );
	
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
	},
	addCartNum : function(evt){
		var e = evt || window.event;
		var target = e.target || e.srcElement;
		var id = $(target).parent().attr("data-id");
		var s = JSON.parse(localStorage.getItem("carts"));
		$.each(s, function(index , item){
			if(item.id == id){
				item.count++;
			}
		})
		localStorage.setItem("carts",JSON.stringify(s));
		this.changeCartNum();
		this.publish("changeNum");
	},
	reduceCartNum : function(evt){
		var e = evt || window.event;
		var target = e.target || e.srcElement;
		var id = $(target).parent().attr("data-id");
		var s = JSON.parse(localStorage.getItem("carts"));
		$.each(s, function(index , item){
			if(item.id == id){
				item.count--;
				if(item.count == 0){
					s.splice(index,1);
				}
			}			
		})
		localStorage.setItem("carts",JSON.stringify(s));
		this.changeCartNum();
		this.publish("changeNum");

	},
	add : function(cb , type){
		if(!(this.cbList[type] instanceof Array)){
					this.cbList[type] = []  
			  } 
		// this.cbList[type] ? "" : this.cbList[type] = [];
			  this.cbList[type].push(cb);
	},
	publish : function(type){
		this.cbList[type].forEach(function(item , index){
			typeof item === "function" ? item() : "";	
		})
	}
})

export default new Carts();

