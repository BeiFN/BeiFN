/**
 * 京东小狗
 * */
let
    dog = document.getElementById("dog"),
    timer1 = null;

function changeDog() {
    clearTimeout(timer1)
    dog.src = "";
    dog.src = "https://upload-images.jianshu.io/upload_images/18597145-f233da723a493823.gif?imageMogr2/auto-orient/strip";
    timer1 = setTimeout(function restoreDog() {
        dog.src = "";
        dog.src = "https://upload-images.jianshu.io/upload_images/18597145-587a633b8d857e61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240";
    }, 5000);
}

dog.addEventListener("mouseenter", changeDog);


/**
 * 二级菜单的隐藏
 */
let
    itmsBox = document.getElementById("itms_box"),
    itmsList = Array.from(itmsBox.children),
    iBMenus = document.getElementById("invisibility_menus"),
    menusList = Array.from(iBMenus.children),
    index1 = 0;

//显示    
function toBlock(index) {
    iBMenus.style.display = "block";
    menusList[index].style.display = "block";
    itmsList[index].style.background = "#d9d9d9";
    iBMenus.onmouseenter = function () {
        iBMenus.style.display = "block";
        menusList[index].style.display = "block";
        itmsList[index].style.background = "#d9d9d9";
    }
}
//消失
function toNone(index) {
    iBMenus.style.display = "none";
    menusList[index].style.display = "none";
    itmsList[index].style.background = "#ffffff";
    iBMenus.onmouseleave = function () {
        iBMenus.style.display = "none";
        menusList[index].style.display = "none";
        itmsList[index].style.background = "#ffffff";
    }
}

//绑定事件
for (let i = 0; i < itmsList.length; i++) {
    itmsList[i].addEventListener("mouseenter", toBlock.bind(this, i));
    itmsList[i].addEventListener("mouseleave", toNone.bind(this, i));
}
// //滑动特效
window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 171) {
        var hehe = scrollTop - 171;
        move(iBMenus, hehe, "top", 4)
    } else {
        move(iBMenus, 0, "top", 4)
    }

}

/**
 * 运动函数
 * @param {运动元素} dom 
 * @param {目标点} target 
 * @param {运动属性} attr 
 * @param {基础值，用来控制速度} base 
 */
function move(dom, target, attr, base) {
    target = target > 0 ? Math.ceil(target) : Math.floor(target);
    var g = getComputedStyle;
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var iNow = attr === "opacity" ? g(dom)[attr] * 100 : parseInt(g(dom)[attr]);
        var speed = (target - iNow) / base;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        iNow += speed;
        dom.style[attr] = attr === "opacity" ? iNow / 100 : iNow + "px";
        iNow === target ? clearInterval(dom.timer) : "";
    }, 50)
}
