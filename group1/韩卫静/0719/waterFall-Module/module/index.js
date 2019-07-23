import loaddata from "./loadData.js";
import render from "./render.js";
import sort from "./sort.js"

export default function(){
	let list_wrapper = $(".wrapper");
	let container = $(".container");
	let res = "";
	let url = "http://localhost/dt";
	let data = {
			include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "插画绘画",
            start : 0,
			_ : Date.now()
		};
	//每次请求的开始下标
	let next_start = 0;
	//每行图片的数量
	let count = 0;
	//用来存放每列高度的数组
	let height_array = [];
	//当前窗口高度
	let clientHei = document.documentElement.clientHeight;
	let loading = false;
	let minHeight = 0;
	let html = "";
	
	
	
	loaddata.init(url ,data).done(function(res){
		data.start = next_start;
		res = res;
		setClientWidth();
		next_start = res.data.next_start;
		
		html += render(res);
		list_wrapper.html(html);
		
		let timer = null;
		$(window).on("resize",function(){
			clearInterval(timer);
			timer = setTimeout(()=>{
				setClientWidth();
				setTimeout( ()=>{
					height_array = sort(list_wrapper[0].children, count);
					changeHeight();
				},0)		
			},300);
		})
		
		
		height_array = sort(list_wrapper[0].children, count);
		changeHeight();
		
	})
	
	function setClientWidth(){
		let mainWid = document.documentElement.clientWidth;
		count = Math.floor(mainWid / 250 );
		container.css("width" ,count * 250 );
		clientHei = document.documentElement.clientHeight;
	}
	
	function changeHeight(){
		container.css("height" ,  Math.max.apply(false,height_array));
		minHeight = Math.min.apply(false , height_array);
	}
	
}