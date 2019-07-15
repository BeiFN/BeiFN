class Zoom {

    constructor({
        domin = ".container",
        cube = ".cube",
        bigImg = ".big-img",
        smImg = ".small-img",
        imgbt = ".img-btn",
        imgbox = ".img-box",
    } = {}) {
        this.imgList = [{
            sm_url: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            big_url: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }, {
            sm_url: "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            big_url: "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }]
        // 元素获取 
        this.domin = $(domin);
        this.warpper_smimg = $(smImg);
        this.img_sm = $(smImg + " img");
        this.img_cube = $(cube);
        this.img_l = $(bigImg + " img");
        this.wrapper_limg = $(bigImg);
        this.imgbt = $(imgbt);
        this.imgboxs = $(imgbox);

        this.sizeWarpperSmImg = this.warpper_smimg.getSize();
        this.sizeSmImg = this.img_sm.getSize();
        this.sizeCube = this.img_cube.getSize();
        this.sizeLimg = this.img_l.getSize();
        this.sizeWarpperLImg = this.wrapper_limg.getSize();
        this.posWarpperSmImg = this.warpper_smimg.getAbsPosition();
        // console.log(this.img_sm.getAbsPosition());
        // console.log(cube);
        this.ini();
    }

    ini = function () {
        // 事件绑定
        this.warpper_smimg.addEventListener("mouseenter", this.cubeShow.bind(this));
        this.warpper_smimg.addEventListener("mouseleave", this.cubeHide.bind(this));
        this.warpper_smimg.addEventListener("mousemove", this.moveHandler.bind(this));
        this.imgbt.on("click", this.imgChangeHandler.bind(this), ".img-box")
    }
    imgChangeHandler = function (ev) {
        var e = ev || window.event;
        var ele = e.target || e.srcElement;
        var parent = ele.parentNode;
        // var index=null;
        [].slice.call(this.imgbt.children).forEach((element, index) => {
            element.classRemove("active");
            if (parent === element) {
                var sm = this.imgList[index].sm_url;
                var big = this.imgList[index].big_url;
                this.img_cube.style.backgroundImage = "url(" + sm + ")";
                this.img_sm.src = sm;
                this.img_l.src = big;
            }
        });

        parent.classAdd("active");
        // console.log(ele.src);
        // this.imgList
    }

    cubeShow = function () {
        this.img_cube.show();
        this.wrapper_limg.show();
        this.img_sm.style.opacity = 0.3;
    }
    cubeHide = function () {
        this.img_cube.hide();
    }

    moveHandler = function (ev) {
        var e = ev || window.event;
        var x = e.pageX - this.posWarpperSmImg.left - this.sizeCube.w / 2;
        var y = e.pageY - this.posWarpperSmImg.top - this.sizeCube.h / 2;
        var boundrayPos = this.boundaryVail(x, y);
        this.cubeMoveHandler(boundrayPos.x, boundrayPos.y);
        this.imgBIgMoveHandler(boundrayPos.x, boundrayPos.y);
    }

    cubeMoveHandler = function (x, y) {
        this.img_cube.style.left = x + "px";
        this.img_cube.style.top = y + "px";
        this.img_cube.style.backgroundPosition = -x + "px " + -y + "px";
    }

    imgBIgMoveHandler = function (x, y) {
        var percentX = x / (this.sizeWarpperSmImg.w - this.sizeCube.w);
        var percentY = y / (this.sizeWarpperSmImg.h - this.sizeCube.h);

        var moveX = parseInt(percentX * (this.sizeLimg.w - this.sizeWarpperLImg.w));
        var moveY = parseInt(percentY * (this.sizeLimg.h - this.sizeWarpperLImg.h));
        this.img_l.style.left = -moveX + "px";
        this.img_l.style.top = -moveY + "px";
        return {
            x: moveX,
            y: moveY
        }
    }
    boundaryVail = function (x, y) {
        let {
            w: cubeW,
            h: cubeH
        } = this.sizeCube;
        let {
            w: warpperW,
            h: warpperH
        } = this.sizeWarpperSmImg;

        var maxX = warpperW - cubeW;
        var maxY = warpperH - cubeH;

        x < 0 ? x = 0 : "";
        x > maxX ? x = maxX : "";
        y < 0 ? y = 0 : y;
        y > maxY ? y = maxY : "";
        return {
            x: x,
            y: y
        }
    }

}





new Zoom();