//ES6放大镜功能实现
//class
class Magnifier{
    constructor(){
        //元素提取
        this.small_wrapper = Magnifier.$(".small-img");
        this.small_img     = Magnifier.$(".small-img img");
        this.cube          = Magnifier.$(".cube");
        this.big_wrapper   = Magnifier.$(".big-img");
        this.big_img       = Magnifier.$(".big-img img");
        this.img_btn       = Magnifier.$(".img-btn");

        //图片列表
        this.picList = {
            iphone : {
                small : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                big   : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            xiaodu : {
                small: "https://img14.360buyimg.com/n1/s450x450_jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg",
                big: "https://img14.360buyimg.com/n0/jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg"
            }
        }

        this.init();
    }
    //元素绑定事件,整合函数
    init(){
        //元素相关数据计算
        this.small_wrapper_position = Magnifier.getAbsPosition(this.small_wrapper);
        // console.log(this.small_wrapper_position);
        this.cube_size        = Magnifier.getSize(this.cube);
        this.small_wrapper_size = Magnifier.getSize(this.small_wrapper);
        this.big_img_size     = Magnifier.getSize(this.big_img);
        this.big_wrapper_size = Magnifier.getSize(this.big_wrapper);

        //鼠标滑入事件
        this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
        //鼠标滑出事件
        this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
        //鼠标滑动事件
        this.small_wrapper.addEventListener("mousemove" , this.handlerMove.bind(this));
        //图片按钮点击事件
        this.img_btn.addEventListener("click" , this.handlerClick.bind(this));
    }

    //图片按钮点击整合函数
    handlerClick(evt){
        let e = evt || event;
        let target = e.target || e.srcElement;

        this.clearBtnClassName();

        for(let i = 0 , btn ; btn = this.img_btn.children[i++];){
            if(btn === target.parentNode){
                this.changePic(btn);
                btn.className += " active";
            }
        }
    }

    //清空除点击按钮意外按钮的样式
    clearBtnClassName(){
        for(var i = 0 , btn ; btn = this.img_btn.children[i++];){
            btn.className = "img-box";
        }
    }

    //点击按钮改变图片
    changePic(ele){
        let img_info = ele.getAttribute("picinfo");
    
        this.small_img.src = this.picList[img_info].small;
        this.big_img.src   = this.picList[img_info].big;
        this.cube.style.backgroundImage = "url("+this.picList[img_info].small+")";
    }

    //鼠标滑入大图片、扫描方框显示函数
    show(){
        this.cube.style.display = "block";
        this.big_wrapper.style.display = "block";

        //鼠标滑入改变小图透明度
        this.small_img.style.opacity = ".3";
    }

    //鼠标滑出大图片、扫描方框隐藏函数
    hide(){
        this.cube.style.diplay = "none";
        this.big_wrapper.style.display = "none";

        //鼠标滑出小图透明度还原
        this.small_img.style.opacity = "1";
    }

    //滑动事件整合函数
    handlerMove(evt){
        let e = evt ||event;
        let x = e.pageX - this.small_wrapper_position.left - this.cube_size.width / 2;
        let y = e.pageY - this.small_wrapper_position.top - this.cube_size.height / 2;
        // console.log(offsetX , offsetY);
        this.cube_position = this.boundary(x , y);
        this.big_img_position = this.getBigPosition();
        // console.log(this.big_img_position);

        this.move(this.cube_position , this.big_img_position);
    }

    //根据小图中显示方框与小图形成比例计算出大图在大框中的位置
    getBigPosition(){
        let prop_x = this.cube_position.x / this.Max_x;
        let prop_y = this.cube_position.y / this.Max_y;

        let big_position = {
            x : (this.big_img_size.width - this.big_wrapper_size.width) * prop_x,
            y : (this.big_img_size.height - this.big_wrapper_size.height) * prop_y
        }

        return big_position;
    }

    //边界检测函数
    boundary(x , y){
        //宽度边界检测
        x = x < 0 ? 0 : x;
        this.Max_x = this.small_wrapper_size.width - this.cube_size.width;
        x = x > this.Max_x ? this.Max_x : x;

        //高度边界检测
        y = y < 0 ? 0 : y;
        this.Max_y = this.small_wrapper_size.height - this.cube_size.height;
        y = y > this.Max_y ? this.Max_y : y;

        return {
            x : x,
            y : y
        }
    }

    //根据鼠标滑动，引发的活动
    move(cube_position , big_img_position){
        this.cube.style.left = cube_position.x + "px";
        this.cube.style.top  = cube_position.y + "px";
        

        this.big_img.style.left = -big_img_position.x + "px";
        this.big_img.style.top  = -big_img_position.y + "px";
        // console.log(big_img_position.x);
        // console.log(big_img_position.y);

        //根据鼠标划入改变cube的背景图片位置
        this.cube.style.backgroundPosition = -this.cube_position.x + "px "+ -cube_position.y + "px";
    }

    //元素提取封装函数
    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }

    static getAbsPosition(ele){
        let position = {
            left : ele.offsetLeft,
            top  : ele.offsetTop
        }
        if(ele.offsetParent === document.body){
            return position;
        }else{
            var pos = this.getAbsPosition(ele.offsetParent);
            return {
                left : ele.offsetLeft + pos.left,
                top  : ele.offsetTop  + pos.top
            }
        }
    }

    static getSize(ele){
        var size = {
            width : parseInt(getComputedStyle(ele)["width"]),
            height: parseInt(getComputedStyle(ele)["height"])
        }
        return size;
    }
}

new Magnifier();