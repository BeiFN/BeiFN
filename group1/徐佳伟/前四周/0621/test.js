/**
 * 声明变量 
 * @var ele_input         输入框元素
 * @var ele_todolist      todo列表
 * @var ele_donelist      done列表
 * @var todocount         todo总条数
 * @var donelist          done总条数
 */
var 
    ele_input    = $("#title"),
    ele_todolist = $("#todolist"),
    ele_donelist = $("#donelist"),
    todocount    = $("#todocount"),
    donecount    = $("#donecount");

/**
 * 封装获取id
 * @param {} selector 
 */
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

/**
 * 记录数据
 */
function countLi(){
    var donelength = ele_donelist.children.length;
    var todolength = ele_todolist.children.length;
    todocount.innerHTML = todolength;
    donecount.innerHTML = donelength;
}

/**
 * 复选框点击
 */
function handlerTodoDone(){
    if(this.checked){
        ele_donelist.insertBefore(this.parentNode,ele_donelist.childNodes[0]);
    }else{ 
        ele_todolist.insertBefore(this.parentNode,ele_todolist.children[0]);
    }
    countLi();
}
/**
 * 删除
 */
function removeLi(){
    this.parentNode.remove();
    countLi();
}

// var li = {
//     type : "li",
//     children : [
//         {
//             type : "input",
//             attr : "checkbox"
//         },
//         {
//             type : "p",
//             innerHTML :ele_input.value
//         },
//         {
//             type : "a",
//             innerHTML : "-"
//         }
//     ]
// };
function handlerToDo(){
    var iptValue = ele_input.value;
    var li  =  createElement({
        type : "li" ,
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
    ele_todolist.insertBefore(li,ele_todolist.children[0]);
    li.children[0].onchange = handlerTodoDone;
    li.children[2].onclick = removeLi;
    countLi();
}

function createElement(jsonLi){
    var ele = document.createElement( jsonLi.type ? jsonLi.type : "div");
    typeof jsonLi === "undefined" ? jsonLi = {} :jsonLi;
    for(var attr in jsonLi.attr){
        ele.setAttribute(attr,jsonLi.attr[attr]);
    }
    ele.innerHTML = jsonLi.html ? jsonLi.html : "";

    // 增加插入元素的功能; children;
    // 所有引用类型隐式数据类型转换为 true ;
    for(var i = 0 , eleChild ; jsonLi.children && (eleChild = jsonLi.children[i ++]);){
        eleChild.nodeType === 1 ? ele.appendChild( eleChild ) : ele.appendChild(createElement(eleChild));
    }
    return ele;
}
// function handlerToDolist(){
//     var iptValue = ele_input.value;
//     var li = document.createElement("li");
//     var input = document.createElement("input");
//     var p = document.createElement("p");
//     var a = document.createElement("a");
//     input.type = "checkbox";
//     p.innerHTML = iptValue;
//     a.innerHTML = "-";
//     li.appendChild(input);
//     li.appendChild(p);
//     li.appendChild(a);
//     ele_todolist.appendChild(li);
//     input.onchange = handlerTodoDone;
//     a.onclick = removeLi;
    
// }
/**
 * 业务部分
 */
ele_input.onkeydown = function(evt){
    var e = evt || event;
    if(e.keyCode === 13){
        handlerToDo();
        ele_input.select();
    }
}
