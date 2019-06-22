var ipt=$$("#title");
var todolist=$$("#todolist");
var donelist=$$("#donelist");
var todocount=$$("#todocount");
var donecount=$$("#donecount");
console.log(donelist);
function $$(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ;
}
ipt.onkeydown=function(evt){
    var e=evt||window.event;
    if(e.keyCode===13){
        addItem();
    }
   
}
function addItem(){
    var iptValue=ipt.value;
    var li=document.createElement("li");
    var input=document.createElement("input");
    input.setAttribute("type","checkbox");
    var p=document.createElement("p");
    p.innerHTML=iptValue;
    var a=document.createElement("a");
    a.innerHTML="-";
    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(a);
    todolist.insertBefore(li,todolist.childNodes[0]);
    ipt.select();
    input.onchange=handelChange;
    a.onclick=removeItem;
    count();
}
function handelChange(){
    if(this.checked){
        donelist.insertBefore(this.parentNode,donelist.childNodes[0]);
        count();
    }else{
        todolist.insertBefore(this.parentNode,todolist.childNodes[0]);
        count();
    }
    
}
function removeItem(){
    this.parentNode.remove();
}
function count(){
    todocount.innerHTML=todolist.children.length;
    donecount.innerHTML=donelist.children.length;
}
