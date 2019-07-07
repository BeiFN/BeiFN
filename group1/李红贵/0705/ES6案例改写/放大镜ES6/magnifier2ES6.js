

class Magnifier{
    constructor({
        small_wrapper = ".small-img",
        small_img = ".small-img img",
        small_cube =  ".cube",
        big_wrapper =  ".big-img",
        big_img =  ".big-img img",
        img_btn_wrapper = ".img-btn",
        list_i = 0,
        list = [
            {
                src:  "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                src_d:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                // src_x:"https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            },
            {
                src:  "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                src_d:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                // src_x:"https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            },
        ],
    } = {}){

        // // 属性获取，元素选择
        this.small_wrapper = $(small_wrapper);
        this.small_img = $(small_img);
        this.small_cube = $(small_cube);
        this.big_wrapper = $(big_wrapper);
        this.big_img = $(big_img);

        this.img_btn_wrapper = $(img_btn_wrapper);
        this.img_btns = this.img_btn_wrapper.children;
        console.log(this.img_btns);

        this.list = list;
        this.list_i = list_i;
     
        // 获取属性值
        this.small_wrapper_position = getAbsPosition(this.small_wrapper);
        this.small_cube_size = getSize(this.small_cube);
        this.small_wrapper_size = getSize(this.small_wrapper);
        this.big_img_size = getSize(this.big_img);
        this.big_wrapper_size = getSize(this.big_wrapper);

        // 核心方法调用
        this.init();
    };

    init(){
        console.log(this,this.img_btns,this.small_wrapper);
        console.log(35+"init");
        this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
        this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
  
        this.small_wrapper.addEventListener("mousemove" , this.handlerMousemove.bind(this));
  
        // this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImgClick.bind(this) , ".img-box"))
        this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"))
    }
    
    
    changeImg(evt,ele){
            var reg = new RegExp("\\s?"+"active");

            if(reg.test(ele.className)){
                console.log("重复");
                return false;
            };
  
          console.log(ele);
          for(var i = 0 , btn ; btn = this.img_btns[i++];){
              if(btn===ele){
                  this.list_i = i-1;
                  console.log(this.list_i);
              }
                removeClassName(btn,"active");
          }
    
          ele.className += " active";

          this.changeImgs();
    }
    


changeImgs(){
    // this.small_img.src = this.list[this.list_i].src;
    this.small_img.src = this.list[this.list_i].src_d;
    this.small_cube.style.backgroundImage = "url("+ this.list[this.list_i].src_d+")";
    this.big_img.src = this.list[this.list_i].src_d;
}
// changeImgClick(){
//     var e = evt || window.event;
//     var target = e.target || e.srcElement;

//     console.log(target.parentNode,target.parentNode.className);
//     var reg = new RegExp("\\s?"+"active");

//     if(reg.test(target.parentNode.className)){
//         return false;
//     };
//     for(var i = 0;i<this.img_btns.length;i++){
//         if(this.img_btns[i] === target.parentNode){
//             this.list_i = i;
//             this.img_btns[i].className += " active";
//         }else{
//             removeClassName(this.img_btns[i],"active");
//         }
//     }
//     console.log(this.list_i);
//     this.changeImgs();
// };

    show(){
        this.small_cube.style.display  = "block";
        this.big_wrapper.style.display = "block";
        // 增加隐藏效果;
  
        this.small_img.style.opacity = 0.3;
    };
    hide(){
        this.small_cube.style.display  = "none";
        this.big_wrapper.style.display = "none";
  
        this.small_img.style.opacity = 1;
    };
    move(cube_position,big_img_position){
        this.small_cube.style.left = cube_position.x + "px";
        this.small_cube.style.top  = cube_position.y + "px";
  
        this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
  
        this.big_img.style.left = -big_img_position.x + "px";
        this.big_img.style.top  = -big_img_position.y + "px";
    };
    
    handlerMousemove(evt){
        var e = evt || window.event;
        var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
        var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;
  
  
        var cube_position    = this.boundary(x,y);
        var big_img_position = this.getBigPosition(cube_position.x,cube_position.y);
        this.move(cube_position,big_img_position)
    };
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
    };
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
    
}

new Magnifier();