/**
 *    @var ele_input          输入框元素
 *    @var ele_todoList       todo列表
 *    @var ele_doneList       done列表
 *    @var ele_todoCount      todo序号
 *    @var ele_doneCount      done序号
 */

var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var ele_todoCount = $("#todocount");
var ele_doneCount = $("#donecount");


//$选择器
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

// 键盘回车事件
ele_input.onkeydown = function (evt) {
    var e = evt || window.event;
    if (e.keyCode === 13)
        addTodoItem();
}

//增加todo事件
function addTodoItem() {
    //获取输入框的值
    var iptValue = ele_input.value;
    //对输入框的值进行判断，如果为空，则返回
    if (iptValue.length === 0) return false;
    //输入框清空并将焦点聚焦到input
    ele_input.value = "";
    ele_input.focus();
    //使用json创建li节点  li->(input, p, a)
    var liNode = createElement({
        type: "li",
        attr: {
            draggable: "true"
        },
        children: [
            {  // 创建input节点
                type: "input",
                attr: {
                    type: "checkbox"
                }
            },
            {  // 创建p节点
                type: "p",
                html: iptValue
            },
            {  // 创建a节点
                type: "a",
                html: "-"
            }
        ]
    })
    //将liNode插入到ele_todoList元素的第一个位置
    ele_todoList.insertBefore(liNode, ele_todoList.childNodes[0]);
    //更新计数
    countList();
    // 为liNode绑定点击事件
    liNode.children[0].onchange = handlerTodoTodone;
    //删除元素
    liNode.children[2].onclick = removeNode;
    //交换元素
    exchangeNode();
    //修改内容
    liNode.children[1].onclick = nodeModify;
}

//todo -> done  (or)  done -> todo
function handlerTodoTodone() {
    //this指代onchange改变的那个元素
    if (this.checked)
        ele_doneList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);
    else
        ele_todoList.appendChild(this.parentNode);
    //更新计数
    countList();
}

//删除功能
function removeNode() {
    //移出节点
    this.parentNode.remove();
    //重新计数
    countList();
}

//todoList和doneList计数
function countList() {
    var todoCount = ele_todoList.children.length;
    var doneCount = ele_doneList.children.length;
    ele_todoCount.innerHTML = todoCount;
    ele_doneCount.innerHTML = doneCount;
}

/**
 * 创建节点结构
 * {
 *     type : "str",
 *     attr : {
 *         attr1 : value1,
 *         attr2 : value2,
 *             ....
 *     },
 *     html : "str"
 * }
 */

//创建新节点
function createElement(node) {
    //参数判断
    typeof node === "undefined" ? node = {} : "";
    //可选参数type
    var ele = document.createElement(node.type ? node.type : "div");
    //为ele元素添加属性attr
    for (var prop in node.attr)
        ele.setAttribute(prop, node.attr[prop]);
    //为ele元素添加html内容
    ele.innerHTML = node.html ? node.html : "";
    for (var i = 0; node.children && node.children[i]; i++) {
        var childNode = node.children[i];
        //如果childNode为元素节点，则直接添加到ele元素里面，否则创建新的节点并添加
        childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild(createElement(childNode));
    }
    return ele;
}

//交换元素
function exchangeNode() {
    //获取所有节点
    var liList = ele_todoList.children;
    //被拖动节点dragged
    var dragged = null;
    //为每个节点设置拖拽方法
    for (var i = 0; i < liList.length; i++) {
        //将拖拽的节点赋值给dragged
        liList[i].ondragstart = function () {
            dragged = this;
        }
        //取消默认会阻止你做drop操作的默认属性
        liList[i].ondragover = function (event) {
            event.preventDefault();
        }
        //与拖拽到的目标节点交换
        liList[i].ondrop = function () {
            if (dragged !== null && dragged !== this) {
                var temp = document.createElement("div");
                ele_todoList.replaceChild(temp, this);
                ele_todoList.replaceChild(this, dragged);
                ele_todoList.replaceChild(dragged, temp);
            }
        }
    }

}

//修改doneList内容
function nodeModify() {
    if(this.childNodes[1]) return false;
    var pValue = this.textContent;
    var ipt = document.createElement("input");
    ipt.value = pValue;
    this.appendChild(ipt);
    ipt.focus();
    ipt.onblur = function () {
        if(this.value.length === 0){
            alert("输入为空");
            this.parentNode.textContent = pValue;
            this.remove();
        }
        else{
            this.parentNode.textContent = this.value;
            this.remove();
        }
    }
}