//切换图片
var gt = document.querySelector(".gt");
var lt=document.querySelector(".lt");
var img = document.querySelectorAll(".img");
var i = 1;
var k=img.length;
gt.onclick = change_bigimg;
lt.onclick= turn_left;
setInterval(change_bigimg,10000);




function change_bigimg(){
        for(var n in img){
            img[n].style="display:none";
        }
        img[i++].style="display:block";
        if(i==img.length) i=0;
        console.log(i,img.length)
}

function turn_left(){
    for(var n in img){
        img[n].style="display:none";
    }

        img[i--].style="display:block"
        if(i<0) i=img.length-1;

}



//换一换
// var exchange1=document.querySelectorAll(".eighth_bottom ul li");
document.querySelector(".exchange").onclick = function () {
    var exchange1 = document.querySelectorAll(".eighth_bottom ul li");
    for (var j = 0; j < exchange1.length; j++) {
        exchange1[j].style = "display:none";
    }
    var excarr = [];
    var sum = 0;
    while (true) {
        var radomNum = parseInt(Math.random() * exchange1.length);
        var bool = contains(excarr, radomNum);
        if (bool == true) continue;
        excarr.push(radomNum);
        exchange1[radomNum].style = "display:block";
        sum++;
        if (sum == 5) break;
    }

}
//判断是否在数组内
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}  