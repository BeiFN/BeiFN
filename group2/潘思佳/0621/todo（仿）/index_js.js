var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var ele_todoCount = $("#todocount");
var ele_doneCount = $("#donecount");

var targetLi = null;

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function keydownHandler(e) {
    if (e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}

function addTodoItem() {
    var iptValue = ele_input.value;

    var li = createElement({
        type: "li",
        children: [{
                type: "input",
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
    })

    ele_todoList.insertBefore(li, ele_todoList.childNodes[0]);

    countLi();

    li.children[0].addEventListener("change", handlerToDoToDone);
    li.children[2].addEventListener("click", removeHandler);
    li.children[1].addEventListener("click", changeText);
    li.addEventListener("dragstart", function(e) {
        targetLi = this; //dragstart事件，将当前拖拽的li的this赋值给全局变量targetLi
    });

    li.setAttribute("draggable", "true"); //为li添加拖拽属性

}

ele_todoList.addEventListener("drop", tempFunc);

function tempFunc(e) {
    console.log(e.target.nodeName);
    this.insertBefore(targetLi, e.target.nodeName === "OL" ? targetLi : e.target.parentNode); //将拖动的li插入e.target的父级li之前，如果没能拖到正确的位置，就不进行insertBefore操作
}

document.addEventListener("dragover", function(e) {
    e.preventDefault();
})

function createElement(domJson) {
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for (var attr in domJson.attr) {
        ele.setAttribute(attr, domJson.attr[attr]);
    }
    ele.innerHTML = domJson.html ? domJson.html : "";
    for (var i = 0, childNode; domJson.children && (childNode = domJson.children[i++]);) {
        childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild(createElement(childNode));
    }
    return ele;
}

function handlerToDoToDone() {
    if (this.checked) ele_doneList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);
    else ele_todoList.insertBefore(this.parentNode, ele_todoList.childNodes[0]);
    countLi();
}

function removeHandler() {
    this.parentNode.remove();
    countLi();
}

function countLi() {
    ele_todoCount.innerHTML = ele_todoList.children.length;
    ele_doneCount.innerHTML = ele_doneList.children.length;
}

function changeText() {
    if (this.children.length >= 1) return;
    var input = createElement({
        type: "input",
        attr: {
            value: this.innerHTML,
        }
    })
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
    input.addEventListener("change", finishChange);
}

function finishChange() {
    this.outerHTML = this.value;
}

ele_input.addEventListener("keydown", keydownHandler);