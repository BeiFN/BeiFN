function Banner(selector,options){
    // 当前显示哪个图片;
    this.nowIndex = 0;
    //
    this.state = "normal";

    this.main     = $(selector)
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
            this.pagination_ele === null ?  "" : this.pagination_ele.addEventListener("click" , this.handlerPaginationClick.bind(this))
    
        },
        handlerPaginationClick : function(evt){
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
})