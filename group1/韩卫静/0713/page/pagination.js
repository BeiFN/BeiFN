/**
 * 初始化获取按钮个数
 * 事件 点击获取下标范围，
 * 发送请求获取数据
 * 根据下标范围截取需要的数据
 * 利用得到的数据进行页面渲染
 * 
 */
let {ajax , $ ,on} = Utils;
class Pagination{
	constructor() {
		// this.data = [];
		// this.res = res;
	}
	async init({
		list = "",
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
		this.template = template;
		this.res = null;
		
		//加载数据loadData
		this.res = await this.loadData();
		this.res = this.res.data.contents;
		//分页栏事件委托绑定，handlerClick()得到图片列表数据范围this.data
		on(this.page ,"click" , this.handlerClick.bind(this) , "span")
		//图片列表渲染 picListLayout
		this.picListLayout();
		//分页栏渲染pagiLayout
		this.pagiLayout();
	}
	loadData(){
		let res = ajax(this.url , {
			data : this.data,
			dataType : "json"
		});
		
		return res;
	}
	pagiLayout(){
		let totalN = this.res.length;
		let btnN = Math.ceil(totalN / this.showN);
		//优化，若当前按钮数量不改变，只改变类的值，不再重新渲染页面
		let pageChildN = this.page.children;
		if(btnN === pageChildN.length){
			Array.from(pageChildN).forEach( (btn,index)=>{
				if(index+1 === this.pageN){
					btn.className = "active";
				}else{
					btn.className = "";
				}
			})
			return false;
		}
		
		let html = "";
		for(var i = 0; i<btnN; i++){
			if( this.pageN === i+1){
				html += `<span class=active> ${i+1} </span>`;
			}else{
				html += `<span> ${i+1} </span>`;
			}
		}	
		this.page.innerHTML = html;
	}
	picListLayout(){
		let content = this.cutData(this.res);
		let html = ejs.render(this.template , {data : content})
		//放入布局
		// console.log(html);
		this.list.innerHTML = html;
	}
	handlerClick(evt){
		let e = evt || window.event;
		let target = e.target || e.srcElement;
		
		this.pageN = Array.from(target.parentNode.children).indexOf(target) + 1;
		
		//重新渲染
		this.picListLayout();
		this.pagiLayout();
	}
	cutData(data){
		let min = this.showN * (this.pageN - 1);
		let max = this.showN * this.pageN - 1;
		data = data.filter( (item ,index)=> {
			return index >= min && index <= max ;
		})
		 return data;
	}
}

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
	template : $("#template").innerHTML
})