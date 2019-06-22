/** 
 * 
 * @var ele_input 输入框
 * @var ele_todoList    todo列表
 * @var ele_doneList    done列表
 * 
 * */ 
var ele_input   = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");

/**
 * 
 * 
 * @param {选择符：string}
 * 返回一个dom或者一个伪数组，承载一组dom；
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1? ele[0]:ele;
}
function addTodoItem(){
    var iptValue = ele_input.value;
    var li = document.createElement('li');
    var ipt = document.createElement("input");
    ipt.type = "checkbox";
    var p = document.createElement("p");
    p.innerHTML = iptValue;
    var a = document.createElement("a");
    a.innerHTML = "-"
    li.append(ipt);
    li.appendChild(p);
    li.appendChild(a);
    ele_todoList.appendChild(li);
}
console.log(createElement("p","innerHTML","hello world"));

var p = {
    type :"p",
    attr:{
        class : "hello"
    },
    html:"hello world"
}
function createElement(domJson){
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for(var attr in domJson.attr){
        ele.setAttribute(attr,domJson.attr[attr]);
    }
    ele.innerHTML = domJson.html ? domJson.html: "";
    return ele;
}
createElement(p);










//按下回车键
    ele_input.onkeydown = function(evt){
        var e = evt || window.event;
        if(e.keyCode == 13){
            addTodoItem();
            ele_input.select();
        }
    }

