var target=null;
var cloneEle=null;
document.oncontextmenu = function(evt){
    var e = evt || event;
    typeof e.preventDefault === "function" ? e.preventDefault() : e.returnValue = false;
}
var list1=document.querySelector(".list1");
var list2=document.querySelector(".list2");
var listMenu=document.querySelector(".list-menu");
list1.addEventListener("contextmenu",handelClick);
list2.addEventListener("contextmenu",handelClick);
function handelClick(evt){
    var e=evt||window.event;
    target=e.target;
    console.log(target);
    var nleft=e.clientX;
    var ntop=e.clientY;
    listMenu.style.display="block";
    listMenu.style.left=nleft+"px";
    listMenu.style.top=ntop+"px";
}
document.addEventListener("click",hidden)
function hidden(){
    listMenu.style.display="none";
}
listMenu.addEventListener("click",selectOption)
function selectOption(evt){
    var e=evt||window.event;
    var target=e.target;
    operate(target);
}
function operate(targetEle){
    switch(targetEle.innerHTML){
        case "复制":
            cloneEle = target.cloneNode(true);
            cloneEle.style.cssText = "display:block";
            break;
        case "粘贴":
            target.parentNode.nodeName=="li"?target.parentNode.appendChild(cloneEle):target.appendChild(cloneEle);;
            break;
        case "剪切":
            cloneEle=target;
            cloneEle.style.borderTop="1px solid #ddd";
            break;
        case "删除":
            target.remove();
    }
}