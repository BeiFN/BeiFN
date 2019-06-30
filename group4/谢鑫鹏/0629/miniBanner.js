var wrapper = $(".wrapper");
var prevBtn = $(".button-prev");
var nextBtn = $(".button-next");
var bannerList = wrapper.children;
var index = 0;
var pagination = $(".pagination");
var paginationList = [].slice.call(pagination.children);
var timer = 0;

/**
 * 选择器
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
/**
 * 向前一张
 */
function prevBanner(){
    if(index === 0){
        wrapper.style.left = -(bannerList.length - 1) * 300 + "px";
        index = bannerList.length - 2;
        paginationChange(index)
    }else{
        index --;
        paginationChange(index)
    }
    move(-300 * index, wrapper, "left");
}
/**
 * 向后一张
 */
function nextBanner(){
    clearTimeout(timer);
    if(index === bannerList.length - 1){
        wrapper.style.left = 0;
        index = 1;
        paginationChange(index)
    }else{
        index ++;
        paginationChange(index)
    }
    move(-300 * index, wrapper, "left");
    if(index === bannerList.length - 1){
        timer = setTimeout(function(){
            wrapper.style.left = 0;
        },2500);
    }
}
/**
 * 移动动画
 */
function move(target, ele, attr){
    clearInterval(ele.timer);
    // var count = 0;
    ele.timer = setInterval(function(){
        // count++;
        var iNow = attr === "opacity" ? parseInt(getComputedStyle(ele)[attr] * 100) : parseInt(getComputedStyle(ele)[attr]);
        target = attr === "opacity" ? target * 100 : target;
        var speed = (target - iNow) / 10;
        speed = speed >= 0 ? Math.ceil(speed) : Math.floor(speed);
        if(target === iNow){
            clearInterval(ele.timer);
        }else{
            ele.style[attr] = attr === "opacity" ? (iNow + speed) / 100 : iNow + speed + "px";
        }
        // console.log(count);
    },50)
    
}
/**
 * 下标变化
 */
function paginationChange(index){
    for(var i = 0, ele; ele = paginationList[i++]; ){
        ele.className = "";
    }
    if(index === bannerList.length - 1){
        index = 0;
    }
    paginationList[index].className = "active";
}
/**
 * 手动变换下标
 */
function paginationHand(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    var targetIndex = paginationList.indexOf(target);
    console.log(targetIndex);
    if(index === targetIndex || index === bannerList.length - 1 && targetIndex === 0){
        return false;
    }
    index = paginationList.indexOf(target);
    if(index !== -1){
        paginationChange(index);
        move(-300 * index, wrapper, "left");
    }
}

pagination.addEventListener("click", paginationHand);
prevBtn.addEventListener("click", prevBanner);
nextBtn.addEventListener("click", nextBanner);