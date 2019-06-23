var ele_input          = $("#title");
var ele_todoList       = $("#todolist");
var ele_doneList       = $("#donelist");
var ele_todoCount      = $("#todocount");
var ele_doneCount      = $("#donecount");

function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1 ? ele[0] : ele;
}

ele_input.onkeydown=function (evt){
    var e=evt||event;
    if(e.keyCode===13){
        addTodoItem();
        ele_input.select();
    }
}

function addTodoItem(){
    var iptValue = ele_input.value;
    var li = createElement({
        type : "li",
        children : [
            {
                type : "input",
                attr : {
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
        ]
    })
    console.log(li);
    ele_todoList.insertBefore(li , ele_todoList.childNodes[0]);

    li.children[0].onchange = handlerTodoToDone;
}

function handlerTodoToDone(){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
    }else{
        ele_todoList.insertBefore(this.parentNode,ele_todoList.childNodes[0]);
    }
}

function createElement(domJson){
    typeof domJson==="undefined" ? domJson={} : "";

    //创建元素
    var ele=document.createElement(domJson.type ? domJson.type : "div");

    //设置元素属性
    for (var attr in domJson.attr){
        ele.setAttribute(attr , domJson.attr[attr]);
    }

    //设置元素内容
    ele.innerHTML = domJson.html ? domJson.html : "";

    //设置元素子节点
    for (var i=0 , childEle; domJson.children && (childEle=domJson.children[i++]);){
        childEle.nodeType===1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
    }
    
    return ele;
}