/**
 * @var ele_input          输入框元素
 * @var ele_todoList       todo列表
 * @var ele_doneList       done列表
 * @var ele_todoCount      todo数量
 * @var ele_doneCount      done数量
 */
var ele_input =  o("#title");
var ele_todoList = o("#todolist");
var ele_doneList = o("#donelist");
var ele_todoCount =o("#todocount");
var ele_doneCount = o("#donecount");



/**
 * 
 * @param {选择符：string} querySelectorAll 
 * 根据ele判断是一个dom还是一个伪数组，如果是伪数组，根据下标获取具体dom
 */
function  o(selector){
    var ele = null;
    return(ele = document.querySelectorAll(selector)).length === 1? ele[0]: ele;
}

function addTodoItem(){
    var iptValue = ele_input.value;
    var li = createElement({
        type:"li",
        children:[
            {
                type:"input",
                attr: {
                    type: "checkbox"
                 }
            },
            {
                type: "p",
                html: iptValue
            },
            {
                type: "a",
                html: "-"
            }
        ]
    });
    ele_todoList.insertBefore(li,ele_todoList.children[0]);
    li.children[0].onchange = handlerToDone;
    li.children[2].onclick = removeItem;
    countLi();
}
function  handlerToDone (){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
    }else{
        ele_todoList.insertBefore(this.parentNode,ele_todoList.childNodes[0]);
    }
    countLi();
}
function removeItem(){
    this.parentNode.remove();
    countLi();
}
function countLi(){
    var doneCount = ele_doneList.children.length;
    var todoCount = ele_todoList.children.length;
    ele_todoCount.innerHTML = todoCount;
    ele_doneCount.innerHTML =doneCount;
}
function createElement(domJson){
    typeof domJson === "undefined" ? domJson ={} : "";

    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for(var attr in domJson.attr){
        ele.setAttribute(attr,domJson.attr[attr]);
    }

    ele.innerHTML = domJson.html ? domJson.html : "";
    //增加插入元素的功能；children
    //所有引用类型隐式数据类型转换为  true；
    for( var i = 0,childEle;domJson.children&& (childEle = domJson.children[i++]);){
        childEle.nodeType ===1? ele.appendChild(childEle):ele.appendChild(createElement(childEle));
    }
    return ele;
}
//--------------------------------------------------
ele_input.onkeydown = function (evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        addTodoItem();
        ele_input.select();
    }
}