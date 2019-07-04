/**
 * nowIndex表示当前轮播到的位置 
 * 
 * 1.先根据翻转效果进行布局
 * 2.给左右按钮添加事件，只改变nowIndex值，事件委托给父元素
 * 3.给容器添加事件，转动轮播图
 * 
 * 当效果为slider时，需要所有子元素排成一行，并在末尾添加一个用来处理
 * 边界跳转; sliders的长度加一
 * 当效果为fade时，所有元素在一个位置叠加，需要展示的元素在最上面;
 * 
 */

function Banner(seletor,options){
	this.nowIndex = 0;
	this.option = Object.assign({
		effect : "slide",
		pagination : ".pagination"
	},options);
	this.state = "normal"
	
	this.mainPart = document.querySelector(seletor);
	this.wrapper = this.mainPart.querySelector(".wrapper");
	this.sliders = this.mainPart.querySelectorAll(".slide");
	this.btn_next = this.mainPart.querySelector(".button-next");
	this.btn_prev = this.mainPart.querySelector(".button-prev");
		
	this.init();
}

Banner.prototype.init = function(){
	// console.log(1,this.sliders , this.btn_next,this.btn_prev);
	//根据效果进行布局
	this.animateLayout();
	//分页栏布局
	this.padinationLayout();
	
	console.log(this.mainPart.offsetWidth);
	this.btn_next.addEventListener("click" , this.goNext.bind(this));
	this.btn_prev.addEventListener("click" , this.goPrev.bind(this));
	this.mainPart.addEventListener("click" , this[this.option.effect].bind(this));
	this.mainPart.addEventListener("click" , this.changePagition.bind(this));
	// this.mainPart.addEventListener("click" , this.changePagition.bind(this));
	this.mainPart.addEventListener("click" , this.clickPagition.bind(this));
	
}
//动画布局，根据option.effect的值来判定
Banner.prototype.animateLayout = function(){
	switch(this.option.effect){
		case "slide" :
			this.wrapper.style.left = 0;
			this.mainPart.className += "  container-slide"
			var cloneSlide = this.sliders[0].cloneNode(true);
			this.sliders = [].slice.call(this.sliders);
			this.sliders.push(cloneSlide);
			this.wrapper.appendChild(cloneSlide);
			this.wrapper.style.width = this.mainPart.offsetWidth * this.sliders.length + "px";
			break;
		case "fade" :
			this.mainPart.className += " container-fade";
			break;
	}
}
//分页栏布局
Banner.prototype.padinationLayout = function(){
	var pagiCount = this.sliders.length - ( this.option.effect === "slide" ? 1 : 0);
	this.paginations = this.mainPart.querySelector(this.option.pagination);
	var html = "";
	for(var i = 0 ; i < pagiCount ; i++){
		if(i === 0){
			html += "<div class='pagination-bullet pagination-bullet-active'></div>";
		}else{
			html += "<div class='pagination-bullet'></div>";
		}
	}
	this.paginations.innerHTML = html;
}
Banner.prototype.changePagition = function(){
	for(var i = 0 , bullet; bullet = this.paginations.children[i++]; ){
		bullet.className = "pagination-bullet";
	}
	var index = 0;	
	setTimeout(function(){
		if(this.option.effect === "slide" && (this.nowIndex === this.sliders.length - 1) ){		
			index =  0 ;
			this.paginations.children[index].className += " pagination-bullet-active";
		}else{
			this.paginations.children[this.nowIndex].className += " pagination-bullet-active";
		}		
	}.bind(this),0);
	console.log("change pagination " + this.nowIndex);

}
//点击分页栏进行跳转
Banner.prototype.clickPagition = function(evt){
	var e = evt || window.event;
	var target = e.target || e.srcElement ;
	
	if(target !== this.paginations ){
		for(var i = 0 , bullet; bullet = this.paginations.children[i];i++ ){
			if(target === bullet){
				this.toIndex(i);
				this[this.option.effect]();
				break;
			}
		}
	}	
}
//点击向左或者向右，改变当前的nowIndex值
Banner.prototype.goNext =function(){
	if(this.nowIndex === this.sliders.length - 1){
		this.state = "goFirst";
		this.nowIndex = 0;
	}else{
		this.nowIndex++;
		this.state = "normal";
	}
}
Banner.prototype.goPrev =function(){
	if(this.nowIndex === 0){
		this.state = "golast";
	    this.nowIndex = this.sliders.length - 1;

	}else{
		this.nowIndex--;
		this.state = "normal";
	}
}
//不同的轮播效果方法
Banner.prototype.slide = function(){
	switch(this.state){
		case "normal" :
			this.wrapper.style.transition = "left 1s";
			this.wrapper.style.left = - (this.mainPart.offsetWidth * this.nowIndex) + "px";
			break;
		case "goFirst" :
			this.wrapper.style.transition = "top 1s";
			this.wrapper.style.left = 0 ;
			setTimeout(function(){
				this.nowIndex = 1;
				this.state = "normal";
				this.slide();
			}.bind(this),0)
			break;
		case "golast" :
			this.wrapper.style.transition = "top 1s";
			this.wrapper.style.left = - (this.mainPart.offsetWidth *( this.sliders.length-1)) + "px"; ;
			setTimeout(function(){
				this.nowIndex = 4;
				this.state = "normal";
				this.slide();
			}.bind(this),0)
			break;
	}
	console.log("slide event " + this.nowIndex);

}
Banner.prototype.fade =function(){
	for(var i = 0 , sli ; sli = this.sliders[i++];){
		sli.style.opacity = 0;
		sli.style.transition = "all 1s";		
	}
	this.sliders[this.nowIndex].style.opacity = 1 ;
	
}
//改变nowIndex的值
Banner.prototype.toIndex = function(index){
      this.nowIndex = index;
 }
