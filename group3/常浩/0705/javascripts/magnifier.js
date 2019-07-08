class Magnifire{
    //存数据用属性，以及调用初始化函数init
    constructor(){
        this.small_wrapper = $(".small-img");
        this.small_img     = $(".small-img img");
        this.cube          = $(".cube");

        this.big_wrapper   = $(".big-img");
        this.big_img       = $(".big-img img");

        this.img_btn_wrapper = $(".img-btn");
        this.img_btns        = this.img_btn_wrapper.children;

        this.list = [
            {
                bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                jpgsrc  : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            {
                bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                jpgsrc  : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
        ]

        this.small_wrapper_position = getAbsPosition(this.small_wrapper);
        this.cube_size              = getEleSize(this.cube);
        this.small_wrapper_size     = getEleSize(this.small_wrapper);
        this.big_img_size           = getEleSize(this.big_img);
        this.big_wrapper_size       = getEleSize(this.big_wrapper);
        this.init();
    }
    //初始化函数，负责耦合
    init(){
        console.log(1);
        this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
        this.small_wrapper.addEventListener("mouseleave",this.hide.bind(this));
        this.small_wrapper.addEventListener("mousemove",this.handlerMove.bind(this));

        this.img_btn_wrapper.addEventListener("click",delegation(this.changeImg.bind(this),".img-box"))
    }
    //显示
    show(){
        this.cube.style.display = "block";
        this.big_wrapper.style.display = "block";

        this.small_img.style.opacity = 0.3  ;
    }
    // 隐藏
    hide(){
        this.cube.style.display = "none";
        this.big_wrapper.style.display = "none";

        this.small_img.style.opacity = 1  ;
    }
    // 移动
    handlerMove(evt){
        let e = evt || window.event;
        let x = e.pageX - this.small_wrapper_position.left - this.cube_size.width/2 ;
        let y = e.pageY - this.small_wrapper_position.top - this.cube_size.height/2;

        let cube_position = this.boundar(x,y);
        let big_img_positon = this.getBigPosition(cube_position.x,cube_position.y);
        this.move(cube_position,big_img_positon);
    }
    //边界检测
    boundar(x,y){
        x = x <= 0 ? 0 : x;
        let maxX = this.small_wrapper_size.width - this.cube_size.width;
        x = x >= maxX ? maxX : x ;

        y = y <= 0 ? 0 : y;
        let maxY = this.small_wrapper_size.height - this.cube_size.height;
        y = y >= maxY ? maxY : y ;

        return {
            x : x,
            y : y 
        }
    }
    //大图片位置的计算
    getBigPosition(x,y){
        let propx = x/(this.small_wrapper_size.width - this.cube_size.width);
        let bigX     = parseInt(propx *(this.big_img_size.width - this.big_wrapper_size.width));
    
        let propy = y/(this.small_wrapper_size.height - this.cube_size.height);
        let bigY     = parseInt(propy *(this.big_img_size.height - this.big_wrapper_size.height));
        return{
            bigX : bigX,
            bigY : bigY
        }
    }
    //移动时的小图片计算
    move(cube_position,big_img_positon){
        this.cube.style.left     = cube_position.x + "px";
        this.cube.style.top      = cube_position.y + "px";

        this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

        this.big_img.style.left  = -big_img_positon.bigX + "px";
        this.big_img.style.top  = -big_img_positon.bigY + "px";

    }
    //点击是下标的计算 以及切换样式、图片链接地址
    changeImg(evt,ele){
        var index = 0 ;
        for(var i = 0 , btn ; btn = this.img_btns[i++];){
            removeClassName(btn,"active");
            if(ele == this.img_btns[i]){
                index = i ;
            }
        }
        ele.className += " active";

        this.small_img.src = this.list[index].jpgsrc ;
        this.cube.style.backgroundImage = "url("+ this.list[index].jpgsrc + ")";
        this.big_img.src   = this.list[index].bigsrc;
    }
}
new Magnifire();