var 
    todolist  = $("#todolist"),
    donelist  = $("#donelist"),
    ele_input = $("#title"),
    todocount = $("#todocount"),
    donecount = $("#donecount");


function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}

function createElement(domJson){
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for(var attr in domJson.attr){
        ele.setAttribute(attr,domJson.attr[attr]);
    } 
    ele.innerHTML = domJson.html ? domJson.html : "";

    for( var i = 0 , e ; domJson.children && ( e = domJson.children[i++]);){
        e.nodeType === 1 ? ele.appendChild(e) : ele.appendChild(createElement(e));       
    }
    return ele;
}

function handlerAddToDoList(){
    var iptValue = ele_input.value;
    if(!iptValue){
        return false;
    }
    var li = createElement({
        type : "li",
        children : [
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
        ]
    })
    todolist.insertBefore(li,todolist.childNodes[0]);
    // todolist.appendChild(li);
    ele_input.value = "";
    li.children[0].addEventListener("change",handlerAddToDoDone);
    li.children[2].addEventListener("click",handlerClickRemove);
    countLiNum();
}

function handlerAddToDoDone(){
    if(this.checked){
        donelist.insertBefore(this.parentNode,donelist.childNodes[0]);
        // donelist.insertBefore(this.parentNode,donelist.children[0]);
    }else{
        todolist.appendChild(this.parentNode);
    }
    countLiNum();
}

function handlerClickRemove(){
    this.parentNode.remove();
    countLiNum();
}

function countLiNum(){
    var donelistLi = donelist.children;
    var todolistLi = todolist.children;
    todocount.innerHTML = todolistLi.length;
    donecount.innerHTML = donelistLi.length;
}

function handlerinputKeydown(evt){
    var e = evt || window.event;
    var charCode = e.charCode || e.which;
    if(charCode === 13){
        console.log(1);
        handlerAddToDoList();
    }
}

ele_input.addEventListener("keydown",handlerinputKeydown);