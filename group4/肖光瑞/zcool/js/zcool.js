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
 * 吸顶菜单
 */
var menuSu = document.getElementById("menu-suction");
window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 600) {
        menuSu.style.position = "fixed";
        menuSu.style.top = 0;
    } else {
        menuSu.style.position = "static";
    }
}

/**
 * 页面主体内容
 */
var str = "",
    contentBox = document.getElementById("content-box");
var json = [
    {
        img_a: "https://www.zcool.com.cn/work/ZMzY3MTQ4MDQ=.html",
        img: "https://img.zcool.cn/community/01d7b75d02129fa801213ec250ca58.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "小芭蕾梳妆台 | 2019年新款原创设计",
        p_type: "工业/产品-家具",
        span_view: "530",
        span_comment: "1",
        span_tuijian: "23",
        user_imga: "https://www.zcool.com.cn/u/14161679",
        user_img: "https://img.zcool.cn/community/012c8c5d021191a801213ec2a84f68.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "筑物",
        user_time: "2小时前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzY3MTE1ODQ=.html",
        img: "https://img.zcool.cn/community/01dc7a5d020ad5a801205e4b0ee69a.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "非人哉470-472",
        p_type: "动漫-短篇/四格漫画",
        span_view: "2561",
        span_comment: "16",
        span_tuijian: "169",
        user_imga: "https://www.zcool.com.cn/u/15146465",
        user_img: "https://img.zcool.cn/community/041899585a1dbca801219c77b11bd4.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "非人哉漫画",
        user_time: "4小时前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzQ5MDIyNzI=.html",
        img: "https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "武术",
        p_type: "纯艺术-速写",
        span_view: "2352",
        span_comment: "15",
        span_tuijian: "201",
        user_imga: "https://www.zcool.com.cn/u/17236968",
        user_img: "https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "MY蚂蚁",
        user_time: "2天前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzQ4ODAzMzY=.html",
        img: "https://img.zcool.cn/community/01046d5ca5967ca801208f8b5d2df5.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "一期一会一梦鱼",
        p_type: "摄影-人像",
        span_view: "1.1万",
        span_comment: "107",
        span_tuijian: "468",
        user_imga: "https://limengyu.zcool.com.cn",
        user_img: "https://img.zcool.cn/community/004cd35950bfc8a8012193a37f8fbc.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "腰果虾仁",
        user_time: "3天前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzQ4Nzc3NjQ=.html",
        img: "https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "不一样的“西游记”",
        p_type: "动漫-短篇/四格漫画",
        span_view: "2.0万",
        span_comment: "86",
        span_tuijian: "1058",
        user_imga: "https://caomuchong.zcool.com.cn",
        user_img: "https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "草木虫",
        user_time: "3天前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzY2NTgzNjQ=.html",
        img: "https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "绽影像之《画匣II》",
        p_type: "摄影-静物",
        span_view: "6238",
        span_comment: "17",
        span_tuijian: "307",
        user_imga: "https://chenzhan.zcool.com.cn/",
        user_img: "https://img.zcool.cn/community/002b175ae7b5e7a801219b7f40d1a3.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "陈绽",
        user_time: "1天前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzY2NTgzNjQ=.html",
        img: "https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "绽影像之《画匣II》",
        p_type: "摄影-静物",
        span_view: "6238",
        span_comment: "17",
        span_tuijian: "307",
        user_imga: "https://chenzhan.zcool.com.cn/",
        user_img: "https://img.zcool.cn/community/002b175ae7b5e7a801219b7f40d1a3.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "陈绽",
        user_time: "1天前"
    },
    {
        img_a: "https://www.zcool.com.cn/work/ZMzY2NTgzNjQ=.html",
        img: "https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "绽影像之《画匣II》",
        p_type: "摄影-静物",
        span_view: "6238",
        span_comment: "17",
        span_tuijian: "307",
        user_imga: "https://chenzhan.zcool.com.cn/",
        user_img: "https://img.zcool.cn/community/002b175ae7b5e7a801219b7f40d1a3.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "陈绽",
        user_time: "1天前"
    }, {
        img_a: "https://www.zcool.com.cn/work/ZMzY2NTgzNjQ=.html",
        img: "https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "绽影像之《画匣II》",
        p_type: "摄影-静物",
        span_view: "6238",
        span_comment: "17",
        span_tuijian: "307",
        user_imga: "https://chenzhan.zcool.com.cn/",
        user_img: "https://img.zcool.cn/community/002b175ae7b5e7a801219b7f40d1a3.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "陈绽",
        user_time: "1天前"
    }, {
        img_a: "https://www.zcool.com.cn/work/ZMzY2NTgzNjQ=.html",
        img: "https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        p_title: "绽影像之《画匣II》",
        p_type: "摄影-静物",
        span_view: "6238",
        span_comment: "17",
        span_tuijian: "307",
        user_imga: "https://chenzhan.zcool.com.cn/",
        user_img: "https://img.zcool.cn/community/002b175ae7b5e7a801219b7f40d1a3.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        user_content: "陈绽",
        user_time: "1天前"
    }
]
for (var i = 0; i < json.length; i++) {
    str += '<div class="c-box">' +
        '<a href="' + json[i].img_a + '" target = "_blank">' +
        '<img src="' + json[i].img + '"alt="">' +
        '</a>' +
        '<div class="c-info">' +
        '<p class="c-info-title">' +
        '<a href="' + json[i].img_a + '" target = "_blank">' + json[i].p_title + '</a>' +
        '</p>' +
        '<p class="c-info-type">' + json[i].p_type + '</p>' +
        '<p class="c-info-item">' +
        '<span class="statistics-view">' + json[i].span_view + '</span>' +
        '<span class="statistics-comment">' + json[i].span_comment + '</span>' +
        '<span class="statistics-tuijian">' + json[i].span_tuijian + '</span>' +
        '</p>' +
        '</div>' +
        '<div class="c-item">' +
        '<span class="c-item-user">' +
        '<a href="' + json[i].user_imga + '" target = "_blank">' +
        '<img src="' + json[i].user_img + '"alt="">' + json[i].user_content +
        '</a>' +
        '</span>' +
        '<span class="c-item-time">' + json[i].user_time + '</span>' +
        '</div>' +
        '</div>'
}

contentBox.innerHTML = str;