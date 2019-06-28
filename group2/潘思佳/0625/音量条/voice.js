var progressPoint = $("#progress_point");
var progressBar = $("#progress_bar");
var horn = $("#horn");
var progress = $("#progress");

var voiceImgList = {
    "low": "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
};

function $(selector) {
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

function voiceBegin(evt) {
    var e = evt || window.event;
    document.addEventListener("mousemove", _movePoint = movePoint.bind(false, {
        offsetX: e.offsetX
    }));
}

function movePoint(_offsetX, evt) {
    var e = evt || window.event;
    var left = e.clientX - _offsetX.offsetX - progress.offsetLeft;
    left = (left < -15 || left > progress.offsetWidth - 15) ? (left < -15 ? -15 : progress.offsetWidth - 15) : left;
    progressPoint.style.left = left + "px";
    progressBar.style.width = left + 15 + "px";
    var widthPerc = parseInt(((left + 15) / progress.offsetWidth) * 100);
    progress.title = widthPerc + "%";

    changeImg(widthPerc);
}

function changeImg(prop) {
    if (prop === 0) {
        // 静音图标
        horn.style.backgroundImage = "url(" + voiceImgList.mute + ")"
    } else if (prop > 0 && prop < 33) {
        horn.style.backgroundImage = "url(" + voiceImgList.low + ")"
    } else if (prop >= 33 && prop < 66) {
        horn.style.backgroundImage = "url(" + voiceImgList.middle + ")"
    } else {
        horn.style.backgroundImage = "url(" + voiceImgList.hight + ")"
    }
}

function stopDefault(evt) {
    var e = evt || window.event;
    e.preventDefault();
}

function voiceEnd() {
    document.removeEventListener("mousemove", _movePoint);
}

progressPoint.addEventListener("mousedown", voiceBegin);
document.addEventListener("mouseup", voiceEnd);
progress.addEventListener("mousedown", stopDefault);