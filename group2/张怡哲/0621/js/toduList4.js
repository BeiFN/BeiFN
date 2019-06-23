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
        addTodoList();
        ele_input.select();
    }
}

function addTodoList(){
    iptValue = ele_input.value;

    var li = createElement(
        {
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
        }
    );

    ele_todoList.insertBefore(li , ele_todoList.childNodes[0]);

    li.children[0].onchange=addtodoList;
    li.children[2].onclick = removeList;
    countLi();
}

function addtodoList(){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
    }else{
        ele_todoList.insertBefore(this.parentNode , ele_todoList.childNodes[0]);
    }
    countLi();
}

function removeList(){
    this.parentNode.remove();
    countLi();
}

function countLi(){
    var todoCount = ele_todoList.children.length;
    var doneCount = ele_doneList.children.length;
    ele_todoCount.innerHTML = todoCount;
    ele_doneCount.innerHTML = doneCount;
}

function createElement( domJson ){
    typeof domJson === "undefined" ? domJson={} : "";

    //创建元素
    var ele = document.createElement(domJson.type ? domJson.type : "div");

    //添加元素属性
    for (var attr in domJson.attr){
        ele.setAttribute(attr , domJson.attr[attr]);
    }

    //添加元素内容
    ele.innerHTML = domJson.html ? domJson.html : "";

    //添加元素子节点
    for(var i = 0 , childEle;domJson.children && (childEle=domJson.children[i++]); ){
        childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
    }

    return ele;
}