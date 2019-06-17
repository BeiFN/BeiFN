//切换图片
var gt = document.querySelector(".gt");
var img = document.querySelectorAll(".img");
var i = 0;
gt.onclick = function () {

    img[i].style = "display:block;";
    if (i++ < img.length - 1) {
        // img[i].style="display:block;";
        for (var j = 0; j < img.length; j++) {
            img[j].style = "display:none;"

            // console.log(img.length);
        }
        img[i].style = "display:block;";

    }
    else {
        i = 0;
        for (var k = 0; k < img.length; k++) {
            img[k].style = "display:none;"

            // console.log(img.length);
        }
        img[0].style = "display:block;";
    }
    console.log(i, j);
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
       var bool= contains(excarr, radomNum);
        if (bool==true) continue;
        excarr.push(radomNum);
        exchange1[radomNum].style = "display:block";
        sum++;
        if(sum==5) break;
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