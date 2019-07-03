// 1. 点击按钮翻页
    // 2.点击分页器分页
    // 3.多种动画效果
    // 4.自动播放


    // 1、元素绑定事件
 // 2. options => effect : fade | slide 
 //    1. 影响基础布局;
 //    2. 影响动画效果;

    // selector选择元素的根本选择器                           事件！！！
    function Banner(selector,opations){
       

        this.nowIndex = 0;   //当前显示元素图片

       //  选择是一个整体   大长条包裹小部分
       this.main = document.querySelector(selector);  //核心元素
       this.sliders = this.main.querySelectorAll(".slide");//在main中选择
       this.btn_prev = this.main.querySelector(".button-prev");
       this.btn_next = this.main.querySelector(".button-next");
      
// 判定有没有options传入
       if(arguments.length ===1){
           this.opations = {
               effect:"slide"
           }
       }

       this.init();  //init绑定事件    
       // 构造函数：获取元素，创建属性
    }
    
//  调用当前示例上的init方法
    Banner.prototype.init = function(){


    //    this.main.className +=" container-fade";

    //   布局
    this.layout();

       this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
       this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    
       //    动画
       this.main.addEventListener("click",this.animate.bind(this));
    }

Banner.prototype.layout = function(){
    switch(this.opations.effect){
        case "slide":this.main.className +=" container-fade";
        case "fade":this.main.className +=" container-fade";
        break;

    }
}


    Banner.prototype.prevIndex = function(){
      
       // 设置边界值
       if(this.nowIndex ===0){
           this.nowIndex = this.sliders.length - 1;
       }else{
           this.nowIndex --;
       }
    }
    Banner.prototype.nextIndex = function(){
        if(this.nowIndex === this.sliders.length - 1){
            this.nowIndex = 0;
        }else{
            this.nowIndex ++;
        }
    }

    Banner.prototype.animate = function(){
        
          for(var i=0,slide;slide=this.sliders[i++];){
                // slide.style.opacity = 0;
                // slide.style.transition = "all 1s";
                slide.style.display = "none";
          }
             this.sliders[this.nowIndex].style.display = "block";
        //   this.sliders[this.nowIndex].style.opacity = 1;
    }

    