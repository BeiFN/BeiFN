function Banner(options){
	this.container=document.querySelector(".container");
	this.slides=document.querySelectorAll(".wrapper div");
	this.wrap=document.querySelector(".wrapper");
	this.pre=document.querySelector(".button-prev");
	this.next=document.querySelector(".button-next");
	this.smallbtn=document.querySelector(".pagination");
	this.page=0;
	this.back=0;
	this.options = Object.assign({
		effect : "slide",
		pagination : ".pagination"
},options)
	this.init();
}
Banner.prototype.init=function(){
	this.layoutAn();
	this.layoutBtn();
	this.pre.addEventListener("click",this.goPre.bind(this));
	this.next.addEventListener("click",this.goNext.bind(this));
	this.smallbtn.addEventListener("click",this.goBtn.bind(this));
	this.container.addEventListener("click",this.fade.bind(this));
}
Banner.prototype.goPre=function(){
	if(this.page===0){
		this.page=this.slides.length-1;
		this.back=1;
	}
	else{
		this.page--;
	}
}
Banner.prototype.goNext=function(){
	if(this.page===this.slides.length-1){
		this.page=0;
		this.back=2;
		
	}
	else{
		this.page++;
	}
}
Banner.prototype.layoutBtn=function(){
	var html="";
	this.pages=this.slides.length;
	if(this.options.effect==="slide"){
		this.pages=this.slides.length-1;
	}
	for(var i=0;i<this.pages;i++){
		if(i===this.page){
			html+="<div class='pagination-bullet pagination-bullet-active'></div>";
		}
		else{
		html+="<div class='pagination-bullet'></div>";
		}
	}
	this.smallbtn.innerHTML=html;
}
Banner.prototype.goBtn=function(eve){
	var e=eve||event;
	for(var i=0;i<this.pages;i++){
		removeClassName(this.smallbtn.children[i],"pagination-bullet-active");
	}
	var target=e.target||e.srcElement;
	var index=0
	// console.log(target,this.smallbtn.children[1]);
	for(var i=0;i<this.pages;i++){
		if(target==this.smallbtn.children[i]){
			this.page=i;
		}

	}
	target.className +=" pagination-bullet-active";

}


Banner.prototype.layoutAn=function(){
	switch(this.options.effect){
		case "slide":{
			this.container.className+=" container-slide";
			var clone=this.slides[0].cloneNode(true);
			this.wrap.appendChild(clone);
			this.slides=[].slice.call(this.slides);
			this.slides.push(clone);
			this.wrap.style.width=(this.slides.length)*this.container.offsetWidth+"px";
			break;
		}
		case "fade":{
			this.container.className+=" container-fade";
			break;
		}
	}
}
Banner.prototype.fade=function(){

	switch(this.options.effect){
		case "fade": {for(i=0;i<this.slides.length;i++){
			this.slides[i].style.opacity=0;
			this.slides[i].style.transition="all 1s";
			}
			this.slides[this.page].style.opacity=1;
			break;}  
		case "slide": {
			switch(this.back){
				case 0:{
					this.wrap.style.left=0;
					this.wrap.style.transition="all 1s";
					setTimeout(function(){
					this.wrap.style.left=-this.page*this.container.offsetWidth	+"px";
					}.bind(this),10);
					break;
				}
				case 1:{
					this.wrap.style.transition="top 1s";
					this.back=0;
						this.wrap.style.left=-this.page*this.container.offsetWidth	+"px";
						this.page=this.slides.length-2;
						setTimeout(function() {
						this.fade();
						}.bind(this), 10);
						break;
				}
				case 2:{
					this.wrap.style.transition="top 1s";	
					this.back=0;
					this.wrap.style.left=-this.page*this.container.offsetWidth	+"px";
					this.page=1;
					setTimeout(function(){
						this.fade();
					}.bind(this),10)
						break;				
				}

			}

			}
	}	
	for(var i=0;i<this.pages;i++){
		removeClassName(this.smallbtn.children[i],"pagination-bullet-active");
	}
	this.smallbtn.children[this.page].className +=" pagination-bullet-active";
}
function removeClassName(dom , className){
	return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}


var table=new Banner();