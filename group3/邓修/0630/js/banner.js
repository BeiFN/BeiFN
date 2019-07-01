
// 1. 当前显示的那一张;

var showIndex = 1;
var scrollIndex = 1;

var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders = $(".slider");
var wrapper = $(".wrapper");
var container = $(".container");
var pagination = $(".pagination");

var sliderWidth = sliders[0].offsetWidth;       //当前滚动元素宽度

function $(selector) {
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

for (var i = 0, span; span = pagination.children[i++];) {
      span.onclick = function () {        //给每个span添加点击事件
            var scrollIndex = this.innerHTML - 0;     //根据内容确定跳转的是哪个
            if (showIndex === 6 && scrollIndex === 1) {//跳转的和当前元素都是第1个
            }
            else if (showIndex === 0 && scrollIndex === 5) {//跳转的和当前元素都是第5个
            }
            else {
                  showIndex=scrollIndex;
                  move(-sliderWidth * showIndex, wrapper, "left");
            }
      }
}

// part1 : 按钮控制showIndex;
next_btn.onclick = function () {//在这只改变跳转索引
      if (showIndex === sliders.length - 1) {
            showIndex = 2;
            wrapper.style.left = -sliderWidth + "px";
      } else {
            showIndex++;
      }
      // move(-300 * showIndex , wrapper , "left");
}
prev_btn.onclick = function () {//在这只改变跳转索引
      if (showIndex === 0) {
            showIndex = sliders.length - 3;
            wrapper.style.left = -sliderWidth * 5 + "px";
      } else {
            showIndex--;
      }
      // move(-300 * showIndex , wrapper , "left");
}

container.onclick = function (evt) {//实现跳转
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if (target === next_btn || target === prev_btn) {
            move(-sliderWidth * showIndex, wrapper, "left");
      }
} 

function move(target, dom, attr) {//运动
      clearInterval(dom.timer);
      dom.timer = setInterval(function () {
            // 获取当前元素的位置;
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
            // target重新赋值;
            target = (attr === "opacity" ? target * 100 : target)
            var speed = (target - iNow) / 3;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (target === iNow) {
                  clearInterval(dom.timer)
            } else {
                  dom.style[attr] = (attr === "opacity" ? (iNow + speed) / 100 : iNow + speed + "px")
            }
      }, 50)
}
function rotMap() {//轮播
      if (showIndex === sliders.length - 1) {
            showIndex = 2;
            wrapper.style.left = -sliderWidth + "px";
      } else {
            showIndex++;
      }
      move(-sliderWidth * showIndex, wrapper, "left");
      // console.log(showIndex);
}

function startRotMap() {//每5秒滚动一次
      setInterval(rotMap, 5000);
}
startRotMap();