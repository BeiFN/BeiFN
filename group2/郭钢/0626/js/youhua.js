function $(selector) {
    var resSelector = null;
    return (resSelector = document.querySelectorAll(selector)).length === 1 ? resSelector[0] : resSelector;
}

var ipt = $("#title");
var todoList = $("#todolist");
var doneList = $("#donelist");
var todoLength = $("#todocount");
var doneLength = $("#donecount");





// 将要做的列表
function toTodoList() {
    var iptValue = ipt.value;

    var li = createTodo({
        type: "li", //要创建的元素名称
        children: [{ //里面的元素的内容                  
                type: "input", //子元素的标签名称
                attr: { //子元素的属性,因为会不止一个,所以用的数组
                    type: "checkbox",
                }
            },
            {
                type: "p",
                html: iptValue, //子元素的内容
            },
            {
                type: "a",
                html: "-",
            }
        ]
    })
    todoList.appendChild(li);
    var checkbox = li.children[0];
    var aRemove = li.children[2];
    checkbox.onchange = changePosition; //当勾选框状态发生改变时执行函数changePosition
    aRemove.onclick = removeTodo; // 当点击删除框时执行函数removeTodo
    listCount(); //结束后统计此时列表里的内容长度,执行函数listCount;

}


function changePosition() {
    if (this.checked) {
        doneList.appendChild(this.parentNode); //勾选框被勾选时,往donelist里添加勾选的那一个li
        listCount();
    } else {
        todoList.appendChild(this.parentNode);
        listCount();
    }
}

function removeTodo() {
    this.parentNode.remove(); //点击删除框时,删除点击的那一个li
    listCount();
}

function listCount() { //每次发生改变时都执行长度计数函数
    var todoListCount = todoList.children.length;
    var doneListCount = doneList.children.length;
    todoLength.innerHTML = todoListCount;
    doneLength.innerHTML = doneListCount;
}


// 根据传入的Json对象，生成一个事件
function createTodo(domJson) {
    // 判断是否输入正确的domJson，如果没有，返回一个空数组
    typeof domJson === "undefined" ? {} : "";
    // 如果传入的json最外面没有标签类型，返回一个div
    var ele = document.createElement((domJson.type ? domJson.type : "div"));
    // 创建完元素后，对属性进行遍历
    for (var attr in domJson.attr) {
        ele.setAttribute(attr, domJson.attr[attr]) //在创建好的元素里添加属性对象里的属性
    }
    ele.innerHTML = domJson.html ? domJson.html : ""; //如果有内容添加内容
    //最外层元素创建结束后,判读是否有children列表,如果有的话,用chilnode记录每个子集元素
    for (var i = 0, childNode; domJson.children && (childNode = domJson.children[i++]);) {
        ele.appendChild(createTodo(childNode)); //对子集元素进行递归,
        // childNode.nodeType === 1?ele.appendChild(childNode):ele.appendChild(createTodo(childNode));
    }
    return ele; //返回每次的ele
}



ipt.onkeydown = function (evt) {
    var e = evt || event;
    var keyValue = e.keyCode;
    if (keyValue === 13) {
        toTodoList();
        ipt.value = "";
    }
}