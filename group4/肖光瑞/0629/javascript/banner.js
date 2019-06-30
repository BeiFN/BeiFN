/**
 * 
 * @param {*} selector 
 */
function $(selector) {
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

/**
 * 
 * @param {*} target 
 * @param {*} dom 
 * @param {*} attr 
 * @param {*} base 
 */
function move(target, dom, attr, base) {
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


var nextBtn = $(".button-next"),
      prevBtn = $(".button-prev"),
      sliders = $(".slider"),
      wrapper = $(".wrapper"),
      container = $(".container"),
      pagination = $(".pagination"),
      paginationList = Array.from(pagination.children),
      index = 1,
      timer = 0;

/**
 * 初始化
 */
function init() {
      wrapper.style.width = 300 * sliders.length + "px";
      wrapper.style.left = -300 + "px";
      paginationList[0].className = "active";
}

/**
 * 下一张
 */
function toNext() {
      //当banner图数组下标为sliders.length - 2，设置下标为1
      if (index === sliders.length - 2) {
            index = 1;
            wrapper.style.left = 0;
      } else {
            index++
      }
      bannerMove()
}
/**
 * 上一张
 */
function toPrev() {
      //当banner图数组下标为1，设置下标为sliders.length - 2;
      if (index === 1) {
            index = sliders.length - 2;
            wrapper.style.left = -300 * (index + 1) + "px";
      } else {
            index--;
      }
      bannerMove()
}
/**
 * banner图动态改变下面小点点
 */
function bannerChangePag() {
      for (let i = 0, ele; ele = paginationList[i++];) {
            ele.className = "";
      }
      paginationList[index - 1].className = "active";
}

/**
 * 对多次使用的函数进行合并
 */
function bannerMove() {
      move(-300 * index, wrapper, "left", 8);
      bannerChangePag();
}
/**
 * 小点点动态改变banner图
 */
function pagChangeBanner() {
      stopInterval()
      // console.log(this.getAttribute("x-data"));
      var pagIndx = paginationList.indexOf(this)
      for (let i = 0, ele; ele = paginationList[i++];) {
            ele.className = "";
      }
      index = pagIndx + 1;
      paginationList[pagIndx].className = "active";
      move(-300 * index, wrapper, "left", 8);
      startInterval();
}
/**
 * 清除定时器
 */
function stopInterval() {
      clearInterval(timer);
}
/**
 * 开启定时器
 */
function startInterval() {
      timer = setInterval(toNext, 3000);
}

init();
startInterval();
nextBtn.addEventListener("click", toNext);
prevBtn.addEventListener("click", toPrev);
for (let i = 0; i < paginationList.length; i++) {
      paginationList[i].addEventListener("mouseenter", pagChangeBanner);
}