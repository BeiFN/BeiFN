var ele_input = $("#title");
var ele_todoList =$("#todolist");
var ele_doneList = $("#donelist");

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length   === 1?   ele[0]:ele;

}


function addTodoItem(){
    var iptValue = ele_input.value;
    var li = createElement({
        type : "li",
        children :[
            {
                type : "input",
                attr:{
                    type : "checkbox"
                }
            },
            {
                type : "p",
                html: iptValue
            },
            {
                type : "a",
                html :"-"
            }
        ]
    })
    ele_todoList.insertBefore( li , ele_todoList.childNodes[0] );
    li.children[0].onchange = handlerTodoToDone;
    function handlerTodoToDone (){
        if(this.checked){
            ele_doneList.insertBefore(this.parentNode,  ele_doneList.children[0] );
        }else{
            ele_todoList.insertBefore(this.parentNode , ele_todoList.children[0]);
        }
    }
}
function createElement(domJson){
    typeof domJson === "undefined" ? domJson = {} : "" ;
    var ele = document.createElement(domJson.type ? domJson.type : "div" );
    //添加属性
    console.log(ele);
    for (var attr in domJson.attr){
        ele.setAttribute(attr,domJson.attr[attr]);
       
    }
    //添加html属性
    ele.innerHTML = domJson.html ? domJson.html : "";
    //判断是否存在子集
    for(var i = 0,childNode;childNode = domJson.children && (childEle = domJson.children[i++]);){
        childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild(createElement(childNode));
    }
    return ele;
}

ele_input.onkeydown = function(evt){
    var e = evt || event ;
    if(e.keyCode === 13){
        addTodoItem();
    }
}