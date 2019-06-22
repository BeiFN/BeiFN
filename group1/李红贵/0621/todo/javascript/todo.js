function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1? ele[0] :ele;
}

var ele_input = $("#title");
var ele_todolist = $("#todolist");
var ele_donelist = $("#donelist");
var ele_todocount = $("#todocount");
var ele_donecount = $("#donecount");


ele_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        addToDoItem();
        ele_input.select();
    }
}

function addToDoItem(){
    var iptValue = ele_input.value;
    console.log(iptValue);
    var li = createElement({
        type : "li",
        children :[
            {
                type : "input",
                attr :{
                    type : "checkbox"
                }
            },
            {
                type : "p",
                html : iptValue
            },
            {
                type : "a",
                html : "-"
            }
        ],
    });
    console.log(li);
    li.children[0].onchange = handlerTodoToDone;
    li.children[2].onclick = removeItem;
    ele_todolist.insertBefore(li, ele_todolist.childNodes[0]);
    countNum();

}
function countNum(){
    ele_todocount.innerHTML = ele_todolist.children.length;
    ele_donecount.innerHTML = ele_donelist.children.length;
}
function removeItem(){
    this.parentNode.remove();
    countNum();
}
function handlerTodoToDone(){
    if(this.checked){
        ele_donelist.insertBefore(this.parentNode, ele_donelist.children[0]);
    
    }else{
        ele_todolist.insertBefore(this.parentNode, ele_todolist.children[0]);
    }
    countNum();
}
function createElement(domJson){
    typeof domJson === "undefined"? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for(var attrib in domJson.attr){
        ele.setAttribute(attrib , domJson.attr[attrib]);
    }
    ele.innerHTML = domJson.html?domJson.html : "";

    console.log(domJson.children);

    for(var i = 0,childele; domJson.children && (childele = domJson.children[i++]);){
        childele.nodeType === 1? ele.appendChild(childele) : ele.appendChild( createElement(childele) );
    }
    console.log(ele);
    return ele;

}