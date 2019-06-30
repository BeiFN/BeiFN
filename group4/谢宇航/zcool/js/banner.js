var imgCon, showIndex = 0;;

//获取左右两个按钮，并且设置点击监听事件
	var leftBn = document.querySelector("#pre");
	var rightBn = document.querySelector("#next");
	var banner = document.querySelector(".banner");
	imgCon = document.querySelector(".banner-img");
	sliders = imgCon.querySelectorAll("li")

	banner.addEventListener("mouseenter", clearTime);
	banner.addEventListener("mouseleave", startTime);

console.log(sliders.length)
rightBn.onclick = function(){
	if(showIndex === sliders.length - 2){
		  showIndex = 1;
		  imgCon.style.left = 0;
	}else{
		  showIndex ++;
	}
	move(-1130 * showIndex , imgCon , "left");
}

leftBn.onclick = function(){
	if(showIndex === 0){
		  showIndex = sliders.length - 2;
		  imgCon.style.left = -1130 * showIndex;
	}else{
		  showIndex --;
	}
	move(-1130 * showIndex , imgCon , "left");
}

function move( target , dom , attr ){
	clearInterval( dom.timer );
	dom.timer = setInterval(function(){
		  // 获取当前元素的位置;
		  var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
		  // target重新赋值;
		  target = (attr === "opacity" ? target * 100 : target)
		  var speed = (target - iNow) / 10;
		  speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		  if(target === iNow){
				clearInterval(dom.timer)
		  }else{
				dom.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
		  }
	},50)
}











//点击事件
// function clickHandler() {
// 	if (this.id === "pre") {
// 		position--;
// 		if (position < 0) position = 7;
// 	}
// 	else {
// 		position++;
// 		if (position > 7) {
// 			position = 0;
// 		}
// 	}
// 	imgMove();
// }

// //banner图位置移动
// function imgMove() {
// 	imgCon.style.left = -position * 1130 + "px";
// }

//轮播
var time = setInterval(move1, 4000);
function move1() {
	showIndex++;
	if (showIndex > sliders.length - 2) showIndex = 0;
	move(-1130 * showIndex , imgCon , "left");
}

function startTime() {
	clearInterval(time);
	time = setInterval(move1, 4000);
}

function clearTime() {
	clearInterval(time);
}














sideBar();
function sideBar() {
	var side = document.querySelector(".side-bar");
	var footer = document.querySelector(".footer");
	var bottom = footer.offsetTop;
	window.addEventListener("scroll", scrollHandler);
	function scrollHandler() {
		var scroll = document.documentElement.scrollTop || document.body.scrollTop;
		if (scroll > 400) side.style.display = "block";
		else if (scroll <= 400) side.style.display = "none";
		if (scroll > 3130) {
			side.style.position = "absolute";
			side.style.top = 3700 + "px";
		}
		else {
			side.style.position = "fixed";
			side.style.top = 550 + "px";
		}
	}
	side.addEventListener("click", function () {
		document.documentElement.scrollTop = 0;
	})
}