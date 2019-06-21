/**
 * 搜索框的显示隐藏
 */
var search = document.getElementById("search"),
    nav = document.getElementById("nav"),
    searchHide = document.getElementById("search-hide"),
    searchInput = document.getElementById("search-input");
function searchShow(){
    nav.style.display = "none";
    searchHide.style.display = "block"; 
    searchHide.style.top = "56px"; 
    search.style.display = "none";
    searchInput.focus();
}
function searchExit(){
    searchHide.style.display = "none";
    nav.style.display = "block";
    search.style.display = "block";
}
search.addEventListener("click",searchShow);
searchInput.addEventListener("blur",searchExit);

/**
 * 轮播图
 */
var bannerBox = document.getElementById("banner-box"),
    bannerContainer = document.getElementById("banner-container"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    bannerList = Array.from(bannerBox.children),
    index = 0,
    timer = null;
function prevImg(){
    if(index == 0){
        bannerBox.style.transition = "0s";
        index = bannerList.length - 1;
        bannerBox.style.left = -1130 * index + "px";
    }
    setTimeout(function(){
        index--;
        moveImg();
    },10);
}
function nextImg(){
    if(index == bannerList.length - 1){   
        bannerBox.style.transition = "0s";
        bannerBox.style.left = 0;
        index = 0;  
    }
    setTimeout(function(){
        index++;
        moveImg(); 
    },10);  
}
function moveImg(){
    bannerBox.style.transition = "1s";
    bannerBox.style.left = -1130 * index + "px";
}
function stopInterval(){
    clearInterval(timer);
}
function openInterval(){
    clearInterval(timer);
    timer = setInterval(nextImg,2000);
}
openInterval();
bannerContainer.addEventListener("mouseover",stopInterval);
bannerContainer.addEventListener("mouseout",openInterval);
prev.addEventListener("click",prevImg);
next.addEventListener("click",nextImg);

/**
 * 顶部悬浮子导航
 */
var subNav = document.getElementById("in-top");

window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 570){
        subNav.style.position = "fixed";
    }else{
        subNav.style.position = "static";
    }
}

/**
 * 拼接字符串
 */
