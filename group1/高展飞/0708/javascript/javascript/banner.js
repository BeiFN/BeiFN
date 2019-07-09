/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

 // 程序之中必须要有 ,表示当前显示图片的坐标;  nowIndex;
 // 下一页 上一页 到达某页;

 // 1. 得有元素绑定事件 ;

 // 2. options => effect : fade | slide 
 //    1. 影响基础布局;
 //    2. 影响动画效果;

class Banner{
      constructor(selector,options){
            // 当前显示哪个图片;
            this.nowIndex = 0;
            //
            this.state = "normal";
      
            this.main     = document.querySelector(selector);
            this.sliders  = this.main.querySelectorAll(".slide");
            this.btn_prev = this.main.querySelector(".button-prev");
            this.btn_next = this.main.querySelector(".button-next");
            this.wrapper  = this.main.querySelector(".wrapper");
          
            this.options = Object.assign({
                        effect : "slide",
                        pagination : ".pagination"
            },options)
           
            this.init();
       }
       init(){
            // 布局;
            // this.main.className += " container-fade";
            // 先布局;
            this.layoutAnimate();
            this.layoutPagnination();
      
            this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
            this.btn_next.addEventListener("click",this.nextIndex.bind(this));
            // 动画;
            this.main.addEventListener("click",this[this.options.effect].bind(this));
            this.pagination_ele === null ? "" : this.main.addEventListener("click",this.changePagination.bind(this));
            this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click" , this.handlerPaginationClick.bind(this))
       }
      
       handlerPaginationClick(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            if(target !== this.pagination_ele){
                  // console.log(target.parentNode);
                  // console.log(target.parentNode.children);
                  for(var i = 0 ; i < target.parentNode.children.length ; i ++){
                        if(target === target.parentNode.children[i]){
                              this.toIndex(i);
                              break;
                        }
                  }
            }
       }
      
       changePagination (){
      
            for(var i = 0 , bullet; bullet = this.pagination_ele.children[i++];){
                  removeClassName(bullet , "pagination-bullet-active")
            }
            var index = this.nowIndex;
            if(this.options.effect == "slide"){
                  index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex; 
      
                  if(this.nowIndex === 0 && this.state === "changeFirst"){
                        index = 1;
                  }
                  if(this.nowIndex === 5 && this.state === "changeLast"){
                        index = this.sliders.length - 2;
                  }
            }
      
            this.pagination_ele.children[index].className += " pagination-bullet-active";
            // console.log(this.nowIndex,this.state);
       }
       layoutPagnination(){
            var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
            this.pagination_ele = document.querySelector(this.options.pagination);
            if(this.pagination_ele === null ) return false;
            var html = "";
            for(var i = 0 ; i < pagination_count ; i++){
                  if(i === this.nowIndex){
                        html += "<div class='pagination-bullet pagination-bullet-active'></div>"
                  }else{
                        html += "<div class='pagination-bullet'></div>"
                  }
            }
            this.pagination_ele.innerHTML = html;
       }
      
      // 动画布局;
      layoutAnimate(){
            switch(this.options.effect){
                  case "slide" : 
                        this.main.className += " container-slide";
                        var cloneSlide = this.sliders[0].cloneNode(true);
                        this.wrapper.appendChild( cloneSlide );
                        //console.log(this.sliders.length)
                        this.sliders = [].slice.call(this.sliders);
                        this.sliders.push(cloneSlide);
                        this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
                        break;
                  case "fade" : 
                        this.main.className += " container-fade";
                        break;
            }
       }
      
      prevIndex(){
            if(this.nowIndex === 0){
                  this.nowIndex = this.sliders.length - 1;
                  // alert("最后一张");
                  this.state = "changeLast"
            }else{
                  this.nowIndex --;
                  this.state = "normal"
            }
       }
       nextIndex(){
             if(this.nowIndex === this.sliders.length - 1){
                  this.nowIndex = 0;
                  // alert("第一张");
                  this.state = "changeFirst"
             }else{
                   this.nowIndex ++;
                   this.state = "normal"
             }
       }
       toIndex(index){
            this.nowIndex = index;
       }
       // 淡入淡出
       fade(){
            for(var i = 0 , slide ; slide = this.sliders[i++];){
                  slide.style.opacity = 0; 
                  slide.style.transition = "all 1s";
            }
            // console.log("动画");
            this.sliders[this.nowIndex].style.opacity = 1;
       }
       // 滑动;
       slide(){
            // if(this.nowIndex === 0){
            //       this.wrapper.style.transition = "top 1s";
            //       this.wrapper.style.left = 0;
            //       this.nowIndex ++;
            //       setTimeout(function(){
            //             this.slide();
            //       }.bind(this),10)
            // }else{
                  
            // }
      
            // console.log(this.state);
            switch(this.state){
                  case "normal" :
                        this.wrapper.style.left = 0;
                        this.wrapper.style.transition = "left 1s";
                        setTimeout(function(){
                              this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
                        }.bind(this) , 0) 
                        break;
                  case "changeFirst":
                        this.wrapper.style.transition = "top 1s";
                        this.wrapper.style.left = 0;
                        setTimeout(function(){
                              this.nowIndex ++;
                              this.state = "normal";
                              this.slide();
                        }.bind(this),0);
                        break;
                  case "changeLast" :
                        this.wrapper.style.transition = "top 1s";
                        this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
                        setTimeout(function(){
                              this.nowIndex --;
                              this.state = "normal";
                              this.slide();
                        }.bind(this),0)
            }
      
       }
}

 function removeClassName(dom , className){
      // var classString = dom.className;
      // var classReg = new RegExp("\S?"+className);
      // classString = classString.replace(classReg,"");
      // dom.className = classString;
      return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
 }