let{getSize, getAbsPosition, removeClassName} = Utils;
function Magnifier(){
    this.init();
}
$.extend(Magnifier.prototype, {
    // 初始化
    init : function(){
        // 获取元素
        this.smallImgWrap = $(".small-img");
        this.smallImg     = $(".small-img img");
        this.smallCube    = $(".cube");
        this.bigImgWrap   = $(".big-img");
        this.bigImg       = $(".big-img img");
        this.imgBtnsWrapper = $(".img-btn");
        this.imgBtns = Array.from(this.imgBtnsWrapper.children);
        // 获取大小
        this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);
        this.smallCubeSize = getSize(this.smallCube);
        this.smallImgWrapSize = getSize(this.smallImgWrap);
        this.bigImgSize = getSize(this.bigImg);
        this.bigImgWrapSize = getSize(this.bigImgWrap);
        // 图片列表
        this.imgList = [
            {
            smallSrc: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigSrc: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            {
            smallSrc: "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigSrc: "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
        ]
        this.smallImgWrap.on("mouseenter", $.proxy(this.show,this));
        this.smallImgWrap.on("mouseleave", $.proxy(this.hide,this));
        this.smallImgWrap.on("mousemove",$.proxy(this.handleMousemove,this));
        for(let i = 0, ele; ele = this.imgBtns[i]; i ++){
            ele.on("click",{ele : ele, i : i},$.proxy(this.changeImg,this));
        }
    },
    // 鼠标移入时显示
    show : function(){
        this.smallCube.style.display = "block";
        this.bigImgWrap.style.display = "block";
        this.smallImg.style.opacity = 0.3;
    },
    // 鼠标移出时隐藏
    hide : function(){
        this.smallCube.style.display = "none";
        this.bigImgWrap.style.display = "none";
        this.smallImg.style.opacity = 1;
    },
    // 鼠标移动处理
    handleMousemove : function(evt){
        let e = evt || window.event;
        let x = e.pageX - this.smallImgWrapPosition.left - this.smallCubeSize.width / 2;
        let y = e.pageY - this.smallImgWrapPosition.top - this.smallCubeSize.height / 2;
        this.smallImgPosition = this.boundary(x, y);
        this.bigImgPosition = this.getBigPosition(this.smallImgPosition);
        this.moveEle(this.smallImgPosition,this.bigImgPosition);
    },
    // 移动物体
    moveEle : function(small, big){
        this.smallCube.style.left = small.x + "px";
        this.smallCube.style.top = small.y + "px";
        this.bigImg.style.left = big.x + "px";
        this.bigImg.style.top = big.y + "px";
        this.smallCube.style.backgroundPosition = -small.x + "px " + -small.y + "px";
    },
    // 边界检测
    boundary : function(x, y){
        x = x < 0 ? 0 : x;
        let xMax = this.smallImgWrapSize.width - this.smallCubeSize.width;
        x = x > xMax ? xMax : x; 
        y = y < 0 ? 0 : y;
        let yMax = this.smallImgWrapSize.height - this.smallCubeSize.height;
        y = y > yMax ? yMax : y;
        return {
            x : x,
            y : y
        }
    },
    // 根据比例计算大图位置
    getBigPosition : function(small){
        // 获取总宽度、高度
        let smallTotalWidth = this.smallImgWrapSize.width - this.smallCubeSize.width;
        let smallTotalHeight = this.smallImgWrapSize.height - this.smallCubeSize.height;
        let bigTotalWidth = this.bigImgSize.width - this.bigImgWrapSize.width;
        let bigTotalHeight = this.bigImgSize.height - this.bigImgWrapSize.height;
        // 通过比例计算位置
        let bigPositionX = -(small.x / smallTotalWidth) * bigTotalWidth;
        let bigPositionY = -(small.y / smallTotalHeight) * bigTotalHeight;
        return {
            x : bigPositionX,
            y : bigPositionY
        }
    },
    // 改变图片
    changeImg : function(ele, index){
        for(let i = 0, btn; btn = this.imgBtns[i++]; ){
            removeClassName(btn, " active");
        }
        ele.className += " active";
        this.smallImg.src = this.imgList[index].smallSrc;
        this.bigImg.src = this.imgList[index].bigSrc;
        this.smallCube.style.backgroundImage = `url(${this.imgList[index].smallSrc})`;
    }
})
new Magnifier();
