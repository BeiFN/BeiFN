var ele_ipt = $("#title");
var ele_todolist = $("#todolist");
var ele_donlist = $("#donelist");
var ele_todoCount = $("#todocount");
var ele_doneCount = $("#donecount");


function addTodoItem(){
    // var iptValue = ele_ipt.value;
    // var li = document.createElement("li");
    // var input = document.createElement("input");
    // input.type = "checkbox";
    // var p = document.createElement("p");
    // p.innerHTML = iptValue;
    // var a = document.createElement("a");
    // a.innerHTML = "-";

    var li = createElement({
        type : "li",
        children:[
            {
                type:"input",
                attr:{
                    type:"checkbox",
                }
            },
            {
                type:"p",
                html:ele_ipt.value,
            },
            {
                type:"a",
                html:"-",
            }
        ]
    })


    // li.appendChild(input);
    // li.appendChild(p);
    // li.appendChild(a);



    ele_todolist.insertBefore(li,ele_todolist.children[0]);
    countLi();
    li.children[0].onchange = moveToDoneList;
    li.children[2].onclick = removeItem;
}


function createElement(domJson){
    typeof domJson ==="undefined" ? domJson = {} : "";

    var ele = document.createElement(domJson.type ?domJson.type : "div");

    for( var attrs in domJson.attr){
        ele.setAttribute(attrs,domJson.attr[attrs]);
    }

    ele.innerHTML  = domJson.html ? domJson.html : "";

    for(var i = 0 , childEle ; domJson.children && (childEle = domJson.children[i++]) ;  ){
        childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));  
    }

    return ele;

}


function moveToDoneList(){
    if(this.checked){
        ele_donlist.insertBefore(this.parentNode,ele_donlist.children[0]);
    }else{
        ele_todolist.appendChild(this.parentNode);
    }
    countLi();
} 

function removeItem(){
    this.parentNode.remove();
    countLi();
}
function countLi(){
    var todolistcount = ele_todolist.children.length;
    var donelistcount = ele_donlist.children.length;
    ele_todoCount.innerHTML = todolistcount;
    ele_doneCount.innerHTML = donelistcount;
}


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}





document.onkeydown = function(evt){
    var e = evt || event ;
    if(e.keyCode === 13 ){
        addTodoItem();
        ele_ipt.select();
    }
}