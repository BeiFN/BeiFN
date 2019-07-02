
// 1. 当前显示的那一张;

var showIndex = 0;

var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders = $(".slider");
var wrapper = $(".wrapper");
var container = $(".container");
var pagination = $(".pagination");
var flag = false;

var sliderWidth = sliders[0].offsetWidth;       //当前滚动元素宽度

function $(selector) {
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

for (var i = 0, span; span = pagination.children[i++];) {
      span.index = i;
      span.onmouseover = function () {        //给每个span添加鼠标滑过事件
            if (showIndex === 5 && this.index === 2) {
                  // console.log(1);
                  showIndex = 1;
                  wrapper.style.left = 0;
            }
            else if (showIndex === 5 && this.index === 1) {
                  // console.log(2);
                  return false;
            }
            else {
                  showIndex = this.index - 1;
            }
            for (var i = 0, btn; btn = pagination.children[i++];) {
                  btn.className = "";
            }
            // console.log(showIndex);
            this.className = "active";
            move(-sliderWidth * showIndex, wrapper, "left");
      }
}

// part1 : 按钮控制showIndex;
next_btn.onclick = function () {//在这只改变跳转索引
      if (showIndex === sliders.length - 1) {
            showIndex = 1;
            wrapper.style.left = 0;
      } else {
            showIndex++;
      }
      // console.log(showIndex);
      // move(-300 * showIndex , wrapper , "left");
}
prev_btn.onclick = function () {//在这只改变跳转索引
      if (showIndex === 0) {
            showIndex = sliders.length - 2;
            wrapper.style.left = -sliderWidth * 5 + "px";
      } else {
            showIndex--;
      }
      // console.log(showIndex);
      // move(-300 * showIndex , wrapper , "left");
}

container.onclick = function (evt) {//实现跳转
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if (target === next_btn || target === prev_btn) {
            move(-sliderWidth * showIndex, wrapper, "left");
            for (var i = 0, btn; btn = pagination.children[i++];) {
                  btn.className = "";
            }
            pagination.children[showIndex % 5].className = "active";
            // console.log(showIndex);
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
      // 在程序之中怎么触发事件;
      var evt = new Event("click");
      Object.assign(evt, {
            say: "hello"
      });
      // console.log(evt);
      next_btn.dispatchEvent(evt);
      move(-sliderWidth * showIndex, wrapper, "left");
      for (var i = 0, btn; btn = pagination.children[i++];) {
            btn.className = "";
      }
      pagination.children[showIndex % 5].className = "active";
}

function startRotMap() {//每5秒滚动一次
      setInterval(rotMap, 4000);
}
startRotMap();