/**
 * @var ele_input               输入框内容
 * @var ele_todolist            正在进行
 * @var ele_tododone            已完成
 * @var ele_todocount           正在进行的个数
 * @var ele_donecount           已经完成的个数
 * 
 */
var 
    ele_input     = $("#title"),
    ele_todolist  = $("#todolist"),
    ele_tododone  = $("#donelist"),
    ele_todocount = $("#todocount"),
    ele_donecount = $("#donecount");

function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}
function handlerTolist(){
    var iptValue = ele_input.value;
    var li = createElement({
        type : "li",
        children :[
            {
                type : "input",
                attr : {
                    type :"checkbox"
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
    li.children[0].onchange = handlerTododone;
    li.children[2].onclick = handlerCilck;

    ele_todolist.insertBefore(li,ele_todolist.childNodes[0]);
    countList();
}

function countList(){
    console.log(ele_todolist.children);
    var counttodo = ele_todolist.children.length;
    var countdone = ele_tododone.children.length;
    
    ele_donecount.innerHTML = countdone;
    ele_todocount.innerHTML = counttodo;
}

function handlerCilck(){
    this.parentNode.remove();
    countList();
}

function handlerTododone(){
    if(this.checked){
        console.log(ele_tododone.childNodes);
        ele_tododone.insertBefore(this.parentNode , ele_tododone.childNodes[0]);
    }
    else{
        ele_todolist.insertBefore(this.parentNode , ele_todolist.childNodes[0]);
    }
    countList();
}

function createElement(domJson){
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "li");
    for ( var item in domJson.attr){
        ele.setAttribute(item,domJson.attr[item]);
    }
    ele.innerHTML = domJson.html ? domJson.html : "";
    for ( var i = 0 , childEle; domJson.children && (childEle = domJson.children[i ++]);){
        childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
    }
    return ele;
}

ele_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        handlerTolist();
        ele_input.select();
    }
}



