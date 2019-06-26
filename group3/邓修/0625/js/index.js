"use strict"
/**
 * 
 *    @var ele_input          输入框元素
 *    @var ele_todoList       todo列表
 *    @var ele_doneList       done列表
 *    @var todoCount          未完成数量
 *    @var doneCount          已完成数量
 */

var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var todoCount = $("#todocount");
var doneCount = $("#donecount");


/**
* @param {选择符:string} selector 
* 返回一个dom或者一个伪数组,承载一组dom;
*/
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
// 添加一件未完成的事
function addItem() {
    var itemValue = ele_input.value;
    // 创建一项未完成的事
    var li = createElement({
        type: "li",
        children: [
            {
                type: "input",
                attr: {
                    type: "checkbox"
                }
            },
            {
                type: "p",
                html: itemValue
            },
            {
                type: "a",
                html: "-"
            }
        ]
    });
    //将创建的事插入未完成列表中
    ele_todoList.insertBefore(li, ele_todoList.childNodes[0]);
    countItem();
    //给添加的节点绑定事件
    li.children[0].onchange = change_between_todoAndDone;
    li.children[2].onclick = removeItem;
}
// 创建一个要插入的元素
function createElement(ele_li) {
    //参数为空
    typeof ele_li === "undefined" ? ele_li = {} : "";
    //type参数是否为空
    var ele = document.createElement(ele_li.type ? ele_li.type : "div");
    //添加属性
    for (var i in ele_li.attr) {
        ele.setAttribute(i, ele_li.attr[i]);
    }
    //添加innerHTML
    ele.innerHTML = ele_li.html ? ele_li.html : "";
    //判断是否存在子集
    for (var j = 0, child; ele_li.children && (child = ele_li.children[j++]);) {
        child.nodeType === 1 ? ele.appendChild(child) : ele.appendChild(createElement(child));
    }
    return ele;
}

// 未完成的事与完成的事之间转换
function change_between_todoAndDone() {
    if (this.checked) {
        ele_doneList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);
        countItem();
    }
    else {
        ele_todoList.insertBefore(this.parentNode, ele_todoList.childNodes[0]);
        countItem();
    }
}

// 移除一件事
function removeItem(){
    this.parentNode.remove();
    countItem();
}

// 对列表中的事件计数
function countItem(){
    todoCount.innerHTML=ele_todoList.children.length;
    doneCount.innerHTML=ele_doneList.children.length;
}
//选中项目文字进行更改
function handlerChangeText(){
    if(this.children.length>=1) return false;   //如果当前p元素的子元素个数大于等于1，停止执行函数
    var input=createElement({                   //创建一个内容为p元素内容的输入框 
        type:"input",
        attr:{
            type:"text",
            value:this.innerHTML
        }
    });
    this.innerHTML="";
    this.appendChild(input);
    input.select();
}
//完成内容修改，点击输入框以外的区域设置内容
function handlerWriteText(){
    this.outerHTML=this.value;
}

// 输入完成后按下确认键添加未完成事件
ele_input.onkeydown = function (evt) {
    var e = evt || event;
    if (e.keyCode === 13) {
        addItem();
        ele_input.value = "";
        ele_input.focus();
    }
};
//选中项目可更改内容
on(ele_todoList,"click",handlerChangeText,"p");
on(ele_todoList,"change",handlerWriteText,"input");
on(ele_doneList,"click",handlerChangeText,"p");
on(ele_doneList,"change",handlerWriteText,"input");