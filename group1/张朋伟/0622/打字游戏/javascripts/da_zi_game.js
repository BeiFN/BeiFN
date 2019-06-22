var pao = document.getElementById("pao");
var fish = document.getElementById("fish");
var client_width = document.documentElement.clientWidth;


// 创建鱼
function createFish(evt) {
    var e = evt || event;
    var fish = document.createElement("div");
    fish.id = "fish";
    var span = document.createElement("span");
    span.id = "f_span";
    fish.children(span);
    

}

//鱼获得随机字母
function randomLetter() {
    var shu = 65 + Math.round(Math.random() * 25)
    var letter = String.fromCharCode(shu);
    console.log(letter);
    fish.children[0].innerHTML = letter;
}
//鱼移动
// console.log(rand_left);
fishMove();
// rand_top = fish.offsetTop;
console.log(fishTop);

function fishMove() {
    fishTop = 0;
    var timer = null;
    timer = setInterval(function () {
        fishTop += 5;
        fish.style.top = fishTop + "px";
        rand_left = Math.round(Math.random() * (client_width - 160));
        fish.style.left = rand_left + "px";
        if (fishTop > 500) {
            clearInterval(timer);
            timer = null;
            fish.className = "die";
            setTimeout(
                function () {
                    fish.remove();
                }
            ), 1000
        }
        return fishTop;
    }), 1000

}

//文字输入
function onkeydown(evt) {

    handlerEnterLetter();
    createBullet(evt);


}

function handlerEnterLetter() {
    var e = evt || event;
    var onkeydown = e.keyCode || e.witch;
    if (code >= 65 && code <= 90) {
        code = String.fromCharCode(code);
        pao.children[0] = code;
    } else return false;
}
// function createBullet(evt){
//     var e = evt || event;
//     var fishes = document.createElement("div");
//     fishes.id = "pao";

// }