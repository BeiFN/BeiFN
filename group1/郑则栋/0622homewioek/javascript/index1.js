//grade
var grade = 1;

var grade_box = document.getElementById("grade");
grade_box.innerHTML = grade;
var count_down = document.getElementById("count_down");
var paodan = document.getElementById("pao");
console.log(document.documentElement.clientWidth);
//fish apl
var rad_apl;
//倒计时
var count = 60;
var alp;
var array_fish = [];
//键盘事件
//分数
var rank = 1;
document.onkeydown = function(eve) {
	input_pao(eve);
	paodansmall(eve);
	dengji(eve);
};
//炮加字母
function input_pao(eve) {
	var e = eve || event;
	var alp = String.fromCharCode(e.keyCode);
	paodan.innerHTML = alp;
}
//fish compare
function fish_compare() {
	count_down.innerHTML = count;
	var rad_position = parseInt(Math.random() * 1180);
	var rad_alp_ascci = parseInt(Math.random() * 26 + 65);
	rad_apl = String.fromCharCode(rad_alp_ascci);
	var fish = document.createElement("div");
	fish.setAttribute("class", "fish");
	fish.innerHTML = rad_apl;
	fish.style.left = rad_position + "px";
	document.body.appendChild(fish);
	var fish_down = fish_top(fish);
	if (count === 0) {
		clearInterval(fish_comming);
	}
	array_fish.push({
		alp: rad_apl,
		time: fish_down,
		ele: fish,
		left1: rad_position,
	});
	count--;
}
// fish top
function fish_top(fish) {
	var top = 0;
	var fish_down = null;
	if (rank === 1) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 10);
	} else if (rank === 2) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 9);
	}
	else if (rank === 3) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 8);
	}
	else if (rank === 4) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 7);
	}
		else if (rank === 5) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 6);
	}
		else if (rank === 6) {
		fish_down = setInterval(function() {
			top++;
			fish.style.top = top + "px";
			if (top >= 350) {
				clearInterval(fish_down);
				fish_down = null;
				fish.remove();
				delet(fish);
				grade_box.innerHTML = --grade;
			}
		}, 5);
	}

	return fish_down;
}

//delete

function delet(ele) {
	for (var i = 0, arr; arr = array_fish[i++];) {
		if (arr.ele === ele) {
			array_fish.splice(arr, 1);
		}
	}
}
//paodan
function paodansmall(eve) {
	var e = eve || event;
	var alp = String.fromCharCode(e.keyCode);
	var buibui = document.createElement("div");
	buibui.className = "bullet";
	buibui.style.left = document.documentElement.clientWidth / 2 - 15 + "px";
	buibui.style.top = document.documentElement.clientHeight - 180 + "px";
	document.body.appendChild(buibui);
	for (var i = 0, fish_zhuang; fish_zhuang = array_fish[i++];) {
		if (alp == fish_zhuang.alp) {
			clearTimeout(fish_zhuang.time);
			delet(fish_zhuang.ele);
			setTimeout(function() {
				buibui.style.top = fish_zhuang.ele.offsetTop + 50 + "px";
				buibui.style.left = fish_zhuang.left1 + 15 + "px";
			}, 100);
			setTimeout(function() {
				buibui.remove();
				fish_zhuang.ele.remove();
			}, 1000)
			grade_box.innerHTML = ++grade;

			break;
		}
	}

}
fish_compare();
var fish_comming = setInterval(fish_compare, 1000);


function dengji() {
	if (grade > 5) {
		var bool = confirm("恭喜过关，点击进行下一关");
		if (bool) {
			rank++;
			count = 0;
			grade = 0;
			var fish_comming = setInterval(fish_compare, 1000);
		} else {
			count = 0;
			grade = 0;
			var fish_comming = setInterval(fish_compare, 1000);
		}
	}
}
if (grade > 5) {
	var bool = confirm("恭喜过关，点击进行下一关");
	if (bool) {
		rank++;
		count = 0;
		grade = 0;
	} else {
		count = 0;
		grade = 0;
	}
}
