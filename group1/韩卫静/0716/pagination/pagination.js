/**
 * 初始化获取按钮个数
 * 事件 点击获取下标范围，
 * 发送请求获取数据
 * 根据下标范围截取需要的数据
 * 利用得到的数据进行页面渲染
 * 
 */

function Pagination(){
}
$.extend( Pagination.prototype , {
	init : function({list = "",
		page = "",
		getData = {
			  url  : "",
			  data : {}
		},
		template = "",
		pageNo = 1,
		showNo = 5
	} = {}){
		this.list  = $(list);
		this.page  = $(page);
		this.url   = getData.url;
		this.data  = getData.data;
		this.pageN = pageNo;
		this.showN = showNo;
		this.template = $(template);
		this.res = null;
		
		this.loadData().done( $.proxy(function(res){
			this.res = res.data.contents;
			// //分页栏事件委托绑定，handlerClick()得到图片列表数据范围this.data
			this.page.on("click" ,  "span" , $.proxy(this.handlerClick , this));
			// //图片列表渲染 picListLayout
			this.picListLayout();
			// //分页栏渲染pagiLayout
			this.pagiLayout();
		},this));
	},
	loadData : function(){
		let res = $.ajax(this.url , {
			data : this.data,
			dataType : "json"
		});
		return res;
	},
	pagiLayout : function(){
		let totalN = this.res.length;
		let btnN = Math.ceil(totalN / this.showN);
		let html = "";
		for(var i = 0; i<btnN; i++){
			if( this.pageN === i+1){
				html += "<span class='active'> "+ (i+1) +"</span>";
			}else{
				html +="<span> "+(i+1)+" </span>";
			}
		}	
		this.page.html(html); 
	},
	handlerClick : function(evt){
		let e = evt || window.event;
		let target = e.target || e.srcElement;		
		this.pageN = $(target).index() + 1;
		
		//重新渲染
		this.picListLayout();
		this.pagiLayout();
	},
	picListLayout : function(){
		let content = this.cutData(this.res);
		let html = ejs.render(this.template.html() , {data : content})
		//放入布局
		// console.log(html);
		this.list.html(html);
	},
	cutData : function(data){
		let min = this.showN * (this.pageN - 1);
		let max = this.showN * this.pageN - 1;
		data = data.filter( (item ,index)=> {
			return index >= min && index <= max ;
		})
		 return data;
	}
})


new Pagination().init({
	list : ".image-list",
	page : ".pagination",
	getData : {
		url  : "http://localhost/zc",
		data : {
			pageSize : 100,
			contentId: (""+Date.now()).slice(6) + "_3",
			day : new Date().toISOString().slice(0,10)
		}
	},
	pageNo : 1,
	showNo : 5,
	template : "#template"
})