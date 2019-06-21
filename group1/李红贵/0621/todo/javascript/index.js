// var ele_input = document.getElementById("title");
// var ele_todolist = document.getElementById("title");
// var ele_doneList = document.getElementById("title");

var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");


// 二次封装
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1? ele[0] : ele;
}





function addToDoItem(){
    var iptValue = ele_input.value;
    console.log(iptValue);

    var li = document.createElement("li");
    var ipt = document.createElement("input");
    ipt.type = "checkbox";
    var p = document.createElement("p");
    p.innerHTML = iptValue;
    var a = document.createElement("a");
    a.innerHTML = "-";

    ipt.onchange = changeView;
    a.onclick = removeThisNotes;

    li.appendChild(ipt);
    li.appendChild(p);
    li.appendChild(a);


    ele_todoList.insertBefore(li , ele_todoList.childNodes[0]);

    countNum();
}

function changeView(){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);//第0个子节点
    }else{
        ele_todoList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);
    }
    countNum();
}

function removeThisNotes(){
    this.parentNode.remove();
    countNum();
}
function countNum(){
    var ele_todoCount = $("#todocount");
    var ele_doneCount = $("#donecount")

    var doneCount = ele_doneList.children.length;//子标签元素个数
    console.log(doneCount);
    ele_doneCount.innerHTML = doneCount;

    var todoCount = ele_todoList.children.length;
    console.log(todoCount);
    ele_todoCount.innerHTML = todoCount;
}

//业务 
ele_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        addToDoItem();
        ele_input.value = "";
        ele_input.onfocus;
        // ele_input.select();
    }
}

