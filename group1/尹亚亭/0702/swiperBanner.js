/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

// 程序之中必须要有 ,表示当前显示图片的下标;  nowIndex;
// 下一页 上一页 到达某页;
// 1.实现fade
// 2. options => effect : fade | slide 

function Banner(Selector,options){
	this.nowIndex=0;
	this.main=document.querySelector(Selector);
	this.slides=document.querySelectorAll(".slide");
	this.prev=document.querySelector(".button-prev");
	this.next=document.querySelector(".button-next");
	this.wrapper=document.querySelector(".wrapper");
	// if(arguments.length === 1){
	//      this.options = {
	//           effect : "slide"
	//      }
	// }
	this.options=Object.assign({
			effect: "slide",
			pagination:".pagination",
		},options); 

	this.init();
}

// init函数，处理各种事件及耦合关系
Banner.prototype.init=function(){
	// this.layout();
	this.layoutAnimate();
    this.layoutPagnination();
	
	this.prev.addEventListener("click",this.prevIndex.bind(this));
	this.next.addEventListener("click",this.nextIndex.bind(this));
	// this.main.addEventListener("click",this.animate.bind(this));
	this.main.addEventListener("click",this[this.options.effect].bind(this));
	this.pagination_ele === null? "":addEventListener("click",this.changePagination.bind(this));
	this.pagination_ele===null?"":addEventListener("click",this.handlePaginationClick.bind(this));
}

Banner.prototype.changePagination=function(){
	for(var i = 0 , bullet; bullet = this.pagination_ele.children[i++];){
            removeClassName(bullet , "pagination-bullet-active")
      }
      var index = this.nowIndex;
	  if(this.options.effect == "slide"){
            index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex; 

            if(this.nowIndex === 0 && this.state === "changeFirst"){
                  index = 1;
            }
            if(this.nowIndex === 5 && this.state === "changeLast"){
                  index = this.slides.length - 2;
            }
      }
	  this.pagination_ele.children[index].className += " pagination-bullet-active";
}

Banner.prototype.handlePaginationClick=function(evt){
	var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target !== this.pagination_ele){
            for(var i = 0 ; i < target.parentNode.children.length ; i ++){
                  if(target === target.parentNode.children[i]){
                        this.toIndex(i);
                        break;
                  }
            }
      }
}
Banner.prototype.toIndex = function(index){
      this.nowIndex = index;
 }
Banner.prototype.layoutPagnination=function (){
	var pagination_count=this.slides.length-(this.options.effect==="slide"?1:0);
	this.pagination_ele = document.querySelector(this.options.pagination);
	if(this.pagination_ele === null ) return false;
	var html="";
	for (var i=0;i<pagination_count;i++) {
		if(i===this.nowIndex){
			html+="<div class='pagination-bullet pagenation-bullet-active'></div>"; 
		}else{
			html+="<div class='pagination-bullet'></div>";
		}
	}
	this.pagination_ele.innerHTML=html;
}

// 布局 根据不同的动画效果进行不同的布局
Banner.prototype.layoutAnimate=function (){
	switch (this.options.effect){
		case "slide":
			this.main.className += " container-slide";
			var cloneSlide=this.slides[0].cloneNode(true);
			this.wrapper.appendChild(cloneSlide);
			this.slides=[].slice.call(this.slides);
			this.slides.push(cloneSlide);
			this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";
			break;
		case "fade":
			this.main.className += " container-fade";	//加上fade专属的效果
			break;
	}
}

// 
Banner.prototype.prevIndex = function(){
	if (this.nowIndex === 0) {
		this.nowIndex = this.slides.length-1;
		// 最后一张
		 this.state = "changeLast";
	}else{
		this.nowIndex--;
		 this.state = "normal";
	}
	//console.log(this.nowIndex)
}
	
//
Banner.prototype.nextIndex=function(){
	if (this.nowIndex === this.slides.length-1) {
		this.nowIndex = 0;
		 this.state = "changeFirst";
	}else{
		this.nowIndex++;
		 this.state = "normal";
	}
	//console.log(this.nowIndex);
}

Banner.prototype.fade=function(){
	for (var i=0,slide;slide=this.slides[i];i++) {
		slide.style.opacity=0;
		slide.style.transition="all 1s"
	}
	this.slides[this.nowIndex].opacity=1;
}

Banner.prototype.slide=function(){
	switch (this.state){
		case "normal":
			this.wrapper.style.left=0;
			this.wrapper.style.transform="left 1s";
			setTimeout(function(){
				this.wrapper.style.left=-this.main.offsetWidth*this.nowIndex;
			}.bind(this),0);
			break;
		case "changeFirst":
			this.wrapper.style.transform="top 1s";
			this.wrapper.style.left=0;
			setTimeout(function(){
				this.nowIndex++;
				this.state="normal";
				this.slide();
			}.bind(this),0);
			break;
		case "changeLast":
			this.wrapper.style.transform="top 1s";
			this.wrapper.style.left=-this.main.offsetWidth*(this.slides.length-1);
			setTimeout(function(){
				this.nowIndex++;
				this.state="normal";
				this.slide();
			}.bind(this),0);
			
			break;
	}
	
}

function removeClassName(dom , className){
      return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
 }