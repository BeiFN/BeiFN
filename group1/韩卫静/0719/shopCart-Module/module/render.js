
function Render(){
}
$.extend(Render.prototype , {
	init : function(list,type){
		switch(type){
			case "goods":
				return this.goodsListShow(list);
				break;
			case "carts":
				return this.cartsListShow(list);
				break;
		}
	},
	goodsListShow : function(list){
		var html = "";
		$.each(list,function(index,item){
			 html += ` <div class="col-md-3 goods-box">
							  <div class="goods-img">
									<img src="${item.thumb_url}" alt="">
							  </div>
							  <p>
							  ${item.goods_name}
							  </p>
							  <div class="goods-detail">
									<span>￥${ (item.group_price/100).toFixed(2)}</span>
									<del>${ (item.market_price/100).toFixed(2)}￥</del>
									<em>${item.sales_tip}</em>
							  </div>
							  <div class="goods-btn">
									<button class="add-cart btn btn-danger"
									data-id=${item.goods_id}
									>加入购物车</button>
							  </div>
						</div>`;
		})
		return html;
	},
	cartsListShow : function(list){
		var s = localStorage.getItem("carts");
		var ls = JSON.parse(s === null ? "[]":  s);
		
		list = list.filter(function(goods ){
			return ls.some(function(item,index){
				if(item.id == goods.goods_id){
					goods.count = item.count;
					return true;
				}
			})
		})
		
		var html = "";
		list.forEach( function(item){
			html += `  <div class="col-md-12 carts-item">
						<div class="carts-img">
							  <img src="${item.thumb_url}" alt="">
						</div>
						<p class="carts-title">
						${item.goods_name}
						</p>
						<div class="carts-details" data-id="${item.goods_id}">
							  <button class="btn btn-default btn-reduce">-</button>
							  <span>${item.count}</span>
							  <button class="btn btn-default btn-add">+</button>
						</div>
						<div class="carts-total-price">￥${ parseInt(item.count * item.group_price / 100)}</div>
				  </div>`
	  })
	  return html;
	}
})
	


export default new Render();