//用于处理各个模块之间的耦合关系
/**
 * 加载数据
 * 渲染商品列表界面
 * 绑定购物车事件，点击按钮将
 * 	1.该商品的信息加入localstorage中
 * 	2.改变右上角购物车中数量的显示
 * localstorage保存数据时，判断该商品是否存在，若存在则数量加1
 * 
 * 点击购物车界面，将:
 *	1.根据localstorage中的数据截取初始商品列表
 * 	2.渲染购物车界面
 */

/**
 * @param {Object} $
 * @param {Object} loaddata
 * @param {Object} render
 * @param {Object} carts
 */

define(["jquery","./loadData" , "./render.js", "./Carts.js"],function($ , loaddata,render,carts){
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
		console.log("调用render")
		var cartsHtml = render.init(resList.goods_list , "carts");
		goods_content.html(cartsHtml);
	}
	
	
});
