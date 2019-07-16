/**
 * 瀑布流：
 * 1.加载数据
 * 2.渲染界面
 * 3.排列图片
 */

let {ajax ,$ , on} = Utils;

class Waterfall{
	constructor({
		container = "",
		list_wrapper = "",
		getData = {
			url : " ",
			data : { }
		}
	}={}) {
		this.list_wrapper = $(list_wrapper);
		this.container = $(container);
		this.res = "";
		this.url = getData.url;
		this.data = getData.data;
		//每行图片的数量
		this.count = 0;
		this.height_array = [];
	    this.init();
	}
	async init(){
		this.res = await this.loadData();
		this.setClientWidth();
		let timer = null;
		on(window , "resize" , ()=>{
			clearInterval(timer);
			timer = setTimeout(()=>{
				this.setClientWidth();
				setTimeout( ()=>{
					this.picLayout();
					this.sort();
				},0)		
			},300);
		})
		this.picLayout();
		// console.log(this.res);
		this.sort();
	}
	//数据加载
	async loadData(){
		let res = await ajax(this.url , {
			data : this.data,
			dataType : "json"
		});	
		return res;
	}
	//渲染界面布局
	picLayout(){
		let list = this.res.data.object_list;
		
		let html = "";
		for(let i = 0; i< list.length ; i++){
			let scale_height = parseInt(list[i].photo.height / list[i].photo.width * 235);
			html += `<div class="box">
							<div class="box-img" style="height: ${scale_height}px">
								  <img src="${list[i].photo.path}"  alt="">
								  <u style="height: ${scale_height}px"></u>
							</div>
							<div class="box-detail">
								  <div class="title">
										${list[i].msg}
								  </div>
							</div>
					  </div>`;
		}
		this.list_wrapper.innerHTML = html;
	}
	//将渲染好的界面重新排序
	sort(){
		let children = this.list_wrapper.children ;
		this.height_array = [];
		// console.log(children);
		Array.from(children).forEach( (box , index ) =>{
			if(index < this.count){
				//判断是否是第一排
				this.height_array.push(box.offsetHeight);
			}else{
				let min = Math.min.apply(false,this.height_array);
				let minIndex = this.height_array.indexOf(min);
				box.style.position = "absolute";
				box.style.left = 250 * minIndex + "px";
				box.style.top = min + 15 + "px";
				this.height_array[minIndex] += + box.offsetHeight + 20 ;
			}
		})
		this.container.style.height = Math.max.apply(false,this.height_array) + "px";
	}
	setClientWidth(){
		let mainWid = document.documentElement.clientWidth;
		this.count = Math.floor(mainWid / 250 );
		this.container.style.width = this.count * 250 +"px";
	}
	
}

new Waterfall({
	container : ".container",
	list_wrapper : ".wrapper",
	getData : {
		url : "http://localhost/dt",
		data : {
			include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "插画绘画",
            start : 0,
			_ : Date.now()
		}
	}
})