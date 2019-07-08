class Magnifier{
    constructor({small_wrapper = ".small-img",small_img=".small-img img",small_cube=".cube",img_btn_wrapper=".img-btn",big_wrapper =".big-img",big_img=".big-img img" }={}){
          // 放属性;
        //   document.addEventListener("click",this.init.bind(this));
    this.small_wrapper  = Magnifier.$(".small-img");
    this.small_img       = Magnifier.$(".small-img img");
    this.small_cube      = Magnifier.$(".cube");
    this.img_btn_wrapper = Magnifier.$(".img-btn");
    this.img_btns        = this.img_btn_wrapper.children;
    // 大图部分;
    this.big_wrapper   = Magnifier.$(".big-img");
    this.big_img       = Magnifier.$(".big-img img");
    // // 获取几个值;

    this.small_wrapper_position = Magnifier.getAbsPosition(this.small_wrapper);
    this.small_cube_size        = Magnifier.getSize(this.small_cube);
    this.small_wrapper_size     = Magnifier.getSize(this.small_wrapper);
    this.big_img_size           = Magnifier.getSize(this.big_img);
    this.big_wrapper_size       = Magnifier.getSize(this.big_wrapper);
    // 核心方法调用 ;
    this.init();
        
    }
    init(){
        //  console.log(this); // document;
    this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));

    this.small_wrapper.addEventListener("mousemove" , this.hanlderMousemove.bind(this));

    // this.img_btn_wrapper.addEventListener("click" , Magnifier.delegation(this.changeImg.bind(this) , ".img-box"))
    }
    show(){
        this.small_cube.style.display  = "block";
        this.big_wrapper.style.display = "block";
    // 增加隐藏效果;

        this.small_img.style.opacity = 0.3;
    }
    hide(){
        this.small_cube.style.display  = "none";
        this.big_wrapper.style.display = "none";

        this.small_img.style.opacity = 1;
    }
    move(cube_position,big_img_position){
        this.small_cube.style.left = cube_position.x + "px";
        this.small_cube.style.top  = cube_position.y + "px";
        this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
        console.log(this.small_cube.style.backgroundPosition);
  //   console.log(cube_position);

        this.big_img.style.left = -big_img_position.x + "px";
        this.big_img.style.top  = -big_img_position.y + "px";
    }
    hanlderMousemove(evt){
        var e = evt || window.event;
        var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
        var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;
    
    
        var cube_position    = this.boundary(x,y);
        var big_img_position = this.getBigPosition(x,y);
        this.move(cube_position,big_img_position)
    }
    boundary(x,y){
        // 计算x,y的值;
        // x最小值
         x = x <= 0 ? 0 : x;
         // x最大值
         var maxX = this.small_wrapper_size.width - this.small_cube_size.width
         x = x >= maxX ? maxX : x;

         y = y <= 0 ? 0 : y;
         var maxY = this.small_wrapper_size.height - this.small_cube_size.height ;
         y = y >= maxY ? maxY : y;

        return {
          x : x,
          y : y
        }
    }
    changeImg(evt,ele){
        for(var i = 0 , btn ; btn = this.img_btns[i++];){
            removeClassName(btn,"active");
      }
  
      ele.className += " active";
    }


    getBigPosition(x,y){
        var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
        var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
        var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
        var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height));

        return {
             x : big_img_x,
            y : big_img_y
        }

    }
    static getAbsPosition(dom){
        var position = {
              left : dom.offsetLeft,
              top  : dom.offsetTop
        }
        if(dom.offsetParent === document.body){
              return position;
        }else{
              var pos = Magnifier.getAbsPosition(dom.offsetParent)
              return {
                    left : dom.offsetLeft + pos.left,
                    top  : dom.offsetTop  + pos.top
              }
        }
    }

    static getSize(dom){
        return {
              width : parseInt( getComputedStyle(dom)["width"] ),
              height : parseInt( getComputedStyle(dom)["height"] ) 
        }
    }
    
    static $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }
    
    static delegation( handlerClick , selector ){
        return function(evt){
              var e = evt || window.event;
              var target = e.target || e.srcElement;
              var eleList = this.querySelectorAll(selector);
              var targetFamily = [];
              var _tempTarget = target;
              var count = 0;
              while(true && count ++ < 100){
                    if(_tempTarget === this || _tempTarget === null){
                          break;
                    }
                    targetFamily.push(_tempTarget);
                    _tempTarget = _tempTarget.parentNode;
              }
              for(var i = 0 , ele ; ele = eleList[i++]; ){
                    if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                          handlerClick.call(ele , e , ele);
                          break;
                    }
              }
        }
    }
    
    static removeClassName(dom , className){
        // var classString = dom.className;
        // var classReg = new RegExp("\S?"+className);
        // classString = classString.replace(classReg,"");
        // dom.className = classString;
        return dom.className = dom.className.replace(new RegExp("\s?"+className) , "" );
    }
}
    
    
new Magnifier();





