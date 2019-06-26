/**
 * 选择器 
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var eleInput = $("#title");
var eleTodoList = $("#todoList");
var eleDoneList = $("#doneList");
var eleTodoCount = $("#todoCount");
var eleDoneCount = $("#doneCount");

/**
 * 增加一个li
 */
function addItem(){
    var iptValue = eleInput.value;
    if(!iptValue){
        alert("输出不能为空！");
        return false;
    }
    var li = createItem({
        type : "li",
        children : [
            {
                type : "input",
                attr : {
                    type : "checkbox",
                }
            },
            {
                type : "p",
                html : iptValue,
            },
            {
                type : "a",
                html : "-",
            }
        ]
    })
    eleTodoList.insertBefore(li,eleTodoList.childNodes[0]);
    li.children[0].onchange = changeLi;
    li.children[2].onclick = removeItem;
    countLi();
}
/**
 * 改变li的位置
 */
function changeLi(){
    if(this.checked){
        eleDoneList.insertBefore(this.parentNode , eleDoneList.childNodes[0]);
    }else{
        eleTodoList.insertBefore(this.parentNode , eleTodoList.childNodes[0]);
    }
    countLi();
}
/**
 * 删除一个li
 */
function removeItem(){
    this.parentNode.remove();
    countLi();
}
/**
 * 计算li数量
 */
function countLi(){
    var todoCount = eleTodoList.children.length;
    var doneCount = eleDoneList.children.length;
    eleTodoCount.innerHTML = todoCount;
    eleDoneCount.innerHTML = doneCount;
}
/**
 * {
 *      type : XXX,
 *      attr : {
 *          class : "value",
 *      }
 *      html : xxx,
 *      children : [],
 * } 
 */
function createItem(itemJson){
    typeof itemJson === "undefined" ? {} : "";
    var ele = document.createElement(itemJson.type ? itemJson.type : "div");
    for(var attr in itemJson.attr){
        ele.setAttribute(attr , itemJson.attr[attr]);
    }
    ele.innerHTML = itemJson.html ? itemJson.html : "";
    for(var i = 0 , childNode; itemJson.children && (childNode = itemJson.children[i++]); ){
        childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild(createItem(childNode));
    }
    return ele;
}

eleInput .onkeydown = function(evt){
    var e = evt || event;
    if(e.keyCode === 13){
        addItem();
        eleInput.select();
    }
}