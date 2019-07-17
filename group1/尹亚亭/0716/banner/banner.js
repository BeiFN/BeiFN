function Banner(selector,options){
      // 当前显示哪个图片;
      this.nowIndex = 0;
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
 
 $.extend(Banner.prototype,{
      init : function(){
            // 先布局;
            this.layoutAnimate();
            this.layoutPagnination();
      
            // 事件
            $(".button-prev").on("click",$.proxy(this.prevIndex,this));
            $(".button-next").on("click",$.proxy(this.nextIndex,this));

            // 动画;
            $(this.main).on("click",$.proxy(this[this.options.effect],this));
            this.pagination_ele === null ? "" :  $(this.main).on("click",$.proxy(this.changePagination,this));
          
            this.pagination_ele === null ? "" : $(this.pagination_ele).on("click" , $.proxy(this.handlerPaginationClick,this)); 
       },
       handlerPaginationClick : function(evt){
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
       },
       changePagination : function(){
            for(var i = 0 , bullet; bullet = this.pagination_ele.children[i++];){
                  this.removeClassName(bullet , "pagination-bullet-active")
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
            
      },
      layoutPagnination : function(){
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
       },
       // 动画布局;
       layoutAnimate : function(){
            switch(this.options.effect){
                  case "slide" : 
                        this.main.className += " container-slide";
                        var cloneSlide = this.sliders[0].cloneNode(true);
                        this.wrapper.appendChild( cloneSlide );
                        this.sliders = [].slice.call(this.sliders);
                        this.sliders.push(cloneSlide);
                        this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
                        break;
                  case "fade" : 
                        this.main.className += " container-fade";
                        break;
            }
       },
       prevIndex : function(){
            if(this.nowIndex === 0){
                  this.nowIndex = this.sliders.length - 1;
                  // alert("最后一张");
                  this.state = "changeLast"
            }else{
                  this.nowIndex --;
                  this.state = "normal"
            }
       },
       nextIndex : function(){
            if(this.nowIndex === this.sliders.length - 1){
                 this.nowIndex = 0;
                 // alert("第一张");
                 this.state = "changeFirst"
            }else{
                  this.nowIndex ++;
                  this.state = "normal"
            }
      },
      toIndex : function(index){
            this.nowIndex = index;
       },
        // 淡入淡出
       fade : function(){
            for(var i = 0 , slide ; slide = this.sliders[i++];){
                  slide.style.opacity = 0; 
                  slide.style.transition = "all 1s";
            }
            // console.log("动画");
            this.sliders[this.nowIndex].style.opacity = 1;
       },
        // 滑动;
       slide : function(){
            
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
         },

      removeClassName : function(dom , className){
            return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
       }
 })
 
 

 