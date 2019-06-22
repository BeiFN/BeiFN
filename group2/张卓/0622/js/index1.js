// var ipt = document.getElementById("title")
// var todoList = document.getElementById("todolist")
// var doneList = document.getElementById("donelist")

//初始版本————————————————

var ipt = $("title")
var todolist = $("todolist")
var donelist = $("donelist")
var todocount = $("todocount")
var donecount = $("donecount")

function $(ele){
    return document.getElementById(ele)
}

function addToDoItem(){
    //获取到了内容
    var context = ipt.value;

    //创建元素 每点击一次都会创建一个新的元素
    var li = document.createElement("li")
    todolist.insertBefore(li,todolist.childNodes[0])    
    var todo_ipt = document.createElement("input")
    todo_ipt.type = "checkbox" //todo_ipt.setAttribute("type","checkbox")
    li.appendChild(todo_ipt);
    var todo_p = document.createElement("p")
    todo_p.innerHTML = context;
    li.appendChild(todo_p);
    var todo_a = document.createElement("a")
    todo_a.innerHTML = "-"
    li.appendChild(todo_a)

    todo_ipt.onchange = handlerToDoToDone; //
    todo_a.onclick = handlerRemove;
    
    countLi()
}

function handlerToDoToDone(){
    if(this.checked){ //选中
        donelist.insertBefore(this.parentNode,donelist.childNodes[0])
    }else{
        todolist.insertBefore(this.parentNode,todolist.childNodes[0])
    }

    countLi()
}
// 删除
function handlerRemove(){
    // console.log(this.parentNode);
    this.parentNode.remove()
    countLi()
}

// 计数
function countLi(){
    // console.log(todolist.children.length)
    todocount.innerHTML = todolist.children.length
    // console.log(donelist.children.length)
    donecount.innerHTML = donelist.children.length
}



ipt.onkeyup = function(evt){
    var e = evt||window.event;
    if(e.keyCode == 13){ //这是回车键
        addToDoItem();
        ipt.select();
    }
}
