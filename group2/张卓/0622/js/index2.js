// 升级版本——————————————

var ipt = $("#title");
var todolist = $("#todolist");
var donelist = $("#donelist");
var todocount = $("#todocount")
var donecount = $("#donecount")

function $(select) {
    var ele = null;
    //因为参数的个数不定
    return (ele = document.querySelectorAll(select)).length == 1 ? ele[0] : ele
}

function addToDoItem() {
    //获取输入的内容
    var context = ipt.value;
    var obj = {
        "type": "li",
        children: [
             {
                "type": "input",
                "attr": {
                    type: "checkbox"
                }
            },
           {
                type: "p",
                html: context
            },
            {
                type: "a",
                html: "-"
            }
        ]
    }
    //在新建li
    var li = createElement(obj)
    todolist.insertBefore(li,todolist.childNodes[0])

    li.children[0].onchange=handlerToDoToDone;
    li.children[2].onclick = handlerRemove;
    countLi()
}

//难点
function createElement(obj) {

    //如果有就获取  没有就默认
    var ele = document.createElement(obj.type ? obj.type : "div")
    //html
    ele.innerHTML = (obj.html ? obj.html : "")
    //attr
    for (var attr in obj.attr) {
        ele.setAttribute(attr, obj.attr[attr]);
    }
    //children  子元素都拼接到了li中
    for (var c in obj.children) {

        if (obj.children[c].nodeType == 1) {
            //这里的问题 这里直接用父元素li拼接children元素
            ele.appendChild(obj.children[c])
        } else {
            //如果他不是元素
            ele.appendChild(createElement(obj.children[c]))
        }
    }
    console.log(ele)
    return ele;
}


function handlerToDoToDone(){
    if(this.checked){//选中 this指的是li.children[0]
        donelist.insertBefore(this.parentNode,donelist.childNodes[0])
    }else{
        todolist.insertBefore(this.parentNode,todolist.childNodes[0])
    }
    countLi()
}

function handlerRemove(){
    this.parentNode.remove();
    countLi()
}

function countLi(){
   todocount.innerHTML = todolist.children.length
   donecount.innerHTML = donelist.children.length
}

ipt.onkeyup = function (evt) {
    var e = evt || event
    if (e.keyCode == 13) {
        addToDoItem();
        ipt.select();
    }
}
