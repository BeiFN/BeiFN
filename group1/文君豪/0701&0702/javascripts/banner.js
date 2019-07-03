/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

 ///当前图片坐标
//2.在options中传入effct:fade | sldie
 function Banner(selector,options)
 {
  this.main = document.querySelector(selector)
  this.sliders = this.main.querySelectorAll(".slide");
  this.btn_prev = this.main.querySelector(".button-prev")
  this.btn_next = this.main.querySelector(".button-next")
  this.wrapper = this.main.querySelector(".wrapper")
  this.nowIndex = 0;

 if(arguments.length === 1)
    {
        this.options = {
            effect : "slide"
        }
    }
  this.init();
 }

 Banner.prototype.init= function()
 {
     //布局
     this.layout();
     this.btn_prev.addEventListener("click" , this.pervIndex.bind(this))
     this.btn_next.addEventListener("click" , this.nextIndex.bind(this))
     //动画
     this.main.addEventListener("click", this[this.options.effect].bind(this))
 }

 Banner.prototype.layout = function()
 {
    switch(this.options.effect){    
        case "slide":
        this.main.className +=" container-slide";
        this.wrapper.appendChlid(this.sliders[0].cloneNode(true))
        this.wrapper.style.width = this.main.offsetWidth * (this.sliders.length+1)+"px"
        
        break;
        case "fade":
                    this.main.className+= " container-fade";
         break;
        
    }
 }
Banner.prototype.pervIndex = function()
{
    if(this.nowIndex === 0)
        {
            this.nowIndex = this.sliders.length-1;
        }
    else
        {
            this.nowIndex--;
        }
      //  console.log(this.nowIndex)
}
Banner.prototype.nextIndex = function()
{
    if(this.nowIndex === this.sliders.length-1)
        {
            this.nowIndex = 0;
        }
    else
        {
            this.nowIndex++;
        }
      //  console.log(this.nowIndex)
}
 
Banner.prototype.fade = function()
{
   // console.log(1)
   for(var  i = 0 ,slide; slide = this.sliders[i++] ; )
    {
      slide.style.opacity = 0;
      slide.style.transition = "all 1s"

    }
   this.sliders[this.nowIndex].style.opacity =1;
}