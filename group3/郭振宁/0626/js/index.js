/* 
*
*
*
*/

//选择器封装
function $(selector) {
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

//创建dom结构
function createElement(obj) {
    var ele = document.createElement(obj.type);

    for(var attr in obj.attr) {
        ele.setAttribute(attr , obj.attr[attr]);
    }

    obj.html ? ele.innerHTML = obj.html : "";
    // console.log(ele);
                                            //运算顺序
    for(var i=0, child; obj.children && (child = obj.children[i++]);) {  
        // console.log(createElement(child));
        child.nodeType === 1 ? ele.appendChild(child) : ele.appendChild(createElement(child));
    }
    return ele;
}


var ipt = $("#title");
var todolist = $("#todolist");
var donelist = $("#donelist");
var todocount = $("#todocount");
var donecount = $("#donecount");
//添加备忘录
ipt.addEventListener("keydown" , addlist);
//清除任务
document.addEventListener("click" , removeli);


function addlist(evt) {
    // console.log(1);
    var e = evt || event;
    if(e.keyCode === 13) {
        addtodolist();
        ipt.select();
    }
}
//创建dom结构并放入todolist
function addtodolist() {
    var iptValue = ipt.value;

    var li = createElement({
        type : "li",
        children : [
              {
                    type  : "input",
                    attr : {
                          type : "checkbox",
                            id : "nav"
                    }
              },
              {
                    type : "p",
                    html : iptValue
              },
              {
                    type : "a",
                    html : "-"
              }
        ]
    })
    //勾选后放在哪个清单
    on(li , "click" , addlistwhere , "#nav");
    //实时编辑
    on(li , "click" , copyreader , "p");
    //插入列表最前面
    todolist.insertBefore(li , todolist.childNodes[0]);
    //刷新清单数目
    count();
}

function addlistwhere(evt) {
    //如果input中的checked为true将其放入donelist，否则放入todolist
    if(this.checked) {
        donelist.insertBefore(this.parentNode , donelist.childNodes[0]);
        count();
    }else {
        todolist.insertBefore(this.parentNode , todolist.childNodes[0]);
        count();
    }
}

//任务数量
function count() {
    todocount.innerHTML = todolist.children.length;
    donecount.innerHTML = donelist.children.length;
}
//如果标签里为  -  则删除当前li
function removeli(evt) {
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target.innerHTML === "-") {
        target.parentNode.remove();
        count();
    }
}

//实时编辑
function copyreader() {
    //如果元素下方已经存在input那么直接返回
    if(this.children.length >= 1) return;
    var input1 = document.createElement("input");
    //给input添加失焦事件
    input1.addEventListener("blur" , contextchange);
    //讲p标签里的内容放在创建的input里
    input1.value = this.innerHTML;
    this.appendChild(input1);
    input1.select();
}
function contextchange() {
    // console.log(1);
    //失焦事件发生时将input中的内容放到p标签中并将input标签删除
    this.parentNode.innerHTML = this.value;
    this.remove();
}




