var ele_todolist = document.getElementById("todolist");
var ele_donelist = document.getElementById("donelist");
var ele_todoCount = document.getElementById("todocount");
var ele_doneCount = document.getElementById("donecount")
var ele_input = document.getElementById("title");


function addTodoItem() {
    // console.log(ele_input);
    // console.log(iptValue);
    //创建元素
    var iptValue = ele_input.value;


    var li = document.createElement("li");
    var ipt = document.createElement("input");
    ipt.type = "checkbox";
    var p = document.createElement("P");
    p.innerHTML = iptValue;
    var a = document.createElement("a");
    a.innerHTML = "-";
    li.appendChild(ipt);
    li.appendChild(p);
    li.appendChild(a);

    // console.log(li);


    ele_todolist.insertBefore(li, ele_todolist.childNodes[0]);
    // ele_todolist.appendChild(li);

    li.children[0].onchange = handlerTodoToDone;
    li.children[2].onclick = removeItem;
    countLi();
    p.addEventListener("click", editStart);

    function editStart(evt) {
        var e = evt || event;
        var target = e.target || srcElement;
        if (target.children.length >=1) {
            return false;
        }
        var target = document.createElement(input);
        target.appendChild(target);

    }



}

function handlerTodoToDone() {
    console.log(1111111111)
    if (this.checked) {
        ele_donelist.insertBefore(this.parentNode, ele_donelist.childNodes[0]);
    } else {
        ele_todolist.insertBefore(this.parentNode, ele_todolist.childNodes[0]);
    };
    countLi();
}


function removeItem() {
    this.parentNode.remove();
    countLi();
}

function countLi() {
    var doneCount = ele_donelist.children.length;
    var todoCount = ele_todolist.children.length;
    ele_todoCount.innerHTML = todoCount;
    ele_doneCount.innerHTML = doneCount


}


ele_input.onkeydown = function (evt) {
    var e = evt || event;
    if (e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}