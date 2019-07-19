/**
 * 鼠标移入小图，cube和大图出现
 * 鼠标在小图里移动，cube和大图位置变化
 * 鼠标移出小图，cube和大图隐藏
 */

var imgJson = {
	imgList : [
		{
			smallImg : "https://img12.360buyimg.com/n1/s450x450_jfs/t1/45235/27/3557/83738/5d15b1b4E0377911e/9f9a9267bfaa7ffe.jpg",
			bigImg : "https://img14.360buyimg.com/n0/jfs/t1/45235/27/3557/83738/5d15b1b4E0377911e/9f9a9267bfaa7ffe.jpg"
		},
		{
			smallImg : "http://img12.360buyimg.com/n1/s450x450_jfs/t1/50404/31/2441/67197/5d036a7cE74c0a64e/5fc8b69533cd475c.jpg" , 
			bigImg : "https://img14.360buyimg.com/n0/jfs/t1/40995/19/6625/84409/5d036a7dE9b77e1c4/bc027100a8f140a6.jpg", 
		},
		{
			smallImg : "https://img12.360buyimg.com/n1/s450x450_jfs/t1/46147/33/2426/40604/5d036a7cE87c31658/0f2fc1351eda2add.jpg" , 
			bigImg : "https://img14.360buyimg.com/n0/jfs/t1/46147/33/2426/40604/5d036a7cE87c31658/0f2fc1351eda2add.jpg"
		}
	]
}

function Magnifying(){
	//	获取所需元素和变量
	this.cube = $(".cube")
	this.smallImgBox = $(".smallImg")
	this.smallImg = $(".smallImg img")
	this.bigImgBox = $(".bigImg");
	this.bigImg = $(".bigImg img");
	this.seletion = $(".seletion");
	
	this.init();
}

$.extend(Magnifying.prototype , {
	init : function(){
		this.smallImgBox.on("mouseenter" , $.proxy(this.show,this) );
		this.smallImgBox.on("mouseleave" , $.proxy(this.hidden,this));
		this.smallImgBox.on("mousemove" , $.proxy(this.handlerMove,this));
		this.seletion.on("click" ,"img", $.proxy(this.changeImg,this) );
	},
	show : function(){
		this.cube.css("display" , "block");
		this.bigImgBox.css("display", "block");
		this.smallImg.css("opacity" , 0.3 );
	},
	hidden : function(){
		this.cube.css("display" , "none");
		this.bigImgBox.css("display", "none");
		this.smallImg.css("opacity" , 1 );
	},
	handlerMove : function(evt){
		var e = evt || window.event ;
		var x = e.offsetX - parseInt(getSize(this.cube).width/2) ;
		var y = e.offsetY - parseInt(getSize(this.cube).height/2) ;
		var cube_position = this.boundary(x,y);	
		var bigImg_position = this.getBigImgPosition(cube_position);	
			
		this.move(cube_position ,bigImg_position);
	},
	move : function(cube_position , bigImg_position){
		this.cube.css({
			"left" : cube_position.x,
			"top" : cube_position.y,
			"backgroundPosition" : -cube_position.x + "px " + -cube_position.y + "px"
		})
		
		this.bigImg.css({
			"left" : - bigImg_position.x,
			"top" : - bigImg_position.y
		})
	},
	boundary : function(x , y){
		x = (x <= 0) ? 0 : x ;
		var maxx = (getSize(this.smallImgBox).width - getSize(this.cube).width);
		x =  x > maxx ? maxx : x ;
		y = (y <= 0) ? 0 : y ;
		var maxy = (getSize(this.smallImgBox).height - getSize(this.cube).height);
		y =  y > maxy ? maxy : y ;
		return {
			x : x,
			y : y
		};
	},
	getBigImgPosition : function(cube_position){
		var x = Math.round(cube_position.x * getSize(this.bigImg).width / getSize(this.smallImgBox).width);
		var y = Math.round(cube_position.y * getSize(this.bigImg).height / getSize(this.smallImgBox).height);
		return {
			x : x ,
			y : y
		}
	},
	changeImg : function(evt){
		// var imgBtnList = this.seletion.children();
		var e = evt || window.event;
		var ele = e.target || e.srcElement;
		var index = $(ele).index();
		var imgBtnList  =  this.seletion.children("img");
		
		$(imgBtnList).eq(index).toggleClass("img_active")
		.siblings().removeClass("img_active");
		
		this.smallImg.attr("src",imgJson.imgList[index].smallImg);
		this.bigImg.attr("src",imgJson.imgList[index].bigImg);
		this.cube.css("backgroundImage" , "url(" + imgJson.imgList[index].smallImg +")");
	}
	
	
})


new Magnifying();
function getSize(ele){
	return {
		width : parseInt(ele.width()),
		height : parseInt(ele.height())
	}
}
