var ele_menu = document.querySelector(".opt")
var selectTarget = null;
var cloneEle = null;
document.oncontextmenu = function(evt){
    var e = evt || window.event;
    typeof e.preventDefault === "function" ? e.preventDefault():e.returnValue = false;
    ele_menu.style.display = "block";
    ele_menu.style.left = e.clientX + "px";
    ele_menu.style.top = e.clientY + "px";
    var target = e.target || e.srcElement;
    selectTarget ? selectTarget.style.background ="" :"";
    selectTarget = target;
    selectTarget.style.background = "yellowgreen";
}
document.onclick = function(evt){
    var e = evt || window.event;
    ele_menu.style.display = "none";
}
ele_menu.onclick = function(evt){
    var e= evt || event;
    var target = e.target || e.srcElement;
    switch(target.innerHTML){
        case "复制":
            cloneEle = selectTarget.cloneNode(true);
            cloneEle.style.cssText = "display:block";
            break;
        case "粘贴" : 
            selectTarget.appendChild(cloneEle);
            break;
        case "剪切":
            cloneEle = selectTarget;
            break;
        case "删除" :
            selectTarget.remove();
            break;
    }
}