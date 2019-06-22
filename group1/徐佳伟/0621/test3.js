var 
    ele_input     = $("#title"),
    ele_todolist  = $("#todolist"),
    ele_donelist  = $("#donelist"),
    ele_todocount = $("#todocount"),
    ele_donecount = $("#donecount");

function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

function handlerTolist(){
    var inputValue = ele_input.value;
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
                html : inputValue
            },
            {
                type : "a",
                html : "-"
            }
        ]
    });  
    li.children[0].onchange = handlerChange; 
    li.children[2].onclick = handlerClick;
    ele_todolist.insertBefore(li,ele_todolist.childNodes[0]);
    countNum();
}

function handlerClick(){
    this.parentNode.remove();
    countNum();
}

function countNum(){
    var 
        todocount = ele_todolist.children.length,
        donecount = ele_donelist.children.length;
        ele_donecount.innerHTML = donecount;
        ele_todocount.innerHTML = todocount;
}

function handlerChange(){
    if(this.checked){
        ele_donelist.insertBefore(this.parentNode,ele_donelist.childNodes[0]);
    }else{
        ele_todolist.insertBefore(this.parentNode,ele_todolist.childNodes[0]);
    }
    countNum();
}

function createElement(domJson){
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "li");
    for (var item in domJson.attr){
        ele.setAttribute(item,domJson.attr[item]);
    }
    ele.innerHTML = domJson.html ? domJson.html : "";

    for (var i = 0,childEle ; domJson.children && (childEle = domJson.children[i++]);){
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
