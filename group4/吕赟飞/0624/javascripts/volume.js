var horn = $(".horn");
var pro = $(".progress")
var proBar = $(".progress-bar");
var proPoint = $(".progress-point");

var G = {
    proOffsetLeft: pro.offsetLeft,
    proWidth: pro.offsetWidth,
    volume: {
        "low": "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "high": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    }
}

function $(selector) {
    var ele;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function moveStartHandler(evt) {
    var e = evt || event;
    G.X = e.offsetX;

    document.addEventListener("mousemove", moveVolumeHandler)
}

function moveVolumeHandler(evt) {
    var e = evt || event;
    left = e.clientX - G.X - G.proOffsetLeft;

    left = left < -15 ? -15 : left;
    left = left >= G.proWidth - 15 ? G.proWidth - 15 : left;

    proPoint.style.left = left + "px";

    var prop = changeProgressBarWidth(left);
    pro.title = prop + "%";

    changeVolumeIcon(prop);
}

function changeVolumeIcon(prop) {
    if (prop === 0) {
        horn.style.backgroundImage = "url(" + G.volume.mute + ")";
    } else if (prop < 33) {
        horn.style.backgroundImage = "url(" + G.volume.low + ")";
    } else if (prop < 66) {
        horn.style.backgroundImage = "url(" + G.volume.middle + ")";
    } else {
        horn.style.backgroundImage = "url(" + G.volume.high + ")";
    }
}

function changeProgressBarWidth(_left) {
    proBar.style.width = _left + 15 + "px";
    return parseInt((_left + 15) / G.proWidth * 100);

}

function moveEndHandler() {
    document.removeEventListener("mousemove", moveVolumeHandler)
}


proPoint.addEventListener("mousedown", moveStartHandler)
document.addEventListener("mouseup", moveEndHandler)


pro.onmousedown = function(evt){
    var e = evt || event;
    e.preventDefault();
}







