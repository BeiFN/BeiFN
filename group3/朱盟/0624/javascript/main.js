//进度控制
var ele_speaker = $(".speaker");
var ele_volumeBar = $(".progress-bar");
var ele_volumeDot = $(".progress-dot");
var ele_volumeBg = $(".progress-bg");
var ele_volumePercent = $(".progress-percent");
// 盒子控制
var ele_boxs = $(".sound-box");

var GLOBAL_VOL = {
    x: ele_volumeDot.offsetLeft
}
var GLOBAL_BOX = {
    recordArray: []
}
var imgList = {
    big: "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    mid: "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    smll: "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    no: "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    ball: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1384072887,3621189157&fm=26&gp=0.jpg",
    dot: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=12422190,1095388571&fm=26&gp=0.jpg"

}

// 事件绑定的封装
Node.prototype.on = function (eventType, handler, isCapture) {
    arguments.length > 2 && isCapture ? "" : isCapture = false;
    if (this.addEventListener) {
        this.addEventListener(eventType, handler, isCapture);
    } else if (this.attachEvent) {
        this.attachEvent(eventType, handler);
    } else {
        this["on" + eventType] = handler;
    }
}

// 事件移除的封装
Node.prototype.off = function (eventType, handler) {
    if (this.removeEventListener) {
        this.removeEventListener(eventType, handler);
    } else if (this.detachEvent) {
        this.detachEvent(eventType, handler);
    } else {
        this["on" + eventType] = null;
    }
}




/**
 * 音量区
 * 执行函数句柄
 */

function volDotDownHandler(ev) {
    document.off("mousemove", volDotMoveHandler);
    var e = ev || event;
    console.log("滑动开始");
    document.on("mousemove", volDotMoveHandler);
}

function volDotMoveHandler(ev) {
    var e = ev || event;
    var dotX = e.clientX - GLOBAL_VOL.x;
    // console.log(dotX);
    var percentValue = parseInt((dotX) / 1080 * 100);
    if (percentValue >= 0 && percentValue <= 100) {
        if (percentValue === 0) {
            ele_speaker.style.backgroundImage = "url(" + imgList.no + ")"
        } else if (percentValue > 70 && percentValue <= 100) {
            ele_speaker.style.backgroundImage = "url(" + imgList.big + ")";
        } else if (percentValue > 40 && percentValue <= 70) {
            ele_speaker.style.backgroundImage = "url(" + imgList.mid + ")";
        } else {
            ele_speaker.style.backgroundImage = "url(" + imgList.smll + ")";
        }
        // console.log(percentValue);
        ele_volumeDot.style.left = dotX + "px";
        ele_volumeBg.style.width = percentValue + "%";
        ele_volumePercent.show();
        ele_volumePercent.text(percentValue + "%");
        ele_volumeDot.style.backgroundImage = "url(" + imgList.ball + ")";
    }
}

function volDotUpHandler() {
    document.off("mousemove", volDotMoveHandler);
    ele_volumePercent.hide();
    ele_volumeDot.style.backgroundImage = "url(" + imgList.dot + ")";
    // console.log("滑动结束");
}



/**
 * BOX区
 * 执行函数句柄
 */
function boxDownHandler(ev) {
    document.off("mousemove", boxMoveHandler);
    var e = ev || event;
    var element = e.target || e.srcElement;
    console.log("移动开始");
    document.on("mousemove", boxMoveHandler);
    GLOBAL_BOX.x = e.offsetX;
    GLOBAL_BOX.y = e.offsetY;
    GLOBAL_BOX.box = element;

}

function boxMoveHandler(ev) {
    var e = ev || event;
    var element = GLOBAL_BOX.box;
    var ex = e.clientX - GLOBAL_BOX.x;
    var ey = e.clientY - GLOBAL_BOX.y;
    GLOBAL_BOX.recordArray.push({
        x: ex,
        y: ey,
        ele: element
    })
    element.style.left = ex + "px";
    element.style.top = ey + "px";

    // console.log(ex + "  y:", ey);
}

function boxUpHandler() {
    document.off("mousemove", boxMoveHandler);
    console.log("移动结束");
}

function boxBackHandler(ev) {
    var e = ev || event;
    var element = e.target || e.srcElement;
    var eleParent = element.parentNode;
    var backTimer = Timer(
        function (count) {
            console.log(count);
            console.log(GLOBAL_BOX.recordArray[count - 1]);
            eleParent.style.left = GLOBAL_BOX.recordArray[count - 1].x + "px";
            eleParent.style.top = GLOBAL_BOX.recordArray[count - 1].y + "px";
            if (count - 1 === 0) {
                console.log("回放结束");
                GLOBAL_BOX.recordArray = [{x:0,y:0}];
            }

        },
        GLOBAL_BOX.recordArray.length,
        30
    );


}

function onBoxsMove() {
    for (var i = 0, item; item = ele_boxs[i++];) {
        // console.log(item);
        item.on("mousedown", boxDownHandler);
        item.children[0].on("click", boxBackHandler);
        //    console.log(item.children[0]);
    }
}






ele_volumeDot.addEventListener("mousedown", volDotDownHandler);
document.on("mouseup", volDotUpHandler);
document.on("mouseup", boxUpHandler);
onBoxsMove();


// console.log(document instanceof Node);
// console.dir();