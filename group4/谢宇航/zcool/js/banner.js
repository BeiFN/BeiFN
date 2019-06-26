var position = 0, imgCon;

//获取左右两个按钮，并且设置点击监听事件
window.onload = function () {
	var leftBn = document.querySelector("#pre");
	var rightBn = document.querySelector("#next");
	var banner = document.querySelector(".banner");
	imgCon = document.querySelector(".banner-img");
	leftBn.addEventListener("click", clickHandler);
	rightBn.addEventListener("click", clickHandler);
	banner.addEventListener("mouseenter", clearTime);
	banner.addEventListener("mouseleave", startTime);
}

//点击事件
function clickHandler() {
	if (this.id === "pre") {
		position--;
		if (position < 0) position = 7;
	}
	else {
		position++;
		if (position > 7) {
			position = 0;
		}
	}
	imgMove();
}

//banner图位置移动
function imgMove() {
	imgCon.style.left = -position * 1130 + "px";
}

//轮播
var time = setInterval(move1, 3000);
function move1() {
	position++;
	if (position > 7) position = 0;
	imgMove();
}

function startTime() {
	clearInterval(time);
	time = setInterval(move1, 3000);
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