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
	
	this.mainPart = $(seletor);
	this.wrapper = $(".wrapper");
	this.sliders = $(".slide");
	this.btn_next = $(".button-next");
	this.btn_prev = $(".button-prev");
		
	this.init();
}
$.extend(Banner.prototype , {
	init : function(){
		//根据效果进行布局
		this.animateLayout();
		this.padinationLayout();
		
		this.btn_next.on("click" ,$.proxy( this.goNext ,this));
		this.btn_prev.on("click" , $.proxy(this.goPrev ,this));
		
		this.mainPart.on("click" , $.proxy(this[this.option.effect],this) );
		this.mainPart.on("click" , $.proxy(this.changePagition ,this) );
		this.mainPart.on("click" , $.proxy(this.clickPagition ,this) );
	},
	animateLayout : function(){
		// console.log(this.option.effect)
		switch(this.option.effect){
			case "slide" :
				this.wrapper.css("left",0);
				this.mainPart.addClass("container-slide");
				var cloneSlide = this.sliders[0].cloneNode(true);
				this.sliders = [].slice.call(this.sliders);
				this.sliders.push(cloneSlide);
				this.wrapper.append(cloneSlide);
				this.wrapper.css("width",this.mainPart.width() * this.sliders.length);
				break;
			case "fade" :
				this.mainPart.addClass("container-fade");
				break;
		}
	},
	padinationLayout : function(){
		var pagiCount = this.sliders.length - ( this.option.effect === "slide" ? 1 : 0);
		this.paginations = $(this.option.pagination);
		var html = "";
		for(var i = 0 ; i < pagiCount ; i++){
			if(i === 0){
				html += "<div class='pagination-bullet pagination-bullet-active'></div>";
			}else{
				html += "<div class='pagination-bullet'></div>";
			}
		}
		this.paginations.html(html);
	},
	changePagition : function(){
		for(var i = 0 , bullet; bullet = this.paginations.children()[i++]; ){
			bullet.className = "pagination-bullet";
		}
		let pagiList = this.paginations.children();
		
		var index = 0;	
		setTimeout(function(){
				if(this.option.effect === "slide" && (this.nowIndex === this.sliders.length - 1) ){		
					index =  0 ;
					this.paginations.children()[index].className += " pagination-bullet-active";
				}else{
					this.paginations.children()[this.nowIndex].className += " pagination-bullet-active";
				}	
		}.bind(this),0);
	},
	clickPagition : function(evt){
		var e = evt || window.event;
		var target = e.target || e.srcElement ;
		this.toIndex($(target).index());	
		this[this.option.effect]();
	},
	goNext : function(){
		if(this.nowIndex === this.sliders.length - 1){
			this.state = "goFirst";
			this.nowIndex = 0;
		}else{
			this.nowIndex++;
			this.state = "normal";
		}
	},
	goPrev : function(){
		if(this.nowIndex === 0){
			this.state = "golast";
			this.nowIndex = this.sliders.length - 1;

		}else{
			this.nowIndex--;
			this.state = "normal";
		}
	},
	slide : function(){
		switch(this.state){
			case "normal" :
				this.wrapper.css({
					"transition" : "left 1s",
					"left" : -(this.mainPart.width() * this.nowIndex) 
				});
				break;
			case "goFirst" :
				this.wrapper.css({
					"transition" : "top 1s",
					"left" : 0 
				});
				setTimeout(function(){
					this.nowIndex = 1;
					this.state = "normal";
					this.slide();
				}.bind(this),0)
				break;
			case "golast" :
				this.wrapper.css({
					"transition" : "top 1s",
					"left" :  - (this.mainPart.offsetWidth *( this.sliders.length-1)) 
				});
				setTimeout(function(){
					this.nowIndex = 4;
					this.state = "normal";
					this.slide();
				}.bind(this),0)
				break;
		}
	
	},
	fade : function(){
		for(var i = 0 , sli ; sli = this.sliders[i++];){
			sli.style.opacity = 0;
			sli.style.transition = "all 1s";		
		}
		this.sliders[this.nowIndex].style.opacity = 1 ;
		
	},
	toIndex : function(index){
	      this.nowIndex = index;
	 }
})
