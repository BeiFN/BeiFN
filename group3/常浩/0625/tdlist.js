//首先创建一个选择器 

function $(selector){
    var sel = null;
   return  sel = (document.querySelectorAll(selector).length == 1)　?　document.querySelectorAll(selector)[0] : document.querySelectorAll(selector);
}
var ele_todoList = $("#todolist");
var ele_input    = $("#title");
var ele_doneList = $("#donelist")
var ele_todocount = $("#todocount");
var ele_donecount = $("#donecount");

function handlerStar (evt){
    var e = evt || event ;
    if(e.keyCode == 13){
        addtodoElement();
        ele_input.select();
    }
}

function addtodoElement(){
    var inpValue = ele_input.value;
    var li = handlerCreatElement({
        type : "li",
        children :[
            {
                type : "input",
                attr :{
                    type : "checkbox"
                }
            },
            {
                type : "p",
                html : inpValue
            },
            {
                type : "a",
                html : "-"
            }
        ]
    })
    ele_todoList.insertBefore(li,ele_todoList.childNodes[0]);
    count();
}

function handlerCreatElement(json){
    typeof json === undefined ? json = {} : "" ;
    var ele = document.createElement(json.type ? json.type : "div");
    for (var attr in json.attr){
        ele.setAttribute(attr,json.attr[attr]);
    }
    ele.innerHTML = json.html ? json.html : "";
    for(var i = 0 ,childNode; json.children && (childNode = json.children[i++]); ){
        childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild( handlerCreatElement(childNode))
    }
    return ele ;
}


function handlerTodotoDone(){
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
    }else{
        ele_todoList.insertBefore(this.parentNode,ele_todoList.childNodes[0]);
    }
    count();
}

function handlerRemove(){
    this.parentNode.remove();
    count();
}
function count(){
    var todocounts = ele_todoList.children.length;
    var donecounts = ele_doneList.children.length;
    ele_todocount.innerHTML  =  todocounts;
    ele_donecount.innerHTML  =  donecounts;
}
function handlerChangText(){
    if(this.children.length >= 1){
        return false;
  }
    var input = handlerCreatElement({
        type : "input",
        attr : {
            html : this.innerHTML,
        }
    })
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
}
function handlerChanges(evt){
    var e = evt || event;
    var target = e.target || e.srcEvent;
    this.outerHTML = this.value;
    console.log(target)
    
}
on(ele_todoList,"change",handlerTodotoDone,"input");
on(ele_doneList,"change",handlerTodotoDone,"input");
ele_input.addEventListener("keydown",handlerStar);
on(ele_todoList,"click",handlerRemove,"a");
on(ele_doneList,"click",handlerRemove,"a");
on(ele_todoList,"click",handlerChangText,"p");
on(ele_todoList,"change",handlerChanges,"input");


