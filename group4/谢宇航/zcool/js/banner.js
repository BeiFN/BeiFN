    var position = 0, imgCon;
	//获取左右两个按钮，并且设置点击监听事件
	window.onload = function init() {
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
	function clickHandler(e) {
		if(this.id === "pre"){
			position--;
			if(position < 0) position = 7;
		}
		else{
			position++;
			if(position > 7) position = 0;
		}
		imgMove();
	}
	//banner图位置移动
	function imgMove() {
		imgCon.style.left =-position*1130+"px";
	}
	//轮播
	var time = setInterval(move1, 4000);
	function move1() {
		position++;
		if(position > 7) position = 0;
		imgMove();
	}
	function startTime(e) {
		time = setInterval(move1, 4000);
	}
	function clearTime(e) {
		clearInterval(time);
	}