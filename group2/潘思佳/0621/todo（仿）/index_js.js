var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var ele_todoCount = $("#todocount");
var ele_doneCount = $("#donecount");

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
}

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

ele_input.addEventListener("keydown", keydownHandler);