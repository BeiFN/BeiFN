function Magnifier(){
    this.small_box = document.querySelector(".small_img");
    this.small_img = this.small_box.querySelector("img");
    this.big_box = document.querySelector(".big_img");
    this.cube = this.small_box.querySelector(".cube");
    this.big_img = this.big_box.querySelector("img");
    this.img_list = document.querySelector(".img_list");
    this.little_imgs = this.img_list.querySelectorAll("img");
    //console.log(this.little_imgs[0].src);
    this.init();
}

Magnifier.prototype.init = function(){
    this.small_box.addEventListener("mouseenter",this.showBox.bind(this));
    this.small_box.addEventListener("mouseleave",this.hiddenBox.bind(this));
    this.small_box.addEventListener("mousemove",this.dragCubeMove.bind(this));
    this.img_list.addEventListener("click",this.changeBoxImgUrl.bind(this));
    for(var i=0,img; img=this.little_imgs[i++];){
        img.addEventListener("click",this.changeImgListStyle.bind(this,i));
    }
    
}
Magnifier.prototype.changeBoxImgUrl = function(evt){
    var e = evt || window.event,
        target = e.target || e.Element;
        this.small_img.src = target.src;
        this.big_img.src = target.src;
        this.cube.style.backgroundImage = 'url("'+target.src+'")';
}
Magnifier.prototype.changeImgListStyle = function(index){
        for(var i=0,img; img=this.little_imgs[i++];){
            img.parentNode.className="img";
        }
        this.little_imgs[index-1].parentNode.className="img active";   
}
Magnifier.prototype.dragCubeMove = function(evt){
    var e = evt || window.event,
        clientX = e.clientX,
        clientY = e.clientY,
        x=clientX-this.cube.offsetWidth/2-20,
        y=clientY-this.cube.offsetHeight/2;
        if(x<0){
            x=0;
        }
        if(x>this.small_box.offsetWidth-this.cube.offsetWidth){
            x=this.small_box.offsetWidth-this.cube.offsetWidth;
        }
        if(y<0){
            y=0;
        }
        if(y>this.small_box.offsetHeight-this.cube.offsetHeight){
            y=this.small_box.offsetHeight-this.cube.offsetHeight;
        }
        this.cube.style.left = x+"px";
        this.cube.style.top = y+"px";
        this.big_img.style.left=-3*x+"px";
        this.big_img.style.top=-3*y+"px";
        this.cube.style.backgroundPosition=-x+"px "+ -y+"px";
}
Magnifier.prototype.showBox = function(){
    this.big_box.style.display = "block";
    this.cube.style.display = "block";
    this.small_img.style.opacity = "0.5";
}
Magnifier.prototype.hiddenBox = function(){
    this.big_box.style.display = "none";
    this.cube.style.display = "none";
    this.small_img.style.opacity = "1";
}
new Magnifier();