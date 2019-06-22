/**
 * @param {选择符:string} selector 
 * 返回一个dom/一组dom(伪数组)
 */
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var input = $("#title"),
    todoList = $("#todolist"),
    doneList = $("#donelist"),
    todoCount = $("#todocount"),
    doneCount = $("#donecount");

function addTodoItem() {
    var iptValue = input.value,
        li = createElement({
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
                    html: iptValue
                },
                {
                    type: "a",
                    html: "-"
                },
            ]
        });
    if (iptValue != "") {
        todoList.insertBefore(li, todoList.childNodes[0]);
    }
    li.children[0].onchange = handlerTodoToDone;
    li.children[2].onclick = removeItem;
    countNum()
}

function handlerTodoToDone() {
    if (this.checked) {
        doneList.insertBefore(this.parentNode, doneList.childNodes[0]);
    } else {
        todoList.insertBefore(this.parentNode, todoList.childNodes[0]);
    }
    countNum()
}

function removeItem() {
    this.parentNode.remove();
    countNum()
}

function countNum() {
    var tCount = todoList.children.length,
        dCount = doneList.children.length;
    todoCount.innerHTML = tCount;
    doneCount.innerHTML = dCount;
}

/**
 * 
 * @param {*} domJson 
 */
function createElement(domJson) {
    typeof domJson === "undefined" ? domJson = {} : "";
    var ele = document.createElement(domJson.type ? domJson.type : "div");
    for (var attr in domJson.attr) {
        ele.setAttribute(attr, domJson.attr[attr]);
    }
    ele.innerHTML = domJson.html ? domJson.html : "";
    for (var i = 0, childEle; domJson.children && (childEle = domJson.children[i++]);) {
        childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
    }
    return ele;
}

input.onkeydown = function (evt) {
    var e = evt || window.event;
    if (e.keyCode === 13) {
        addTodoItem();
        input.select();
    }
}