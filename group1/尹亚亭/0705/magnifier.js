 let {delegation,getAbsPosition,$,removeClassName} = Utils;
 
 class Magnifier{
	
	static getSize(dom){
		return {
			width:parseInt(getComputedStyle(dom)["width"]),
	 		height:parseInt(getComputedStyle(dom)["height"])
		}
	}
	
	constructor(){		  // 放属性;
		this.small_wrapper  = $(".smallBox");
		this.small_img      = $(".smallBox img")
		this.small_cube     = $(".cube");
		// 大图部分
		this.big_boxWrap    = $(".bigBox");
		this.big_img        = $(".bigBox img")
		//图片切换部分
		this.btn_boxWrapper = $(".btnBox");
		this.btn_img        =this. btn_boxWrapper.children;
		// 获取图片的地址	
		this.list=[
			{
				small_src:"https://upload-images.jianshu.io/upload_images/18462362-9ba115998766d665.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
				cube_src :"https://upload-images.jianshu.io/upload_images/18462362-9ba115998766d665.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
				big_src  :"https://upload-images.jianshu.io/upload_images/18462362-9ba115998766d665.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
			},
			{
				small_src:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
				cube_src:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
				big_src:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
			},
			{
				small_src:"https://img14.360buyimg.com/n1/s450x450_jfs/t19780/222/1897536104/310145/ffa04ad5/5add75c8N45d76e9a.jpg",
				cube_src:"https://img14.360buyimg.com/n1/s450x450_jfs/t19780/222/1897536104/310145/ffa04ad5/5add75c8N45d76e9a.jpg",
				big_src:"https://img14.360buyimg.com/n0/jfs/t19780/222/1897536104/310145/ffa04ad5/5add75c8N45d76e9a.jpg"	
			},
			{
				small_src:"https://img12.360buyimg.com/n1/s450x450_jfs/t1/34005/17/14718/142495/5d13175cE1a4dc33b/d9b9c06a24577f9b.jpg",
				cube_src:"https://img12.360buyimg.com/n1/s450x450_jfs/t1/34005/17/14718/142495/5d13175cE1a4dc33b/d9b9c06a24577f9b.jpg",
				big_src:"https://img14.360buyimg.com/n0/jfs/t1/34005/17/14718/142495/5d13175cE1a4dc33b/d9b9c06a24577f9b.jpg"	
			}
		]
		// 获取几个值
		this.small_wrapper_position = getAbsPosition(this.small_wrapper);
		this.small_cube_size        = Magnifier.getSize(this.small_cube);
		this.small_wrapper_size     = Magnifier.getSize(this.small_wrapper);
		this.big_boxWrap_size       = Magnifier.getSize(this.big_boxWrap);
		this.big_img_size           = Magnifier.getSize(this.big_img);
	
		//获取元素
		this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
		this.small_wrapper.addEventListener("mouseleave",this.hide.bind(this));
		this.small_wrapper.addEventListener("mousemove",this.handlerSmallMove.bind(this));
		this.btn_boxWrapper.addEventListener("click",delegation(this.changeImg.bind(this),".imgBox"));
	}
	
	// 显示
	show(){
		this.small_cube.style.display="block";
		this.big_boxWrap.style.display="block";
		//增加隐藏效果
		this.small_img.style.opacity=0.3;
	}
	
	// 隐藏
	hide(){
		this.small_cube.style.display="none";
		this.big_boxWrap.style.display="none";
		this.small_img.style.opacity=1;
	}
	
	// 点击图片按钮，图片切换
	changeImg(evt,ele){
		// 每次只给所选中的颜色添加 boeder-color 样式
		for (var i=0, btn; btn=this.btn_img[i];i++) {
			removeClassName(btn,"active");
		}
		ele.className += " active";
		
		var listIndex=[].slice.call(document.querySelectorAll(".imgBox"));
		var index = listIndex.indexOf(ele);
		this.small_img.setAttribute("src",this.list[index].small_src);
		this.small_cube.setAttribute("style", "background-image : url("+this.list[index].cube_src+")");
		this.big_img.setAttribute("src",this.list[index].big_src);
	}
	
	// 核心函数，处理鼠标移动相关的操作
	handlerSmallMove(evt){
		var e=evt||window.event;
		var x=e.pageX-this.small_wrapper_position.left-this.small_cube_size.width/2;
		var y=e.pageY-this.small_wrapper_position.top-this.small_cube_size.height/2;
		
		var move_position = this.boundary(x,y);
		var big_position  = this.getBigPosition(move_position);
		this.move(move_position,big_position);
	}
	
	// cube移动
	move(small,big){
		this.small_cube.style.left=small.x+"px";
		this.small_cube.style.top=small.y+"px";
		
		this.small_cube.style.backgroundPosition = -small.x + "px " + -small.y+"px";
		
		this.big_img.style.left= -big.x + "px";
		this.big_img.style.top= -big.y + "px";
	}
	
	// 边界检测 
	boundary(x,y){
		// 检测x,y的最大、最小值
		x= x <= 0 ? 0 : x;
		var maxX= this.small_wrapper_size.width-this.small_cube_size.width;
		x= x>=maxX ? maxX : x;
		y= y<=0 ? 0 : y;
		var maxY=this.small_wrapper_size.height-this.small_cube_size.height;
		y= y >= maxY ? maxY : y;
		return {	 //边界的返回值
			x:x,
			y:y
		}
	}
	
	// 依照比例，依照小盒子计算大盒子
	getBigPosition(position){
		var small_totle_width=this.small_wrapper_size.width-this.small_cube_size.width;
		var small_totle_height=this.small_wrapper_size.width-this.small_cube_size.height;
		
		var big_totle_width=this.big_img_size.width-this.big_boxWrap_size.width;
		var big_totle_height=this.big_img_size.height-this.big_boxWrap_size.height;
		
		return {
			x:parseInt(position.x / small_totle_width * big_totle_width),
			y:parseInt(position.y / small_totle_width *big_totle_width )
		}
	}
}

new Magnifier();