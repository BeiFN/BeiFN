/*顶部导航区域hover显示*/
window.onload =function(){
    var discover    =document.getElementById("discover");
    var discoverBox =document.getElementById("discover-box");
    var job         =document.getElementById("jobs");
    var jobBox      =document.getElementById("job_box");
    var active      =document.getElementById("actives");
    var activeBox   =document.getElementById("active_box");
    var material    =document.getElementById("materials");
    var materialsBox=document.getElementById(" material_box");
    var courses     =document.getElementById("course");
    var courseBox   =document.getElementById("course_box");
    var subTop      =document.getElementById("subtop");
    var subTopBox   =document.getElementById("subTop_box");
    discover.onmouseover=function(){
        discoverBox.style.display = "block";
    };
    discover.onmouseout=function(){
        discoverBox.style.display = "none";
    };
    job.onmouseover =function (){
        jobBox.style.display = "block";
    };
    job.onmouseout =function (){
        jobBox.style.display = "none";
    };
    active.onmouseover =function (){
        activeBox.style.display = "block";
    };
    active.onmouseout =function (){
        activeBox.style.display = "none";
    };
    material.onmouseover =function (){
        materialsBox.style.display = "block";
    };
    material.onmouseout =function (){
        materialsBox.style.display = "none";
    };
    courses.onmouseover =function (){
        courseBox.style.display = "block";
    };
    courses.onmouseout =function (){
        courseBox.style.display = "none";
    };
    subTop.onmouseover =function (){
        subTopBox .style.display = "block";
    };
    subTop .onmouseout =function (){
        subTopBox .style.display = "none";
    }
};

/*顶部推荐悬浮  || 回到顶部*/
window.onscroll=function() {
    var goTop =document.getElementById("gotop");
    var recommend = document.getElementById("recommend");
    // console.log(scrollTop);
    console.log(goTop.scrollTop)
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //顶部推荐悬浮
    if (scrollTop >= 576) {
        // console.log(recommend.offsetTop);
        recommend.style.position = "fixed";
        recommend.style.top = "0";
    } else {
        recommend.style.position = "static";
    }
    //回到顶部
    if(scrollTop >=500){
        goTop.style.position = "absolute";
        goTop.style.display = "block";
    }else if(scrollTop < 500){
        goTop.style.display="none";
    }
    goTop.onclick=function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
};

/*轮播区域*/
// var banners = document.getElementById("banner");
// var bannerBox = document.getElementById("banner-box");
// var prevBtn = document.getElementById("prev");
// var nextBtn = document.getElementById("next");

// prevBtn.addEventListener("click", clickHandler);
// nextBtn.addEventListener("click", clickHandler);
// bannerBox.addEventListener("mouseenter", mouseHandler);
// bannerBox.addEventListener("mouseleave", mouseHandler);



