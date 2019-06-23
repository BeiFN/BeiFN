var pao = document.getElementById("pao");
var fish = document.getElementById("fish");
var client_width = document.documentElement.clientWidth;


// 创建鱼
setInterval(createFish, 1000);

function createFish(evt) {
    // var e = evt || event;
    var fish = document.createElement("div");
    fish.id = "fish";
    var span = document.createElement("span");
    //调用创造字母函数
    span.id = "f_span";
    fish.appendChild(span);
    document.body.appendChild(fish);
    //获得随机字母

    span.innerHTML = randomLetter();
    fishMove(fish);
}



//鱼获得随机字母
function randomLetter() {
    var shu = 65 + Math.round(Math.random() * 25)
    var letter = String.fromCharCode(shu);
    return letter;
    // console.log(fish.children[0].innerHTML);
}
//鱼移动
// console.log(rand_left);

// rand_top = fish.offsetTop;
// console.log(fishTop);

function fishMove(ele) {

    var numTop = 0;
    var timer = null;
    timer = setInterval( function (){
          numTop += 1;
        //   ele.style.left = Math.round(Math.random()*document.documentElement.clientWidth -160)+"px";
          ele.style.top = numTop + "px";
          if(numTop >= 500){
                clearInterval(timer);
                // 清空变量，让变量内的数据被垃圾回收机制回收;
                timer = null;
                ele.className += " die";
                // 动画运行结束删除元素;
                setTimeout( function (){
                      removeRecord(ele)
                      ele.remove();
                } ,1000)
          }
    },50)
    return timer;

}

//文字输入
function onkeydown(evt) {

    handlerEnterLetter();

    createFish(evt);


}

function handlerEnterLetter(evt) {
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