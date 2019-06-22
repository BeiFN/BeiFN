/*顶部推荐悬浮*/
window.onscroll=function() {
    var recommend = document.getElementById("recommend");
    // console.log(scrollTop);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop >= 576) {
        console.log(recommend.offsetTop);
        recommend.style.position = "fixed";
        recommend.style.top = "0";
    } else {
        recommend.style.position = "static";
    }
}

/*回到顶部*/


