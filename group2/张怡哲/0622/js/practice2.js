var ele_pao         = $("#pao");
var ele_pao_text    = ele_pao.children[0];
var clientWidth     = document.documentElement.clientWidth;
var startBtn        = $("#start");
var record          = $("#record");
var letterArray = [];

function $ (selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function createRandomLetter(){
    var randomLetter = 65+Math.round(Math.random()*25); 


    var ele=document.createElement("div");
    ele.className("fish");
}