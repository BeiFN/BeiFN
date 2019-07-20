let { $: $$, on, getSize, getAbsPosition, removeClassName } = MyLibs;

function Magnifier() {
    this.smallWrapper = $$(".small-img");
    this.smallImg = $$(".small-img img");
    this.smallCube = $$(".cube")
    this.bigWrapper = $$(".big-img")
    this.bigImg = $$(".big-img img");

    this.imgBtnWrapper = $$(".img-btn");
    this.imgBtns = Array.from(this.imgBtnWrapper.children);

    //获取元素的部分属性值
    //获取
    this.smallWrapperPosition = getAbsPosition(this.smallWrapper);
    this.smallWrapperSize = getSize(this.smallWrapper);
    this.smallCubeSize = getSize(this.smallCube);
    this.bigWrapperSize = getSize(this.bigWrapper);
    this.bigImgSize = getSize(this.bigImg)

    //获取差值
    this.maxSmallX = this.smallWrapperSize.width - this.smallCubeSize.width;
    this.maxSmallY = this.smallWrapperSize.height - this.smallCubeSize.height;

    this.maxBigX = this.bigWrapperSize.width - this.bigImgSize.width;
    this.maxBigY = this.bigWrapperSize.height - this.bigImgSize.height;

    //定义图片列表
    this.imgList = [
        {
            smallImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-d6ba13be1374bd9a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`,
            bigImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-6406652529dc4b3f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`
        },
        {
            smallImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-73271fa7f52f741d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`,
            bigImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-9600502dc6a9b5ec.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`
        }
    ]
    this.init();
}
$.extend(Magnifier.prototype, {
    init: function () {
        on(this.smallWrapper, "mouseenter", this.show.bind(this));
        on(this.smallWrapper, "mouseleave", this.hide.bind(this));
        on(this.smallWrapper, "mousemove", this.hanlderMousemove.bind(this));

        for (let i = 0, ele; ele = this.imgBtns[i]; i++) {
            on(ele, "click", this.changeImg.bind(this, ele, i))
        }
    },
    show: function () {
        this.smallCube.style.display = "block";
        this.bigWrapper.style.display = "block";
        this.smallImg.style.opacity = 0.3;
    },
    hide: function () {
        this.smallCube.style.display = "none";
        this.bigWrapper.style.display = "none";
        this.smallImg.style.opacity = 1;

    },
    move: function (cubePosition, bigImgPosition) {
        this.smallCube.style.left = cubePosition.x + "px";
        this.smallCube.style.top = cubePosition.y + "px";
        this.smallCube.style.backgroundPosition = -cubePosition.x + "px " + -cubePosition.y + "px";

        this.bigImg.style.left = bigImgPosition.x + "px";
        this.bigImg.style.top = bigImgPosition.y + "px";

    },
    hanlderMousemove: function (evt) {
        let e = evt || window.event;
        let [x, y] = [
            e.pageX - this.smallWrapperPosition.left - this.smallCubeSize.width / 2,
            e.pageY - this.smallWrapperPosition.top - this.smallCubeSize.height / 2
        ];
        let cubePosition = this.boundary(x, y);
        let bigImgPosition = this.getBigPosition(cubePosition.x, cubePosition.y)
        this.move(cubePosition, bigImgPosition)
    },

    //边界检测
    boundary: function (x, y) {
        x = x <= 0 ? 0 : x;
        y = y <= 0 ? 0 : y;
        x = x >= this.maxSmallX ? this.maxSmallX : x;
        y = y >= this.maxSmallY ? this.maxSmallY : y;
        return {
            x: x,
            y: y
        }
    },
    //根据比例算出大图位置
    getBigPosition: function (x, y) {
        let [propx, propy] = [
            x / this.maxSmallX,
            y / this.maxSmallY
        ];
        let [bigImgX, bigImgY] = [
            parseInt(propx * this.maxBigX),
            parseInt(propy * this.maxBigY)
        ];
        return {
            x: bigImgX,
            y: bigImgY
        }
    },

    //改变图片
    changeImg: function (ele, index) {
        for (let i = 0, btn; btn = this.imgBtns[i++];) {
            removeClassName(btn, " active");
        }
        ele.className += " active";
        this.smallImg.src = this.imgList[index].smallImgSrc;
        this.bigImg.src = this.imgList[index].bigImgSrc;
        this.smallCube.style.backgroundImage = `url(${this.imgList[index].smallImgSrc})`;
    }
})
new Magnifier()