var mainBox = document.getElementById("main-box");
var json1 =[
    {
        "id": 9006209,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "午夜“凶”猫，背后发凉",
        "cover": "https://img.zcool.cn/community/016c4b5cde5457a801214168811326.jpg",
        "cover1x": "https://img.zcool.cn/community/016c4b5cde5457a801214168811326.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/016c4b5cde5457a801214168811326.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYwMjQ4MzY=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "动漫",
        "subCateStr": "中/长篇漫画",
        "publishTime": "May 17, 2019 2:48:10 PM",
        "publishTimeDiffStr": "27天前",
        "timeTitleStr": "审核通过时间：2019-05-17 14:48:10；创建时间：2019-05-17 14:26:54",
        "designTime": "May 17, 2019 2:27:37 PM",
        "recommend": 0,
        "status": 1,
        "viewCount": 24770,
        "commentCount": 72,
        "favoriteCount": 0,
        "recommendCount": 1304,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2.5万",
        "commentCountStr": "72",
        "favoriteCountStr": "0",
        "recommendCountStr": "1304",
        "favoriteStatus": 0,
        "creator": 272743,
        "creatorObj": {
            "id": 272743,
            "status": 1,
            "username": "插画师白茶",
            "pageUrl": "https://doudouliyoutang.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/00e5dc5a531fc3a80120c2b089b262.jpg",
            "avatar1x": "https://img.zcool.cn/community/00e5dc5a531fc3a80120c2b089b262.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/00e5dc5a531fc3a80120c2b089b262.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 1
        },
        "eventId": 0,
        "cate": 608,
        "subCate": 629,
        "createTime": "May 17, 2019 2:26:54 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9147495,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "LOGO",
        "cover": "https://img.zcool.cn/community/0113995cfca43aa801205e4b770b3b.jpg",
        "cover1x": "https://img.zcool.cn/community/0113995cfca43aa801205e4b770b3b.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0113995cfca43aa801205e4b770b3b.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1ODk5ODA=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "品牌",
        "publishTime": "Jun 9, 2019 4:07:44 PM",
        "publishTimeDiffStr": "4天前",
        "timeTitleStr": "审核通过时间：2019-06-09 16:07:44；创建时间：2019-06-09 14:11:28",
        "designTime": "Jun 9, 2019 2:18:06 PM",
        "recommend": 2,
        "recommendTime": "Jun 10, 2019 10:10:33 AM",
        "status": 1,
        "viewCount": 4366,
        "commentCount": 56,
        "favoriteCount": 0,
        "recommendCount": 152,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "4366",
        "commentCountStr": "56",
        "favoriteCountStr": "0",
        "recommendCountStr": "152",
        "favoriteStatus": 0,
        "creator": 15790714,
        "creatorObj": {
            "id": 15790714,
            "status": 1,
            "username": "小酥弥",
            "pageUrl": "https://www.zcool.com.cn/u/15790714",
            "avatar": "https://img.zcool.cn/community/0140255cfb46d1a801205e4b11837a.jpg",
            "avatar1x": "https://img.zcool.cn/community/0140255cfb46d1a801205e4b11837a.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/0140255cfb46d1a801205e4b11837a.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 15,
        "createTime": "Jun 9, 2019 2:11:28 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 242717,
        "objectType": 8,
        "objectTypeStr": "文章",
        "title": "【春哥课堂】速写到底该怎么画？终于解决了我多年的困惑！",
        "cover": "https://img.zcool.cn/community/0158a95cfb21d0a801213ec211cfb3.jpg",
        "cover1x": "https://img.zcool.cn/community/0158a95cfb21d0a801213ec211cfb3.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0158a95cfb21d0a801213ec211cfb3.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/article/ZOTcwODY4.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "教程",
        "subCateStr": "多领域",
        "publishTime": "Jun 6, 2019 9:08:07 PM",
        "publishTimeDiffStr": "7天前",
        "timeTitleStr": "审核通过时间：2019-06-06 21:08:07；创建时间：2019-06-06 19:42:51",
        "recommend": 2,
        "recommendTime": "Jun 8, 2019 10:47:58 AM",
        "status": 1,
        "viewCount": 2426,
        "commentCount": 11,
        "favoriteCount": 0,
        "recommendCount": 184,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2426",
        "commentCountStr": "11",
        "favoriteCountStr": "0",
        "recommendCountStr": "184",
        "favoriteStatus": 0,
        "creator": 2656388,
        "creatorObj": {
            "id": 2656388,
            "status": 1,
            "username": "画画的春哥",
            "pageUrl": "https://www.zcool.com.cn/u/2656388",
            "avatar": "https://img.zcool.cn/community/00ff0a5b2e067ca80120b959b01552.jpg",
            "avatar1x": "https://img.zcool.cn/community/00ff0a5b2e067ca80120b959b01552.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/00ff0a5b2e067ca80120b959b01552.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 695,
        "subCate": 0,
        "createTime": "Jun 6, 2019 7:42:51 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9081216,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "小箐烩品牌形象",
        "cover": "https://img.zcool.cn/community/01b8455cee003aa80121a470c2a81f.jpg",
        "cover1x": "https://img.zcool.cn/community/01b8455cee003aa80121a470c2a81f.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01b8455cee003aa80121a470c2a81f.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYzMjQ4NjQ=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "品牌",
        "publishTime": "May 29, 2019 11:48:32 AM",
        "publishTimeDiffStr": "15天前",
        "timeTitleStr": "审核通过时间：2019-05-29 11:48:32；创建时间：2019-05-29 11:37:11",
        "designTime": "May 29, 2019 11:45:10 AM",
        "recommend": 0,
        "status": 1,
        "viewCount": 18906,
        "commentCount": 0,
        "favoriteCount": 0,
        "recommendCount": 0,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "1.9万",
        "commentCountStr": "0",
        "favoriteCountStr": "0",
        "recommendCountStr": "0",
        "favoriteStatus": 0,
        "creator": 16153868,
        "creatorObj": {
            "id": 16153868,
            "status": 1,
            "username": "格局视界华裔设计",
            "pageUrl": "https://www.zcool.com.cn/u/16153868",
            "avatar": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg",
            "avatar1x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 15,
        "createTime": "May 29, 2019 11:37:11 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9074161,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "Medo电子烟弹包装",
        "cover": "https://img.zcool.cn/community/01288e5cee0990a801209aa0601f67.jpg",
        "cover1x": "https://img.zcool.cn/community/01288e5cee0990a801209aa0601f67.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01288e5cee0990a801209aa0601f67.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYyOTY2NDQ=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "包装",
        "publishTime": "May 29, 2019 1:53:51 PM",
        "publishTimeDiffStr": "15天前",
        "timeTitleStr": "审核通过时间：2019-05-29 13:53:51；创建时间：2019-05-28 14:01:37",
        "designTime": "May 29, 2019 12:24:50 PM",
        "recommend": 0,
        "status": 1,
        "viewCount": 18462,
        "commentCount": 0,
        "favoriteCount": 0,
        "recommendCount": 1,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "1.8万",
        "commentCountStr": "0",
        "favoriteCountStr": "0",
        "recommendCountStr": "1",
        "favoriteStatus": 0,
        "creator": 16153868,
        "creatorObj": {
            "id": 16153868,
            "status": 1,
            "username": "格局视界华裔设计",
            "pageUrl": "https://www.zcool.com.cn/u/16153868",
            "avatar": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg",
            "avatar1x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 9,
        "createTime": "May 28, 2019 2:01:37 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9140765,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "餐饮品牌设计 | 粤鱼长片港式传统小食复古怀旧可乐",
        "cover": "https://img.zcool.cn/community/0189255cf9f321a801213ec2741ab6.jpg",
        "cover1x": "https://img.zcool.cn/community/0189255cf9f321a801213ec2741ab6.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0189255cf9f321a801213ec2741ab6.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1NjMwNjA=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "品牌",
        "publishTime": "Jun 7, 2019 7:00:35 PM",
        "publishTimeDiffStr": "6天前",
        "timeTitleStr": "审核通过时间：2019-06-07 19:00:35；创建时间：2019-06-07 13:10:53",
        "designTime": "Jun 7, 2019 1:16:42 PM",
        "recommend": 2,
        "recommendTime": "Jun 7, 2019 7:35:51 PM",
        "status": 1,
        "viewCount": 4601,
        "commentCount": 9,
        "favoriteCount": 0,
        "recommendCount": 105,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "4601",
        "commentCountStr": "9",
        "favoriteCountStr": "0",
        "recommendCountStr": "105",
        "favoriteStatus": 0,
        "creator": 2263630,
        "creatorObj": {
            "id": 2263630,
            "status": 1,
            "username": "米饭馆",
            "pageUrl": "https://www.zcool.com.cn/u/2263630",
            "avatar": "https://img.zcool.cn/community/04569359268353b5b3086ed476413b.jpg",
            "avatar1x": "https://img.zcool.cn/community/04569359268353b5b3086ed476413b.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/04569359268353b5b3086ed476413b.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 1
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 15,
        "createTime": "Jun 7, 2019 1:10:53 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9086858,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "随手拍丨iQunix F60 机械键盘",
        "cover": "https://img.zcool.cn/community/0172a55ceeb9e4a80121a47040f758.jpg",
        "cover1x": "https://img.zcool.cn/community/0172a55ceeb9e4a80121a47040f758.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0172a55ceeb9e4a80121a47040f758.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYzNDc0MzI=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "摄影",
        "subCateStr": "产品",
        "publishTime": "May 30, 2019 9:24:15 AM",
        "publishTimeDiffStr": "14天前",
        "timeTitleStr": "审核通过时间：2019-05-30 09:24:15；创建时间：2019-05-30 00:55:47",
        "designTime": "Jan 9, 2019 8:00:00 AM",
        "recommend": 1,
        "recommendTime": "May 30, 2019 11:14:37 AM",
        "status": 1,
        "viewCount": 20113,
        "commentCount": 0,
        "favoriteCount": 0,
        "recommendCount": 10,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2.0万",
        "commentCountStr": "0",
        "favoriteCountStr": "0",
        "recommendCountStr": "10",
        "favoriteStatus": 0,
        "creator": 14230415,
        "creatorObj": {
            "id": 14230415,
            "status": 1,
            "username": "白底图",
            "pageUrl": "https://baiditu.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/01fe675c8deb98a801208f8b5f1bfa.jpg",
            "avatar1x": "https://img.zcool.cn/community/01fe675c8deb98a801208f8b5f1bfa.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/01fe675c8deb98a801208f8b5f1bfa.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 33,
        "subCate": 686,
        "createTime": "May 30, 2019 12:55:47 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9112469,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "区块链钱包-视觉设计",
        "cover": "https://img.zcool.cn/community/01b4445cf49042a801213ec2a40336.jpg",
        "cover1x": "https://img.zcool.cn/community/01b4445cf49042a801213ec2a40336.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01b4445cf49042a801213ec2a40336.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY0NDk4NzY=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "UI",
        "subCateStr": "APP界面",
        "publishTime": "Jun 3, 2019 1:57:34 PM",
        "publishTimeDiffStr": "10天前",
        "timeTitleStr": "审核通过时间：2019-06-03 13:57:34；创建时间：2019-06-03 11:12:29",
        "designTime": "Jun 3, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 5, 2019 9:31:12 PM",
        "status": 1,
        "viewCount": 3759,
        "commentCount": 23,
        "favoriteCount": 0,
        "recommendCount": 195,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "3759",
        "commentCountStr": "23",
        "favoriteCountStr": "0",
        "recommendCountStr": "195",
        "favoriteStatus": 0,
        "creator": 13398703,
        "creatorObj": {
            "id": 13398703,
            "status": 1,
            "username": "弗洛伊德晓志",
            "pageUrl": "https://bertm.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/00dd935a5eec4ea8012113c7766b5f.jpg",
            "avatar1x": "https://img.zcool.cn/community/00dd935a5eec4ea8012113c7766b5f.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/00dd935a5eec4ea8012113c7766b5f.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 17,
        "subCate": 757,
        "createTime": "Jun 3, 2019 11:12:29 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9081038,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "海报「大杂烩」",
        "cover": "https://img.zcool.cn/community/018a105cedfe2ea80121a4704729b0.jpg",
        "cover1x": "https://img.zcool.cn/community/018a105cedfe2ea80121a4704729b0.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/018a105cedfe2ea80121a4704729b0.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYzMjQxNTI=.html",
        "type": 2,
        "typeStr": "临摹",
        "cateStr": "平面",
        "subCateStr": "海报",
        "publishTime": "May 29, 2019 11:39:21 AM",
        "publishTimeDiffStr": "15天前",
        "timeTitleStr": "审核通过时间：2019-05-29 11:39:21；创建时间：2019-05-29 11:19:38",
        "designTime": "May 29, 2019 11:36:27 AM",
        "recommend": 0,
        "status": 1,
        "viewCount": 17775,
        "commentCount": 0,
        "favoriteCount": 0,
        "recommendCount": 2,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "1.8万",
        "commentCountStr": "0",
        "favoriteCountStr": "0",
        "recommendCountStr": "2",
        "favoriteStatus": 0,
        "creator": 16153868,
        "creatorObj": {
            "id": 16153868,
            "status": 1,
            "username": "格局视界华裔设计",
            "pageUrl": "https://www.zcool.com.cn/u/16153868",
            "avatar": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg",
            "avatar1x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/03181dd5c3f02bca801203d22ff8dd2.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 10,
        "createTime": "May 29, 2019 11:19:38 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9132242,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "云音乐banner（选）",
        "cover": "https://img.zcool.cn/community/0122165cf7d447a801205e4b9db9fe.jpg",
        "cover1x": "https://img.zcool.cn/community/0122165cf7d447a801205e4b9db9fe.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0122165cf7d447a801205e4b9db9fe.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1Mjg5Njg=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "网页",
        "subCateStr": "Banner/广告图",
        "publishTime": "Jun 6, 2019 12:54:41 AM",
        "publishTimeDiffStr": "7天前",
        "timeTitleStr": "审核通过时间：2019-06-06 00:54:41；创建时间：2019-06-05 21:50:16",
        "designTime": "Jun 5, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 6, 2019 11:34:01 AM",
        "status": 1,
        "viewCount": 7169,
        "commentCount": 11,
        "favoriteCount": 0,
        "recommendCount": 155,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "7169",
        "commentCountStr": "11",
        "favoriteCountStr": "0",
        "recommendCountStr": "155",
        "favoriteStatus": 0,
        "creator": 15594863,
        "creatorObj": {
            "id": 15594863,
            "status": 1,
            "username": "GWJ_lLL",
            "pageUrl": "https://www.zcool.com.cn/u/15594863",
            "avatar": "https://img.zcool.cn/community/01b43a5cf7e60fa801213ec2136585.jpg",
            "avatar1x": "https://img.zcool.cn/community/01b43a5cf7e60fa801213ec2136585.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/01b43a5cf7e60fa801213ec2136585.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 607,
        "subCate": 619,
        "createTime": "Jun 5, 2019 9:50:16 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 242731,
        "objectType": 8,
        "objectTypeStr": "文章",
        "title": "搭建知识体系快速习得设计技能——设计知识为什么学不好记不住",
        "cover": "https://img.zcool.cn/community/019ab25cf9e9e5a801213ec24feb6d.jpg",
        "cover1x": "https://img.zcool.cn/community/019ab25cf9e9e5a801213ec24feb6d.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/019ab25cf9e9e5a801213ec24feb6d.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/article/ZOTcwOTI0.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "观点",
        "subCateStr": "多领域",
        "publishTime": "Jun 8, 2019 12:39:54 AM",
        "publishTimeDiffStr": "5天前",
        "timeTitleStr": "审核通过时间：2019-06-08 00:39:54；创建时间：2019-06-07 12:35:03",
        "recommend": 2,
        "recommendTime": "Jun 8, 2019 10:35:54 AM",
        "status": 1,
        "viewCount": 2391,
        "commentCount": 6,
        "favoriteCount": 0,
        "recommendCount": 62,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2391",
        "commentCountStr": "6",
        "favoriteCountStr": "0",
        "recommendCountStr": "62",
        "favoriteStatus": 0,
        "creator": 14175491,
        "creatorObj": {
            "id": 14175491,
            "status": 1,
            "username": "南青的青",
            "pageUrl": "https://www.zcool.com.cn/u/14175491",
            "avatar": "https://img.zcool.cn/community/0083075b3d841ba80121b994cdaadf.jpg",
            "avatar1x": "https://img.zcool.cn/community/0083075b3d841ba80121b994cdaadf.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/0083075b3d841ba80121b994cdaadf.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 707,
        "subCate": 0,
        "createTime": "Jun 7, 2019 12:35:03 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9152202,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "创客APP设计改版",
        "cover": "https://img.zcool.cn/community/01be3a5cfdcdb0a801213ec215b93e.jpg",
        "cover1x": "https://img.zcool.cn/community/01be3a5cfdcdb0a801213ec215b93e.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01be3a5cfdcdb0a801213ec215b93e.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY2MDg4MDg=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "UI",
        "subCateStr": "APP界面",
        "publishTime": "Jun 10, 2019 12:51:46 PM",
        "publishTimeDiffStr": "3天前",
        "timeTitleStr": "审核通过时间：2019-06-10 12:51:46；创建时间：2019-06-10 11:25:29",
        "designTime": "Jun 10, 2019 11:47:55 AM",
        "recommend": 2,
        "recommendTime": "Jun 10, 2019 3:19:55 PM",
        "status": 1,
        "viewCount": 3396,
        "commentCount": 7,
        "favoriteCount": 0,
        "recommendCount": 60,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "3396",
        "commentCountStr": "7",
        "favoriteCountStr": "0",
        "recommendCountStr": "60",
        "favoriteStatus": 0,
        "creator": 14516196,
        "creatorObj": {
            "id": 14516196,
            "status": 1,
            "username": "vicee",
            "pageUrl": "https://www.zcool.com.cn/u/14516196",
            "avatar": "https://img.zcool.cn/community/002c415b1213ada801212d57901bff.jpg",
            "avatar1x": "https://img.zcool.cn/community/002c415b1213ada801212d57901bff.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/002c415b1213ada801212d57901bff.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 17,
        "subCate": 757,
        "createTime": "Jun 10, 2019 11:25:29 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9139326,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "蓝色的夜里",
        "cover": "https://img.zcool.cn/community/014b165cf92a5ea801213ec2c5a278.jpg",
        "cover1x": "https://img.zcool.cn/community/014b165cf92a5ea801213ec2c5a278.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/014b165cf92a5ea801213ec2c5a278.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1NTczMDQ=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "插画",
        "subCateStr": "商业插画",
        "publishTime": "Jun 6, 2019 11:46:52 PM",
        "publishTimeDiffStr": "6天前",
        "timeTitleStr": "审核通过时间：2019-06-06 23:46:52；创建时间：2019-06-06 22:45:42",
        "designTime": "Jun 6, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 7, 2019 6:59:58 AM",
        "status": 1,
        "viewCount": 2460,
        "commentCount": 15,
        "favoriteCount": 0,
        "recommendCount": 220,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2460",
        "commentCountStr": "15",
        "favoriteCountStr": "0",
        "recommendCountStr": "220",
        "favoriteStatus": 0,
        "creator": 14863990,
        "creatorObj": {
            "id": 14863990,
            "status": 1,
            "username": "猫矮_MAOI",
            "pageUrl": "https://maoiaoi.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/0010e7598098460000002129d16744.jpg",
            "avatar1x": "https://img.zcool.cn/community/0010e7598098460000002129d16744.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/0010e7598098460000002129d16744.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 1,
        "subCate": 2,
        "createTime": "Jun 6, 2019 10:45:42 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9152470,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "和自己对话",
        "cover": "https://img.zcool.cn/community/01d6e75cfdd4ffa801213ec289a333.jpg",
        "cover1x": "https://img.zcool.cn/community/01d6e75cfdd4ffa801213ec289a333.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01d6e75cfdd4ffa801213ec289a333.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY2MDk4ODA=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "插画",
        "subCateStr": "商业插画",
        "publishTime": "Jun 10, 2019 1:00:43 PM",
        "publishTimeDiffStr": "3天前",
        "timeTitleStr": "审核通过时间：2019-06-10 13:00:43；创建时间：2019-06-10 11:48:16",
        "designTime": "Jun 10, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 11, 2019 11:34:31 AM",
        "status": 1,
        "viewCount": 3004,
        "commentCount": 12,
        "favoriteCount": 0,
        "recommendCount": 248,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "3004",
        "commentCountStr": "12",
        "favoriteCountStr": "0",
        "recommendCountStr": "248",
        "favoriteStatus": 0,
        "creator": 558111,
        "creatorObj": {
            "id": 558111,
            "status": 1,
            "username": "饭太稀Fan",
            "pageUrl": "https://showfantasy.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/042ae95976d12ca8012193a3edc9e2.jpg",
            "avatar1x": "https://img.zcool.cn/community/042ae95976d12ca8012193a3edc9e2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/042ae95976d12ca8012193a3edc9e2.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 1,
        "subCate": 2,
        "createTime": "Jun 10, 2019 11:48:16 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9133550,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "BLACKDOGGY近期作品整理",
        "cover": "https://img.zcool.cn/community/01efd65cf86acaa801205e4b8b45eb.jpg",
        "cover1x": "https://img.zcool.cn/community/01efd65cf86acaa801205e4b8b45eb.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01efd65cf86acaa801205e4b8b45eb.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1MzQyMDA=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "插画",
        "subCateStr": "其他插画",
        "publishTime": "Jun 6, 2019 9:41:16 AM",
        "publishTimeDiffStr": "7天前",
        "timeTitleStr": "审核通过时间：2019-06-06 09:41:16；创建时间：2019-06-06 09:09:19",
        "designTime": "Jun 6, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 6, 2019 12:00:36 PM",
        "status": 1,
        "viewCount": 2655,
        "commentCount": 18,
        "favoriteCount": 0,
        "recommendCount": 156,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2655",
        "commentCountStr": "18",
        "favoriteCountStr": "0",
        "recommendCountStr": "156",
        "favoriteStatus": 0,
        "creator": 14490296,
        "creatorObj": {
            "id": 14490296,
            "status": 1,
            "username": "BLACKDOGGY",
            "pageUrl": "https://blackdoggy.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/03139395c4f1d6ba801203d227cc0b7.jpg",
            "avatar1x": "https://img.zcool.cn/community/03139395c4f1d6ba801203d227cc0b7.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/03139395c4f1d6ba801203d227cc0b7.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 1,
        "subCate": 292,
        "createTime": "Jun 6, 2019 9:09:19 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9160158,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "三例英文logo设计&品牌提案",
        "cover": "https://img.zcool.cn/community/0139ac5cff27d0a801205e4bccbc81.jpg",
        "cover1x": "https://img.zcool.cn/community/0139ac5cff27d0a801205e4bccbc81.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0139ac5cff27d0a801205e4bccbc81.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY2NDA2MzI=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "品牌",
        "publishTime": "Jun 11, 2019 12:26:29 PM",
        "publishTimeDiffStr": "2天前",
        "timeTitleStr": "审核通过时间：2019-06-11 12:26:29；创建时间：2019-06-11 11:42:26",
        "designTime": "Jun 11, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 11, 2019 1:28:03 PM",
        "status": 1,
        "viewCount": 10228,
        "commentCount": 28,
        "favoriteCount": 0,
        "recommendCount": 134,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "1.0万",
        "commentCountStr": "28",
        "favoriteCountStr": "0",
        "recommendCountStr": "134",
        "favoriteStatus": 0,
        "creator": 440859,
        "creatorObj": {
            "id": 440859,
            "status": 1,
            "username": "刘兵克",
            "pageUrl": "https://liubingke.zcool.com.cn",
            "avatar": "https://img.zcool.cn/community/01e3af5c7dcdc4a801213f26f64210.jpg",
            "avatar1x": "https://img.zcool.cn/community/01e3af5c7dcdc4a801213f26f64210.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/01e3af5c7dcdc4a801213f26f64210.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 15,
        "createTime": "Jun 11, 2019 11:42:26 AM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9143913,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "融合技法及想象力的练习一",
        "cover": "https://img.zcool.cn/community/01427b5cfb4edea801205e4bad47b8.jpg",
        "cover1x": "https://img.zcool.cn/community/01427b5cfb4edea801205e4bad47b8.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/01427b5cfb4edea801205e4bad47b8.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1NzU2NTI=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "插画",
        "subCateStr": "商业插画",
        "publishTime": "Jun 8, 2019 3:13:46 PM",
        "publishTimeDiffStr": "5天前",
        "timeTitleStr": "审核通过时间：2019-06-08 15:13:46；创建时间：2019-06-08 13:57:45",
        "designTime": "Jun 8, 2019 2:29:04 PM",
        "recommend": 1,
        "recommendTime": "Jun 9, 2019 12:12:06 AM",
        "status": 1,
        "viewCount": 2108,
        "commentCount": 0,
        "favoriteCount": 0,
        "recommendCount": 11,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2108",
        "commentCountStr": "0",
        "favoriteCountStr": "0",
        "recommendCountStr": "11",
        "favoriteStatus": 0,
        "creator": 14898417,
        "creatorObj": {
            "id": 14898417,
            "status": 1,
            "username": "索阿",
            "pageUrl": "https://www.zcool.com.cn/u/14898417",
            "avatar": "https://img.zcool.cn/community/01cf7c5bac857ca801213deaa1df4f.jpg",
            "avatar1x": "https://img.zcool.cn/community/01cf7c5bac857ca801213deaa1df4f.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/01cf7c5bac857ca801213deaa1df4f.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 1,
        "subCate": 2,
        "createTime": "Jun 8, 2019 1:57:45 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9024632,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "怎样观察生活获得灵感并有效发挥在自己的画面上（二）",
        "cover": "https://img.zcool.cn/community/0310d6e5ce2a917a801208f8bc262d7.jpg",
        "cover1x": "https://img.zcool.cn/community/0310d6e5ce2a917a801208f8bc262d7.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0310d6e5ce2a917a801208f8bc262d7.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzYwOTg1Mjg=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "插画",
        "subCateStr": "插画习作",
        "publishTime": "May 20, 2019 9:29:56 PM",
        "publishTimeDiffStr": "24天前",
        "timeTitleStr": "审核通过时间：2019-05-20 21:29:56；创建时间：2019-05-20 21:18:16",
        "designTime": "May 20, 2019 9:18:16 PM",
        "recommend": 2,
        "recommendTime": "May 21, 2019 10:54:54 AM",
        "status": 1,
        "viewCount": 9907,
        "commentCount": 74,
        "favoriteCount": 0,
        "recommendCount": 1208,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "9907",
        "commentCountStr": "74",
        "favoriteCountStr": "0",
        "recommendCountStr": "1208",
        "favoriteStatus": 0,
        "creator": 16419100,
        "creatorObj": {
            "id": 16419100,
            "status": 1,
            "username": "叫我东东",
            "pageUrl": "https://www.zcool.com.cn/u/16419100",
            "avatar": "https://img.zcool.cn/community/03135b25c251689a8012029ac7c457c.jpg",
            "avatar1x": "https://img.zcool.cn/community/03135b25c251689a8012029ac7c457c.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/03135b25c251689a8012029ac7c457c.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 1,
        "subCate": 7,
        "createTime": "May 20, 2019 9:18:16 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 242643,
        "objectType": 8,
        "objectTypeStr": "文章",
        "title": "法拉利车主花再多钱都得不到的东西，在比亚迪这里居然是标配",
        "cover": "https://img.zcool.cn/community/0158fd5cf8b599a801213ec2bb2259.jpg",
        "cover1x": "https://img.zcool.cn/community/0158fd5cf8b599a801213ec2bb2259.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/0158fd5cf8b599a801213ec2bb2259.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/article/ZOTcwNTcy.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "教程",
        "subCateStr": "多领域",
        "publishTime": "Jun 6, 2019 2:48:00 PM",
        "publishTimeDiffStr": "7天前",
        "timeTitleStr": "审核通过时间：2019-06-06 14:48:00；创建时间：2019-06-06 14:41:36",
        "recommend": 2,
        "recommendTime": "Jun 7, 2019 3:55:30 PM",
        "status": 1,
        "viewCount": 2613,
        "commentCount": 9,
        "favoriteCount": 0,
        "recommendCount": 134,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "2613",
        "commentCountStr": "9",
        "favoriteCountStr": "0",
        "recommendCountStr": "134",
        "favoriteStatus": 0,
        "creator": 13317634,
        "creatorObj": {
            "id": 13317634,
            "status": 1,
            "username": "赛雷",
            "pageUrl": "https://www.zcool.com.cn/u/13317634",
            "avatar": "https://img.zcool.cn/community/04fb00553ef0b000000181f2d7f106.jpg",
            "avatar1x": "https://img.zcool.cn/community/04fb00553ef0b000000181f2d7f106.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/04fb00553ef0b000000181f2d7f106.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 695,
        "subCate": 0,
        "createTime": "Jun 6, 2019 2:41:36 PM",
        "trackCode": "3",
        "personCount": 0
    },
    {
        "id": 9127725,
        "objectType": 3,
        "objectTypeStr": "作品",
        "title": "“端午主题”卡通字集锦",
        "cover": "https://img.zcool.cn/community/011f4d5cf73bc8a801213ec25df81b.jpg",
        "cover1x": "https://img.zcool.cn/community/011f4d5cf73bc8a801213ec25df81b.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "cover2x": "https://img.zcool.cn/community/011f4d5cf73bc8a801213ec25df81b.jpg@520w_390h_1c_1e_1o_100sh.jpg",
        "pageUrl": "https://www.zcool.com.cn/work/ZMzY1MTA5MDA=.html",
        "type": 1,
        "typeStr": "原创",
        "cateStr": "平面",
        "subCateStr": "字体/字形",
        "publishTime": "Jun 5, 2019 1:48:25 PM",
        "publishTimeDiffStr": "8天前",
        "timeTitleStr": "审核通过时间：2019-06-05 13:48:25；创建时间：2019-06-05 11:48:48",
        "designTime": "Jun 5, 2019 8:00:00 AM",
        "recommend": 2,
        "recommendTime": "Jun 5, 2019 4:57:12 PM",
        "status": 1,
        "viewCount": 3853,
        "commentCount": 17,
        "favoriteCount": 0,
        "recommendCount": 91,
        "contentCount": 0,
        "contentCountStr": "0",
        "viewCountStr": "3853",
        "commentCountStr": "17",
        "favoriteCountStr": "0",
        "recommendCountStr": "91",
        "favoriteStatus": 0,
        "creator": 2000416,
        "creatorObj": {
            "id": 2000416,
            "status": 1,
            "username": "开心老头",
            "pageUrl": "https://www.zcool.com.cn/u/2000416",
            "avatar": "https://img.zcool.cn/community/00b8425b4458afa80120b9595b0699.jpg",
            "avatar1x": "https://img.zcool.cn/community/00b8425b4458afa80120b9595b0699.jpg@80w_80h_1c_1e_1o_100sh.jpg",
            "avatar2x": "https://img.zcool.cn/community/00b8425b4458afa80120b9595b0699.jpg@160w_160h_1c_1e_1o_100sh.jpg",
            "memberType": 0
        },
        "eventId": 0,
        "cate": 8,
        "subCate": 14,
        "createTime": "Jun 5, 2019 11:48:48 AM",
        "trackCode": "3",
        "personCount": 0
    }
];
var str1 = "";
for(var i = 0; i < json1.length; i ++){
    str1 += `
    <div class="card-item">
        <div class="card-img">
            <a href="">
                <img src=${json1[i].cover} alt="">
            </a>
        </div>
        <div class="card-intro">
            <p class="title"><a href="">${json1[i].title}</a></p>
            <p class="type">${json1[i].cateStr}-${json1[i].subCateStr}</p>
            <div class="message">
                <span class="view">${json1[i].viewCountStr}</span>
                <span class="comment">${json1[i].commentCountStr}</span>
                <span class="like">${json1[i].recommendCountStr}</span>
            </div>
        </div>
        <div class="card-author">
            <a class="author-img" href="">
                <img src=${json1[i].creatorObj.avatar} alt="">
                ${json1[i].creatorObj.username}
            </a>
            <div class="card-hide">
                <div class="hide-img">
                    <a href="">
                        <img src=${json1[i].creatorObj.avatar} alt="">
                    </a>
                </div>
                <div class="hide-author">
                    <a class="hide-name" href="">${json1[i].creatorObj.username}</a>
                    <a class="hide-recommend" href="">
                        <img src="https://static.zcool.cn/z/images/svg/honor_tuijian_designer.svg" alt="推荐漫画作者">
                    </a>
                </div>
                <div class="hide-position">
                    <span>${json1[i].cateStr}</span>
                </div>
                <div class="hide-details clearfix">
                    <div class="creation">
                        <p>创作</p>
                        <a href="">197</a>
                    </div>
                    <div class="fans">
                        <p>粉丝</p>
                        <a href="">37024</a>
                    </div>
                </div>
                <div class="hide-concern">
                    <a href="" class="follow fl">关注</a>
                    <a href="" class="letter fr">私信</a>
                </div>
            </div>
        </div>
        <em class="card-time">${json1[i].publishTimeDiffStr}</em>
    </div>
    `
}
// console.log(str1);
mainBox.innerHTML = str1;

/**
 * 回到顶部
 */
var backTop = document.getElementById("back-top");
var bodyHeight = document.getElementById("body").offsetHeight;

window.onscroll = function(){
    console.log(bodyHeight);
    var scrollTop = document.documentElement.scrollTop;
    // console.log(scrollTop);
    if(bodyHeight - scrollTop > 270){
        backTop.style.display = "block";
        if(scrollTop >= 1800){
            backTop.style.position = "absolute";
            backTop.style.bottom ="270px";
        }else{
            backTop.style.position = "fixed";
            backTop.style.bottom ="34px";
        }
    }else{
        backTop.style.display = "none";
    }
}

backTop.addEventListener("click",function(){
    document.documentElement.scrollTop = 0;
});