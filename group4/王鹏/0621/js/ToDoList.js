
var ele_todolist = $("#todolist");
var ele_donelist = $("#donelist");
var ele_input = $("#title");
var ele_todocount = $("#todocount");
var ele_donecount = $("#donecount");

// -----------------------------------------------------------------------------------------------------
// 选择器封装
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}




// // 创建li结构   第一版
// function addTodoItem() {
//     var iptValue = ele_input.value;

//     var li = document.createElement("li");
//     var ipt = document.createElement("input");
//     ipt.type = "checkbox";
//     var p = document.createElement("p");
//     p.innerHTML = iptValue;
//     var a = document.createElement("a");
//     a.innerHTML = "-";

//     li.appendChild(ipt);
//     li.appendChild(p);
//     li.appendChild(a);
//     ele_todolist.appendChild(li);
// }

// // 创建li结构  第二版
// // 元素结构json     可选：type、attr、children、html
function addTodoItem(){
    var iptValue = ele_input.value;
    var li = createElement({
        type : "li",
        // attr : {
        //     class : 
        // },
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
    });
    ele_todolist.insertBefore(li, ele_todolist.childNodes[0]);


    li.children[0].onchange = handlerTodoToDone;
    li.children[2].onclick = removeItem;
    countLi();
}

function createElement(domJson) {
    // 可选type，默认创建div
    var ele = document.createElement(domJson.type ? domJson.type : "div");

    for(var attr in domJson.attr) {
        ele.setAttribute(attr, domJson.attr[attr]);
    }
    // 可选html
    ele.innerHTML = domJson.html ? domJson.html :"";
    // 可选children
    for(var i = 0,chil_ele;domJson.children && (chil_ele = domJson.children[i++]);) {
        chil_ele.nodeType === 1 ? ele.appendChild(chil_ele) : ele.appendChild(createElement(chil_ele));
    }
    return ele;     // 返回元素结构
}


// 点击CheckBox换位
function handlerTodoToDone(){
    if(this.checked) {
        ele_donelist.insertBefore(this.parentNode, ele_donelist.children[0]);
    } else {
        ele_todolist.insertBefore(this.parentNode, ele_todolist.children[0]);
    }
    countLi();
}
// 点击删除
function removeItem(){
    this.parentNode.remove();
    countLi();
}
// 计数
function countLi() {
    var todocount = ele_todolist.children.length;
    var donecount = ele_donelist.children.length;
    ele_todocount.innerHTML = todocount;
    ele_donecount.innerHTML = donecount;
}



// ------------------------------------------------------------------------------------------------
ele_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}
