var ele_input = document.getElementById("title");
var ele_todolist = document.getElementById("todolist");
var ele_donelist = document.getElementById("donelist");
var ele_todocount = document.getElementById("todocount");
var ele_donecount = document.getElementById("donecount");
// var ele_input = document.getElementById("title");

function addTodoItem() {
    var inputValue = ele_input.value;
    // console.log(inputValue);
    var li = document.createElement("li");
    var input = document.createElement("input");
    var p = document.createElement("p");
    p.innerHTML = inputValue;
    input.type = "checkbox";
    var a = document.createElement("a");
    a.innerHTML = ("-");
    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(a);
    // console.log(li);

    ele_todolist.insertBefore(li,ele_todolist.childNodes[0]);
    // console.log(input);
    // console.log(a);
    // console.log(li);

    // console.log(ele_todolist);
    countLi();

    li.children[0].onchange = todolist;
    li.children[2].onclick = removeItem;
}


 function todolist(){
     if(this.checked){
         ele_donelist.insertBefore(this.parentNode,ele_donelist.childNodes[0])
     }else{
         ele_todolist.insertBefore(this.parentNode,ele_todolist.childNodes[0]);
     }
     countLi();

} 
function removeItem(){
    this.parentNode.remove();
    countLi();
}

function countLi(){
    ele_todocount.innerHTML = ele_todolist.children.length;
    ele_donecount.innerHTML = ele_donelist.children.length;
}




ele_input.onkeydown = function (evt) {
    var e = evt || event;
    if (e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}