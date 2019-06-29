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
var json1 = [
        {
            "id": 9054888,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "品牌案例丨cike 小红线 （含橱窗视频）",
            "cover": "https://img.zcool.cn/community/01e5215ce812c1a801209aa061dcea.jpg",
            "cover1x": "https://img.zcool.cn/community/01e5215ce812c1a801209aa061dcea.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01e5215ce812c1a801209aa061dcea.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzYyMTk1NTI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "摄影",
            "subCateStr": "产品",
            "publishTime": "May 25, 2019 12:04:16 AM",
            "publishTimeDiffStr": "33天前",
            "timeTitleStr": "审核通过时间：2019-05-25 00:04:16；创建时间：2019-05-25 00:09:56",
            "designTime": "May 25, 2019 12:09:56 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 371292,
            "commentCount": 4,
            "favoriteCount": 0,
            "recommendCount": 31,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "37万",
            "commentCountStr": "4",
            "favoriteCountStr": "0",
            "recommendCountStr": "31",
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
            "createTime": "May 25, 2019 12:09:56 AM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9064590,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【日本·遇见】温情茶饮/奶茶品牌策划与设计开发",
            "cover": "https://img.zcool.cn/community/01a8cb5ceb462ea801209aa0390962.jpg",
            "cover1x": "https://img.zcool.cn/community/01a8cb5ceb462ea801209aa0390962.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01a8cb5ceb462ea801209aa0390962.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzYyNTgzNjA=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "品牌",
            "publishTime": "May 27, 2019 10:18:03 AM",
            "publishTimeDiffStr": "31天前",
            "timeTitleStr": "审核通过时间：2019-05-27 10:18:03；创建时间：2019-05-27 09:52:29",
            "designTime": "May 27, 2019 10:06:58 AM",
            "recommend": 1,
            "recommendTime": "May 27, 2019 1:21:28 PM",
            "status": 1,
            "viewCount": 29828,
            "commentCount": 14,
            "favoriteCount": 0,
            "recommendCount": 48,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "3.0万",
            "commentCountStr": "14",
            "favoriteCountStr": "0",
            "recommendCountStr": "48",
            "favoriteStatus": 0,
            "creator": 16935617,
            "creatorObj": {
                "id": 16935617,
                "status": 1,
                "username": "前线思维",
                "pageUrl": "https://www.zcool.com.cn/u/16935617",
                "avatar": "https://img.zcool.cn/community/01809d5cf0d687a801213ec2d4be52.jpg",
                "avatar1x": "https://img.zcool.cn/community/01809d5cf0d687a801213ec2d4be52.jpg@80w_80h_1c_1e_1o_100sh.jpg",
                "avatar2x": "https://img.zcool.cn/community/01809d5cf0d687a801213ec2d4be52.jpg@160w_160h_1c_1e_1o_100sh.jpg",
                "memberType": 1
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 15,
            "createTime": "May 27, 2019 9:52:29 AM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9112586,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "IP化打造【烧烤兵法】品牌全案设计",
            "cover": "https://img.zcool.cn/community/0126165cf494efa801205e4b1bc460.jpg",
            "cover1x": "https://img.zcool.cn/community/0126165cf494efa801205e4b1bc460.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/0126165cf494efa801205e4b1bc460.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY0NTAzNDQ=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "品牌",
            "publishTime": "Jun 3, 2019 1:57:59 PM",
            "publishTimeDiffStr": "24天前",
            "timeTitleStr": "审核通过时间：2019-06-03 13:57:59；创建时间：2019-06-03 11:21:56",
            "designTime": "Jun 3, 2019 1:37:30 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 26900,
            "commentCount": 3,
            "favoriteCount": 0,
            "recommendCount": 34,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "2.7万",
            "commentCountStr": "3",
            "favoriteCountStr": "0",
            "recommendCountStr": "34",
            "favoriteStatus": 0,
            "creator": 16661323,
            "creatorObj": {
                "id": 16661323,
                "status": 1,
                "username": "王皓天",
                "pageUrl": "https://www.zcool.com.cn/u/16661323",
                "avatar": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg",
                "avatar1x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@80w_80h_1c_1e_1o_100sh.jpg",
                "avatar2x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@160w_160h_1c_1e_1o_100sh.jpg",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 15,
            "createTime": "Jun 3, 2019 11:21:56 AM",
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
            "publishTimeDiffStr": "28天前",
            "timeTitleStr": "审核通过时间：2019-05-30 09:24:15；创建时间：2019-05-30 00:55:47",
            "designTime": "Jan 9, 2019 8:00:00 AM",
            "recommend": 1,
            "recommendTime": "May 30, 2019 11:14:37 AM",
            "status": 1,
            "viewCount": 174335,
            "commentCount": 3,
            "favoriteCount": 0,
            "recommendCount": 32,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "17万",
            "commentCountStr": "3",
            "favoriteCountStr": "0",
            "recommendCountStr": "32",
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
            "id": 9127182,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【卡瑞登酒店】品牌全案设计开发",
            "cover": "https://img.zcool.cn/community/011e385cf73a09a801205e4b23a76c.jpg",
            "cover1x": "https://img.zcool.cn/community/011e385cf73a09a801205e4b23a76c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/011e385cf73a09a801205e4b23a76c.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY1MDg3Mjg=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "品牌",
            "publishTime": "Jun 6, 2019 8:46:48 PM",
            "publishTimeDiffStr": "20天前",
            "timeTitleStr": "审核通过时间：2019-06-06 20:46:48；创建时间：2019-06-05 10:55:43",
            "designTime": "Jun 6, 2019 7:18:23 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 24626,
            "commentCount": 2,
            "favoriteCount": 0,
            "recommendCount": 15,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "2.5万",
            "commentCountStr": "2",
            "favoriteCountStr": "0",
            "recommendCountStr": "15",
            "favoriteStatus": 0,
            "creator": 16661323,
            "creatorObj": {
                "id": 16661323,
                "status": 1,
                "username": "王皓天",
                "pageUrl": "https://www.zcool.com.cn/u/16661323",
                "avatar": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg",
                "avatar1x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@80w_80h_1c_1e_1o_100sh.jpg",
                "avatar2x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@160w_160h_1c_1e_1o_100sh.jpg",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 15,
            "createTime": "Jun 5, 2019 10:55:43 AM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9127751,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "英伦风酒店品牌全案设计【卡瑞登】",
            "cover": "https://img.zcool.cn/community/01a8215cf75af5a801205e4bc71139.jpg",
            "cover1x": "https://img.zcool.cn/community/01a8215cf75af5a801205e4bc71139.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01a8215cf75af5a801205e4bc71139.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY1MTEwMDQ=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "品牌",
            "publishTime": "Jun 5, 2019 5:46:40 PM",
            "publishTimeDiffStr": "22天前",
            "timeTitleStr": "审核通过时间：2019-06-05 17:46:40；创建时间：2019-06-05 11:51:36",
            "designTime": "Jun 5, 2019 5:24:21 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 20625,
            "commentCount": 3,
            "favoriteCount": 0,
            "recommendCount": 14,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "2.1万",
            "commentCountStr": "3",
            "favoriteCountStr": "0",
            "recommendCountStr": "14",
            "favoriteStatus": 0,
            "creator": 16661323,
            "creatorObj": {
                "id": 16661323,
                "status": 1,
                "username": "王皓天",
                "pageUrl": "https://www.zcool.com.cn/u/16661323",
                "avatar": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg",
                "avatar1x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@80w_80h_1c_1e_1o_100sh.jpg",
                "avatar2x": "https://img.zcool.cn/community/0157715cf0f912a801205e4b39a7fc.jpg@160w_160h_1c_1e_1o_100sh.jpg",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 15,
            "createTime": "Jun 5, 2019 11:51:36 AM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232770,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】脉动怎么样 给宝宝最好的",
            "cover": "https://img.zcool.cn/community/010bf85d0c6ed5a801213ec2adc11f.jpg",
            "cover1x": "https://img.zcool.cn/community/010bf85d0c6ed5a801213ec2adc11f.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/010bf85d0c6ed5a801213ec2adc11f.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEwODA=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:55:48 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:55:48；创建时间：2019-06-21 13:44:25",
            "designTime": "Jun 21, 2019 1:44:56 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11685,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 1,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "1",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:44:25 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232833,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动饮料怎么样 最爱的饮料",
            "cover": "https://img.zcool.cn/community/01005e5d0c7046a801205e4b316295.jpg",
            "cover1x": "https://img.zcool.cn/community/01005e5d0c7046a801205e4b316295.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01005e5d0c7046a801205e4b316295.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEzMzI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:53:43 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:53:43；创建时间：2019-06-21 13:50:17",
            "designTime": "Jun 21, 2019 8:00:00 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11672,
            "commentCount": 1,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "1",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:50:17 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232823,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】脉动怎么样饮料哪款好？",
            "cover": "https://img.zcool.cn/community/015a245d0c6feca801213ec2024f09.jpg",
            "cover1x": "https://img.zcool.cn/community/015a245d0c6feca801213ec2024f09.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/015a245d0c6feca801213ec2024f09.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEyOTI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:53:42 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:53:42；创建时间：2019-06-21 13:49:21",
            "designTime": "Jun 21, 2019 8:00:00 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11629,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 1,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "1",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:49:21 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232814,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】 脉动好不好还没有入手吗",
            "cover": "https://img.zcool.cn/community/01298e5d0c6fd0a801213ec2b7beae.jpg",
            "cover1x": "https://img.zcool.cn/community/01298e5d0c6fd0a801213ec2b7beae.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01298e5d0c6fd0a801213ec2b7beae.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEyNTY=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:57:27 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:57:27；创建时间：2019-06-21 13:48:48",
            "designTime": "Jun 21, 2019 1:49:07 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11597,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 1,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "1",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:48:48 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232796,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动饮料怎么样 真实爆料",
            "cover": "https://img.zcool.cn/community/01a66a5d0c6f85a801213ec2f22747.jpg",
            "cover1x": "https://img.zcool.cn/community/01a66a5d0c6f85a801213ec2f22747.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01a66a5d0c6f85a801213ec2f22747.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzExODQ=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:55:52 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:55:52；创建时间：2019-06-21 13:47:31",
            "designTime": "Jun 21, 2019 1:47:51 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11623,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:47:31 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232759,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】脉动怎么样 正确的打开方式",
            "cover": "https://img.zcool.cn/community/016f9e5d0c6e88a801213ec2e92e4b.jpg",
            "cover1x": "https://img.zcool.cn/community/016f9e5d0c6e88a801213ec2e92e4b.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/016f9e5d0c6e88a801213ec2e92e4b.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEwMzY=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:52:35 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:52:35；创建时间：2019-06-21 13:43:21",
            "designTime": "Jun 21, 2019 8:00:00 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11589,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 2,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "2",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:43:21 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232803,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动饮料怎么样 家长强力推荐",
            "cover": "https://img.zcool.cn/community/0161b95d0c6fafa801205e4b1b6ffa.jpg",
            "cover1x": "https://img.zcool.cn/community/0161b95d0c6fafa801205e4b1b6ffa.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/0161b95d0c6fafa801205e4b1b6ffa.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEyMTI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:52:40 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:52:40；创建时间：2019-06-21 13:48:03",
            "designTime": "Jun 21, 2019 1:48:35 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11580,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:48:03 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232826,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动怎么样 饮料的储存要注意哪些",
            "cover": "https://img.zcool.cn/community/0147325d0c7009a801213ec27b263e.jpg",
            "cover1x": "https://img.zcool.cn/community/0147325d0c7009a801213ec27b263e.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/0147325d0c7009a801213ec27b263e.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzEzMDQ=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:55:43 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:55:43；创建时间：2019-06-21 13:49:48",
            "designTime": "Jun 21, 2019 8:00:00 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11572,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:49:48 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232748,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】 脉动饮料怎么样多种口味混合喝吗",
            "cover": "https://img.zcool.cn/community/0141df5d0c6e68a801205e4b4cd593.jpg",
            "cover1x": "https://img.zcool.cn/community/0141df5d0c6e68a801205e4b4cd593.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/0141df5d0c6e68a801205e4b4cd593.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzA5OTI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 1:55:44 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 13:55:44；创建时间：2019-06-21 13:42:09",
            "designTime": "Jun 21, 2019 8:00:00 AM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11546,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 1:42:09 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232945,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】 脉动饮料怎么样新包装营养更好",
            "cover": "https://img.zcool.cn/community/01463f5d0c73b3a801205e4b1210fc.jpg",
            "cover1x": "https://img.zcool.cn/community/01463f5d0c73b3a801205e4b1210fc.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01463f5d0c73b3a801205e4b1210fc.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzE3ODA=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 2:41:45 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 14:41:45；创建时间：2019-06-21 14:05:12",
            "designTime": "Jun 21, 2019 2:05:47 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11546,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.2万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 2:05:12 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9233039,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动怎么样买过的人说说感觉如何",
            "cover": "https://img.zcool.cn/community/018f875d0c7626a801213ec28fd3eb.jpg",
            "cover1x": "https://img.zcool.cn/community/018f875d0c7626a801213ec28fd3eb.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/018f875d0c7626a801213ec28fd3eb.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzIxNTY=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 2:44:55 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 14:44:55；创建时间：2019-06-21 14:15:25",
            "designTime": "Jun 21, 2019 2:16:11 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11433,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 1,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.1万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "1",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 2:15:25 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232955,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】脉动怎么样 多长时间喝完最好",
            "cover": "https://img.zcool.cn/community/01615c5d0c73e6a801213ec2a73e60.jpg",
            "cover1x": "https://img.zcool.cn/community/01615c5d0c73e6a801213ec2a73e60.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/01615c5d0c73e6a801213ec2a73e60.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzE4MjA=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 2:41:45 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 14:41:45；创建时间：2019-06-21 14:06:02",
            "designTime": "Jun 21, 2019 2:06:34 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11428,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.1万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 2:06:02 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9233018,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动饮料】脉动饮料怎么样 大家觉得如何",
            "cover": "https://img.zcool.cn/community/0175995d0c756ba801205e4b79f04e.jpg",
            "cover1x": "https://img.zcool.cn/community/0175995d0c756ba801205e4b79f04e.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/0175995d0c756ba801205e4b79f04e.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzIwNzI=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 2:22:31 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 14:22:31；创建时间：2019-06-21 14:12:26",
            "designTime": "Jun 21, 2019 2:13:19 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11412,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.1万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 2:12:26 PM",
            "trackCode": "3",
            "personCount": 0
        },
        {
            "id": 9232960,
            "objectType": 3,
            "objectTypeStr": "作品",
            "title": "【脉动】脉动怎么样 最佳赏味期是？",
            "cover": "https://img.zcool.cn/community/015b415d0c7419a801213ec2240f50.jpg",
            "cover1x": "https://img.zcool.cn/community/015b415d0c7419a801213ec2240f50.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            "cover2x": "https://img.zcool.cn/community/015b415d0c7419a801213ec2240f50.jpg@520w_390h_1c_1e_1o_100sh.jpg",
            "pageUrl": "https://www.zcool.com.cn/work/ZMzY5MzE4NDA=.html",
            "type": 1,
            "typeStr": "原创",
            "cateStr": "平面",
            "subCateStr": "包装",
            "publishTime": "Jun 21, 2019 2:24:17 PM",
            "publishTimeDiffStr": "6天前",
            "timeTitleStr": "审核通过时间：2019-06-21 14:24:17；创建时间：2019-06-21 14:06:49",
            "designTime": "Jun 21, 2019 2:07:28 PM",
            "recommend": 0,
            "status": 1,
            "viewCount": 11386,
            "commentCount": 0,
            "favoriteCount": 0,
            "recommendCount": 0,
            "contentCount": 0,
            "contentCountStr": "0",
            "viewCountStr": "1.1万",
            "commentCountStr": "0",
            "favoriteCountStr": "0",
            "recommendCountStr": "0",
            "favoriteStatus": 0,
            "creator": 18073037,
            "creatorObj": {
                "id": 18073037,
                "status": 1,
                "username": "噜噜463",
                "pageUrl": "https://www.zcool.com.cn/u/18073037",
                "avatar": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar1x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "avatar2x": "https://static.zcool.cn/git_z/z/images/boy.png",
                "memberType": 0
            },
            "eventId": 0,
            "cate": 8,
            "subCate": 9,
            "createTime": "Jun 21, 2019 2:06:49 PM",
            "trackCode": "3",
            "personCount": 0
        }
    ]

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
    // console.log(bodyHeight);
    var scrollTop = document.documentElement.scrollTop;
    // console.log(scrollTop);
    if(scrollTop > 270){
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