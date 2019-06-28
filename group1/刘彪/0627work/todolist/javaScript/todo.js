var ele_input    = document.getElementById("title");
var ele_todoList = document.getElementById("todolist");
var ele_doneList = document.getElementById("donelist");

var ele_todoCount = document.getElementById("todocount");
var ele_doneCount = document.getElementById("donecount");

function addTodoItem(){
    var iptValue = ele_input.value;

     //通过json构建一个dom树
     var dom = {type:"li",children:[{type:"input",attr:{type:"checkbox"}},{type:"p",html:iptValue},{type:"a",html:"-"}]}

    //***调用函数,创建一个li结构***
     var li = createElement(dom);

     //将构建的li结构插入todolist的最前面
     ele_todoList.insertBefore(li,ele_todoList.childNodes[0]);

     //找到节点，绑定事件;列表间的转移
     li.children[0].onchange = handlerTodoToDone;
     //删除
     li.children[2].onclick = removeItem;

     countLi();
    
}

//把构建好的结构创建出来
function createElement(domJson){

    //传进来的json,如果没有type属性,那就创建一个div,否则就根据type属性来创建元素;
    var ele = document.createElement(domJson.type? domJson.type:"div");
    // console.log(ele);
    // 给创建好的li里的元素添加属性和属性值
    for(var index in domJson.attr){
        ele.setAttribute(index,domJson.attr[index])
    }

    //如果存在html,添加html
    ele.innerHTML = domJson.html ? domJson.html : "";
     
     //短路运算,如果donmJson存在children属性,子集下的每个节点依次赋值给childNode                                                
    for(var i = 0,childNode;domJson.children && (childNode = domJson.children[i++]);){
        childNode.nodeType === 1 ? ele.appendChild(childNode):ele.appendChild(createElement(childNode));
    }

    return ele;

}

function handlerTodoToDone(){
    //this指向触发事件的那个元素;
    // console.log(this)
    if(this.checked){
        ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]) 
    }else{
        ele_todoList.insertBefore(this.parentNode,ele_todoList.childNodes[0])
    }
    countLi();
}

function removeItem(){

    this.parentNode.remove();
    countLi();
}

function countLi(){

    var donecount =ele_doneList.children.length;
    var todocount = ele_todoList.children.length;

    ele_doneCount.innerHTML = donecount;
    ele_todoCount.innerHTML = todocount;
}


//``````````````````````````

ele_input.onkeydown = function(evt){
    var e = evt || event;
    if(e.keyCode ===13){
        addTodoItem();
    }
}