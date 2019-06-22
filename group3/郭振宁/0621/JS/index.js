//选择器封装
function $(selector) {
    return  (ele = document.querySelectorAll(selector)).length === 1? ele[0] : ele; 
}

// console.log($("h2")[0]);

//创建dom树
function createElement(domJson) {
    //看传入参数是否为空
    domJson === "undefined" ? domJson = {} : "";

    //根据type创建相应元素
    var ele = document.createElement(domJson.type);
    // console.log(ele);
    
    //根据attr设置相应属性
    for(var attr in domJson.attr) {
        ele.setAttribute(attr , domJson.attr[attr]);
    }
    //根据html填充内容
    ele.innerHTML = domJson.html ? domJson.html : "";

    //根据children建立子节点
    for(var i=0, childEle; domJson.children && (childEle = domJson.children[i++]);) {
        childEle.nodeType === 1? ele.append(childEle) : ele.append(createElement(childEle));
        console.log(childEle.nodeType);
    }
    return ele;
}

var ipt = $("#title");
var tolist = $("#todolist");
var doneList = $("#donelist");
var todocount = $("#todocount");
var donecount = $("#donecount");
var s = document.createElement("a");
s.innerHTML = "-";
// console.log(ipt);

ipt.onkeydown = function(e) {
    var e = e || event;
    if(e.keyCode === 13) {
        addLItodo();
        ipt.select();
    }
    count();
}
function addLItodo() {
    var iptValue = ipt.value;

    var li = createElement({
        type : "li",
        children : [
            {
                type : "input",
                attr : {
                    type : "checkbox"
                }
            },
            {
                type : "p",
                html : iptValue
            },
            s
        ]
    })
    
    li.children[0].onchange = changePlace;
    li.children[2].onclick = removeEle;
    todolist.insertBefore(li , todolist.childNodes[0]);
}

function changePlace() {
    if(this.checked) {
        doneList.insertBefore(this.parentNode , doneList.childNodes[0]);
    }else {
        todolist.insertBefore(this.parentNode , todolist.childNodes[0]);
    }
    count();
}

function removeEle() {
    this.parentNode.remove();
    count();
}

function count() {
    var countto = todolist.children.length;
    var countdone = doneList.children.length;
    todocount.innerHTML = countto;
    donecount.innerHTML = countdone;
}