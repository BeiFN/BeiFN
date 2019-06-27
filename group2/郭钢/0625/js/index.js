function $(selector) {
    var selector_list = document.querySelectorAll(selector);
    var sel_list = (selector_list.length == 1 ? selector_list[0] : selector_list);
    return sel_list;
}
var ipt = $("#title");
var ele_todo = $("#todolist");
var ele_done = $("#donelist");
var count_todoli = $("#todocount")
var count_doneli = $("#donecount")

function addToToDoList() {
    var li = document.createElement("li");
    ele_todo.insertBefore(li, ele_todo.childNodes[0]);
    var input = document.createElement("input");
    li.appendChild(input);
    input.setAttribute("type", "checkbox")
    var p = document.createElement("p");
    li.appendChild(p);
    p.innerHTML = ipt.value;
    var a = document.createElement("a");
    li.appendChild(a);
    a.innerHTML = "-";
    li.children[0].onchange = toDOToDone;
    li.children[2].onclick = deleteLi;
    count_todoli.innerHTML = ele_todo.getElementsByTagName("li").length;
}

function toDOToDone() {
    if (this.checked) {
        ele_done.insertBefore(this.parentNode, ele_done.childNodes[0]);
        this.parentNode.children[2].onclick = deleteLi;
        count_doneli.innerHTML = ele_done.getElementsByTagName("li").length;
        count_todoli.innerHTML = ele_todo.getElementsByTagName("li").length;
    } else {
        count_todoli.innerHTML = ele_todo.getElementsByTagName("li").length;
        count_doneli.innerHTML = ele_done.getElementsByTagName("li").length;
        ele_todo.insertBefore(this.parentNode, ele_todo.childNodes[0]);
    }
}

function deleteLi() {
    this.parentNode.remove();
    count_todoli.innerHTML = ele_todo.getElementsByTagName("li").length;
    count_doneli.innerHTML = ele_done.getElementsByTagName("li").length;

}



ipt.onkeydown = function (evt) {
    var e = evt || event;
    if (e.keyCode === 13) {
        addToToDoList();
        ipt.value = "";
    }
}