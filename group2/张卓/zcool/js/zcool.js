var logo = $("#logo")
var daohang = $("#daohang")
var fxxiala = $(".fxxiala")
var xialaList = $(".xiala")
var fangdajing = $("#fangdajing")
var searchBox = $("#searchBox")
var searchJing = $("#searchJing")
var searchCancel = $("#searchCancel")
var searchIpt = $("#searchIpt")
var lunbo = $("#lunbo")
var leftjiantou = $(".leftjiantou")
var rightjiantou = $(".rightjiantou")
var topContext = $(".topcontext")
var boxSelfList = $(".box-self")
var detailInfo = $(".detailedInfoBox")
// console.log(boxSelfList)

var imgs = [
    { path: "https://img.zcool.cn/community/016c785d01aa27a801205e4b719f4d.png@1380w" },
    { path: "https://img.zcool.cn/community/015c135d118a65a801205e4bee1e80.jpg@1380w" },
    { path: "https://img.zcool.cn/community/01afce5d118db9a801213ec207c05f.jpg@1380w" }
]
daohang.addEventListener("click", delegation(handlerClick, "li"))
fxxiala.addEventListener("click", fxerjiClick)
fangdajing.addEventListener("click", changeDaohang)
searchCancel.addEventListener("click", cancelSearch)
lunbo.addEventListener("mouseover", stopLunbo)
lunbo.addEventListener("mouseout", startLunbo)
leftjiantou.addEventListener("click", lunboLeft)
rightjiantou.addEventListener("click", lunboRight)

for (var i = 0, xiala; xiala = xialaList[i++];) {
    //给每一个元素都绑定了事件
    xiala.addEventListener("click", erjiClick)
}

for (var i = 0, boxSelf; boxSelf = boxSelfList[i++];) {

    boxSelf.addEventListener("mouseover", openSelf,true)
    boxSelf.addEventListener("mouseout", closeSelf,true)
    boxSelf.index = i;
}
    detailInfo.addEventListener("mouseenter", continueOpenSelf,true)
    detailInfo.addEventListener("mouseleave", closeSelf,true)
    // console.log(detailInfo)

// for (var i = 0, detailInfo; detailInfo = detailInfoList[i++];) {
//     detailInfo.addEventListener("mouseover", continueOpenSelf)
//     detailInfo.addEventListener("mouseout", closeSelf)
// }

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele
}

function delegation(handlerClick, selector) {
    return function (evt) {
        var e = evt || event;
        var target = e.target || e.srcElement
        var eleList = document.querySelectorAll(selector);
        var _tampTarget = target;
        var targetFamily = []
        while (true) {
            if (_tampTarget == this) {
                break;
            }
            targetFamily.push(_tampTarget);
            _tampTarget = _tampTarget.parentNode;
        }

        for (var i = 0, ele; ele = eleList[i++];) {
            if (targetFamily.length == 1 ? target == ele : targetFamily.indexOf(ele) != -1) {
                handlerClick.call(ele);
                break;
            }
        }
    }
}
//发现的下拉菜单的事件处理函数
function fxerjiClick(evt) {
    var e = evt || event
    e.stopPropagation ? e.stopPropagation() : e.cancleBubble = true;

}
//其余二级菜单的事件处理函数
function erjiClick(evt) {
    var e = evt || event;
    e.stopPropagation ? e.stopPropagation() : e.cancleBubble = true;

}

//所有一级菜单的事件处理函数
function handlerClick() {
    console.log("11")
}

//点击放大镜触发的函数
function changeDaohang(evt) {
    var e = evt || event
    setTimeout(function () {
        daohang.style.display = "none"
        fangdajing.style.display = "none"
    }, 300)
    setTimeout(function () {
        searchBox.style.display = "block"
    }, 260)
}

//搜索关闭
function cancelSearch(evt) {
    setTimeout(function () {
        daohang.style.display = "block"
        fangdajing.style.display = "block"
    }, 300)
    setTimeout(function () {
        searchBox.style.display = "none"
    }, 260)
}

//轮播图
var count = 0;
var lunboTime = null;
function luboChange() {
    lunboTime = setInterval(function () {
        count++
        var c = count % (imgs.length)
        lunbo.src = imgs[c].path
    }, 3000)
}
window.onload = function () {
    luboChange();
}
//鼠标在上面
function stopLunbo() {
    clearInterval(lunboTime);
    lunboTime = null;
} //鼠标移开轮播继续
function startLunbo() {
    luboChange();
}//左右箭头实现左右滚动
function lunboLeft() {
    var c = (--count) % (imgs.length)
    lunbo.src = imgs[c].path
}
function lunboRight() {
    var c = (++count) % (imgs.length)
    lunbo.src = imgs[c].path
}

var t = topContext.offsetTop;
document.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    // console.log(topContext.offsetTop)
    // console.log(scrollTop)
    if (scrollTop > t) {
        topContext.style.position = "fixed"
        topContext.style.top = "0"
    } else {
        topContext.style.position = "static"
    }
}
var openselfInfoTime = null;
//延时延时如果鼠标停留0.5秒后
function openSelf() {
    openselfInfoTime = setTimeout(function () {
        // detailInfo[this.index].style.display = "block"
        detailInfo.style.display = "block"

    }, 500)
}
var closeselfInfoTime = null;
function closeSelf() {
    closeselfInfoTime = setTimeout(function () {
        detailInfo.style.display = "none"
    }, 2000)
    clearTimeout(openselfInfoTime)
    openselfInfoTime = null;
}
function continueOpenSelf(evt){
    // console.log("111")
    // console.log(closeselfInfoTime)
    clearTimeout(closeselfInfoTime)
    detailInfo.style.display = "block";
    var e = evt||event;
    e.stopPropagation?e.stopPropagation():e.cancleBubble = true;
    closeselfInfoTime = null;
}