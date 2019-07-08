/**
 * 鼠标移入小图，cube和大图出现
 * 鼠标在小图里移动，cube和大图位置变化
 * 鼠标移出小图，cube和大图隐藏
 */
let {getSize,$,delegation} = Utils;

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

class Magnifying{
	//	获取所需元素和变量
	constructor(){
		
		this.cube = $(".cube")
		this.smallImgBox = $(".smallImg")
		this.smallImg = $(".smallImg img")
		this.bigImgBox = $(".bigImg");
		this.bigImg = $(".bigImg img");
		this.seletion = $(".seletion");
		
		this.init();
	}
	init(){
		this.smallImgBox.addEventListener("mouseenter" , this.show.bind(this));
		this.smallImgBox.addEventListener("mouseleave" , this.hidden.bind(this));
		this.smallImgBox.addEventListener("mousemove" , this.handlerMove.bind(this));
		this.seletion.addEventListener("click" , delegation(this.changeImg.bind(this) , "img") );
	}
	//cube和大图出现
	show(){
		this.cube.style.display = "block";
		this.bigImgBox.style.display = "block";
		this.smallImg.style.opacity = 0.3 ;
	}
	//鼠标移出，隐藏元素
	hidden(){
		this.cube.style.display = "none";
		this.bigImgBox.style.display = "none";
		this.smallImg.style.opacity = 1 ;
	}
	handlerMove(evt){
		var e = evt || window.event ;
		// console.log(e);
		var x = e.offsetX - parseInt(getSize(this.cube).width/2) ;
		var y = e.offsetY - parseInt(getSize(this.cube).height/2) ;
		var cube_position = this.boundary(x,y);	
		var bigImg_position = this.getBigImgPosition(cube_position);	
			
		this.move(cube_position ,bigImg_position);
	}
	move(cube_position , bigImg_position){
		this.cube.style.left = cube_position.x + "px";
		this.cube.style.top = cube_position.y + "px";
		
		this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
				
		this.bigImg.style.left = - bigImg_position.x + "px" ;
		this.bigImg.style.top = - bigImg_position.y + "px" ;
	}
	boundary(x , y){
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
	}
	getBigImgPosition(cube_position){
		var x = Math.round(cube_position.x * getSize(this.bigImg).width / getSize(this.smallImgBox).width);
		var y = Math.round(cube_position.y * getSize(this.bigImg).height / getSize(this.smallImgBox).height);
	
		return {
			x : x ,
			y : y
		}
	}
	changeImg(evt , ele){
		var imgBtnList  = [].slice.call( this.seletion.querySelectorAll("img"));
		for(var i = 0 ,btn ; btn = imgBtnList[i++];){
			btn.className = "img_btn"
		}
		ele.className += " img_active";
		var index = imgBtnList.indexOf(ele);
		this.smallImg.setAttribute("src",imgJson.imgList[index].smallImg);
		this.bigImg.setAttribute("src",imgJson.imgList[index].bigImg);
		this.cube.style.backgroundImage = "url(" + imgJson.imgList[index].smallImg +")";
		// ele.setAttribute("",json.attr[a]);
		console.log(imgBtnList,index);
	}
	
}

