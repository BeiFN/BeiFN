import loaddata from "./loadData.js";
import render from "./render.js";
import carts from "./Carts.js";

export default function(){
	var goods_content = $(".goods-list .row");
	var btn_goods = $(".btn-goodslist");
	var btn_carts = $(".btn-carts");
	var con_title = $(".content-title");
	var resList = null;
	
	loaddata.init().done( $.proxy(function(res){
		resList = res;
		var goodsHtml = render.init(res.goods_list, "goods");
		goods_content.html(goodsHtml);
		carts.init();
		carts.add(renderCartList , "changeNum")
	},this))
	
	btn_goods.on("click" , function(){
		$(this).addClass("active").siblings().removeClass("active");
		var goodsHtml = render.init(resList.goods_list , "goods");
		goods_content.html(goodsHtml);
		con_title.html("商品列表");
	})
	btn_carts.on("click" , function(){
		$(this).addClass("active").siblings().removeClass("active");
		con_title.html("购物车");
		var cartsHtml = render.init(resList.goods_list , "carts");
		goods_content.html(cartsHtml);
	})
	function renderCartList(){
		var cartsHtml = render.init(resList.goods_list , "carts");
		goods_content.html(cartsHtml);
	}
}
