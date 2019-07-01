var ele_input=$("#title");
var ele_todoList=$("#todolist");
var ele_doneList=$("#donelist");
var ele_doneCount = $("#donecount");
var ele_todoCount = $("#todocount");


function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1  ? ele[0] :ele;
}

function addToDOItem(){
    var iptValue=ele_input.value;

    var li=document.createElement("li");
    var ipt=document.createElement("input");
    ipt.type="checkbox";
    var p=document.createElement("p");
    p.innerHTML=iptValue;
    var a=document.createElement("a");
    a.innerHTML="-";

    li.appendChild(ipt);
    li.appendChild(p);
    li.appendChild(a);

    
    //找到节点，绑定事件
    li.children[0].onchange=handlerTodoToDone;
    li.children[2].onclick=removeItem; 
    ele_todoList.insertBefore(li,ele_todoList.childNodes[0]);
    countLi();
}


function handlerTodoToDone(){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
    }else{
        ele_todoList.insertBefore(this.parentNode,ele_todoList.childNodes[0]);
    }
    countLi();
}

function removeItem(){
    this.parentNode.remove();
    countLi();
}

function countLi(){
    var doneCount=ele_doneList.children.length;
    var todoCount=ele_todoList.children.length;
    ele_todoCount.innerHTML=todoCount;
    ele_doneCount.innerHTML=doneCount;
}

ele_input.onkeydown=function(evt){
    var e=evt||window.event;
    if(e.keyCode===13){
        addToDOItem();
        ele_input.select();
    }
}