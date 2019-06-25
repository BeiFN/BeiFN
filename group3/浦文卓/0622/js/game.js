/**
 * 在#pao上加字母
 * 
 *  */


var ele_pao = document.getElementById("pao");
// var ele_pao_text = ele_pao.children[0];
//这一步是干什么？？？？？
// function selector(selector){
//     var ele = null;
//     return(ele = document.querySelectorAll(selector).length === 1?ele[0]:ele);
// }
document.onkeydown = letterEnter;
function letterEnter(){
    var e = event || evt;
    keycode = e.keyCode || e.which;
    if(keycode >= 65 && keycode <= 90){
        letter = String.fromCharCode(keycode);
        //  = 65 + Math.round(Math.random() * 25);
        console.log(letter);
        ele_pao.innerHTML = letter;
    }
}


/**
 * 
 * 鱼在这
 * 
 */
// var time = null;
var clientWidth = document.documentElement.clientWidth;
 function createFish(){

     var randomLetter = 65 + Math.round(Math.random() * 25);
     var ele = document.createElement("div");
     ele.className = "fish";
     ele.style.top = 0;
     ele.style.left = Math.round(Math.random() * (clientWidth - 100)) + "px";
     ele.innerHTML = String.fromCharCode(randomLetter);
    //  console.log(ele);
     document.body.appendChild(ele);
     var movefish = fishMove(ele);
     list.push({
        move : movefish,
        randomLetter : String.fromCharCode(randomLetter),
        
    })
    
 } 
 createFish();
 time = setInterval(createFish,3000);

/**
 * 
 * 鱼动了
 * 
 */

var list = [];
var move = null;
function fishMove(ele){
    var numtop = 0;
    movefish = setInterval(function(){
        numtop += 20;
        // ele = document.getElementsByClassName("fish");
        ele.style.top = numtop + "px";
        // console.log(ele.offsetTop);
        if(numtop >= 450){
            ele.className += " die";
            
        }
    },300);
        
}


/**
 * 
 * 这是炮弹
 * 
 */

function bulletCreate(){
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.top = ele_pao.offsetTop + "px";
    ele.style.left = (clientWidth / 2 - 15) + "px";
    console.log(ele);
    document.body.appendChild(ele);
}
bulletCreate();
