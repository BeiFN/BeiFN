var set = document.querySelector("#set");
var man = document.getElementById("man");

man.oncontextmenu = function(evt){
    var e = evt || window.event;
    typeof e.preventDefault === "function" ? e.preventDefault() : e.returnValue = false;
    set.style.display = "block";
    set.style.left = e.clientX + "px";
    set.style.top = e.clientY + "px";
}
set.onclick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    switch(target.innerText){
        case "跑" :
        man.style.left = 100 + "px";
        break;
        case "跳" :
        man.style.top = 100 + "px";
        break;
        case "打篮球" :
        
    }
    set.style.display = "none";
}