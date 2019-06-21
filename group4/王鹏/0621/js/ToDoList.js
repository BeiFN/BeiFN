var ele_todolist = document.getElementById("todolist");
var ele_donelist = document.getElementById("donelist");
var ele_input = document.getElementById("title");


// 创建li结构   第一版
function addTodoItem() {
    var iptValue = ele_input.value;

    var li = document.createElement("li");
    var ipt = document.createElement("input");
    ipt.type = "checkbox";
    var p = document.createElement("p");
    p.innerHTML = iptValue;
    var a = document.createElement("a");
    a.innerHTML = "-";

    li.appendChild(ipt);
    li.appendChild(p);
    li.appendChild(a);
    ele_todolist.appendChild(li);
}




// 创建li结构  第二版
// 元素结构json
// var ele = {
//     type : "li",  
//     attr : {         // 可能有多个属性
//         class : "hello"
//     },
//     html : "hahaha",
//     children : {     // 可能有多个children
//         {
//             type : "p",
//             attr : {
//                 class : pp
//             },
//             html : "ppppp"
//         }
//     },
// }
function createElement(domJson) {
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for(var attr in domJson.attr) {
        ele.createAttribute(attr, domJson[attr].attr);
    }
    ele.innerHTML = domJson.html ? domJson.html :"";

    
    for(var i = 0, childEle ; domJson.children && (childEle = domJson.children[i++]) ;  ){
        childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild( createElement(childEle) );
    }
}










ele_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}
