var title = $("#title");
var toDoList = $("#todolist");
var doneList = $("#donelist");
var todoCount = $("#todocount");
var doneCount = $("#donecount");

function addToDoList(){
    // var li = document.createElement("li");
    // var input = document.createElement("input");
    // input.type = "checkbox";
    // var p = document.createElement("p");
    // p.innerHTML = title.value;
    // var a = document.createElement("a");
    // a.innerHTML = "-";
    // li.appendChild(input);
    // li.appendChild(p);
    // li.appendChild(a);

    var li = createElement({
        type:"li",
        children:[
            {
                type:"input",
                attr:{
                    type:"checkbox",
                }
            },
            {
                type:"p",
                html:title.value,
            },
            {
                type:"a",
                html:"-",
            }
        ]
    });
    toDoList.insertBefore(li,toDoList.children[0]);

    count();
    li.children[0].addEventListener("click",moveToDoneList);
    li.children[2].addEventListener("click",removeToDoList);
}


function moveToDoneList(){
    if(this.checked){
       doneList.insertBefore(this.parentNode,doneList.children[0]); 
       count();
    }else{
        toDoList.appendChild(this.parentNode);
        count();
    }
}
function removeToDoList(){
    this.parentNode.remove();
    count();
}
function count(){
    var todonum = toDoList.children.length;
    var donenum = doneList.children.length;
    todoCount.innerHTML = todonum;
    doneCount.innerHTML = donenum;
}

on(toDoList,"click",changePInLi,"p");
on(toDoList,"change",finshChange,"#input_change");
function changePInLi(){
    if(this.children.length === 1) return false;
    // var input = document.createElement("input");
    // input.value = this.innerHTML;
    // input.id = "input_change";

    var input = createElement({
        type:"input",
        attr:{
            id:"input_change",
            value:this.innerHTML,
        },
    });
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
}
function finshChange(){
    this.outerHTML = this.value;
}


document.onkeydown = function(evt){
    var e = evt || event ;
    if((e.keyCode === 13) && (title.value !== "")){
        addToDoList();
        title.select();
    }
}