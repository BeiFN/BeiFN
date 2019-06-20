/***
 * 菜单
 */
var menuSearch = document.getElementById("menu-search"),
    menuUl = document.getElementById("menu-ul"),
    search = document.getElementById("search"),
    searchIpt = document.getElementById("search-ipt"),
    timer1 = null,
    container = document.getElementById("container");

function onClick() {
    clearInterval(timer1)
    move(menuSearch, 100, "opacity", 4);
    move(menuUl, 0, "opacity", 4);
    move(search, 0, "opacity", 4);
    timer1 = setInterval(function () {
        menuSearch.style.display = "block";
        searchIpt.focus();
        menuUl.style.display = "none";
        search.style.display = "none";
    }, 300)
}
function restore() {
    clearInterval(timer1)
    move(menuSearch, 0, "opacity", 4);
    move(menuUl, 100, "opacity", 4);
    move(search, 100, "opacity", 4);
    timer1 = setInterval(function () {
        menuSearch.style.display = "none";
        menuUl.style.display = "inline-block";
        search.style.display = "inline-block";
    }, 300)
}
search.addEventListener("click", onClick)
searchIpt.addEventListener("blur", restore)


/***
 * 轮播图
 */
var banner = document.getElementById("banner"),
    bannerList = banner.children,
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    timer2 = null,
    index = 0,
    length = bannerList.length,
    container = document.getElementById("container");
function init() {
    banner.style.width = 100 * length + "%";
}

function toNext() {
    if (index === length - 1) {
        index = 0;
    } else {
        index++;
    }
    animate("next");
}
function toPrev() {
    if (index === 0) {
        index = length - 1;
    } else {
        index--;
    }
    animate("prev");
}
function toIndex() {

}
function animate(arg) {
    if (index === 0 && arg === "next") {
        banner.style.left = 0;
        index++;
    }
    if (index === length - 1 && arg === "prev") {
        banner.style.left = -(length - 1) * 1130 + "px";
        index--;
    }
    move(banner, -index * 1130, "left", 4);
}
function stopInterval() {
    clearInterval(timer);
}
function startInterval() {
    timer = setInterval(toNext, 3000);
}


prev.addEventListener("click", toPrev);
next.addEventListener("click", toNext);
container.addEventListener("mouseenter", stopInterval);
container.addEventListener("mouseleave", startInterval);
init();
startInterval();



/**
 * 页面主体内容
 */
var str = "",
    contentBox = document.getElementById("content-box");
// var json = [{}];
var k = 20;
for (var i = 0; i < k; i++) {
    str += `<div class="c-box">
    <a href="#">
        <img src="https://img.zcool.cn/community/01dc7a5d020ad5a801205e4b0ee69a.jpg@260w_195h_1c_1e_1o_100sh.jpg"
            alt="">
    </a>
    <div class="c-info">
        <p class="c-info-title">
            <a href="https://www.zcool.com.cn/work/ZMzY3MTE1ODQ=.html">非人哉470-472</a>
        </p>
        <p class="c-info-type">动漫-短篇/四格漫画</p>
        <p class="c-info-item">
            <span class="statistics-view">2340</span>
            <span class="statistics-comment">15</span>
            <span class="statistics-tuijian">151</span>
        </p>
    </div>
    <div class="c-item">
        <span class="c-item-user">
            <a href="#" title="非人哉漫画">
                <img src="https://img.zcool.cn/community/041899585a1dbca801219c77b11bd4.jpg@80w_80h_1c_1e_1o_100sh.jpg"
                    alt="">非人哉漫画</a>
            <div class="author-info">
                <a href="#"><img
                        src="https://img.zcool.cn/community/041899585a1dbca801219c77b11bd4.jpg@80w_80h_1c_1e_1o_100sh.jpg"
                        alt=""></a>
                <p class="personal-info">
                    <a href="#">非人哉漫画</a>
                    <a href="#"><img
                            src="https://static.zcool.cn/z/images/svg/honor_tuijian_designer.svg"
                            alt=""></a>
                </p>
                <span class="position-info">北京&nbsp;|&nbsp;设计爱好</span>
                <ul class="info-num clearfix">
                    <li class="work">
                        <p>创作</p>
                        <a href="#">197</a>
                    </li>
                    <li class="fans">
                        <p>粉丝</p>
                        <a href="#">37349</a>
                    </li>
                </ul>
                <div class="btn-info clearfix">
                    <input type="button" value="关注" class="guanzhu">
                    <input type="button" value="私信" class="sixin">
                </div>
            </div>
        </span>
        <span class="c-item-time">3小时前</span>
    </div>
</div> `
}
contentBox.innerHTML = str;



/**
 * 吸顶菜单 && 回到顶部
 */
var menuSu = document.getElementById("menu-suction"),
    goTop = document.getElementById("goTop");
var bH = document.body.clientHeight,
    cH = document.documentElement.clientHeight;
console.log(bH)
console.log(cH)

window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop,
        sT = document.body.scrollTop;
    if (scrollTop >= 605 || sT >= 605) {
        menuSu.style.position = "fixed";
        menuSu.style.top = 0;
        goTop.style.display = "block";
    } else {
        menuSu.style.position = "static";
        goTop.style.display = "none";
    }
    if (scrollTop > (bH - cH - 270)) {
        goTop.style.position = "absolute";
        goTop.style.bottom = 270 + "px"
    } else {
        goTop.style.position = "fixed";
        goTop.style.bottom = 34 + "px";
    }
}
function goTopF() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
goTop.addEventListener("click", goTopF);

