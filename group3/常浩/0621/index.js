//基本思路 当点击回车的时候我们要获取文本框内容
// var ele_input = document.getElementById("title");
// var ele_todolist = document.getElementById("todolist");
// var ele_donelist = document.getElementById("donelist");
// var ele_todocount = document.getElementById("todocount");
// var ele_donecount = document.getElementById("donecount");

var ele_input = ids("#title"); 
var ele_todolist = ids("#todolist");
var ele_donelist = ids("#donelist");
var ele_todocount = ids("#todocount");
var ele_donecount = ids("#donecount");

//代码优化 获取元素的id简化  思路我们需要创建一个函数  输入参数可以返回获取的id
function ids(selector){
    var ele = document.querySelectorAll(selector);  
   return  ele.length === 1 ? ele[0] : ele;
}


//我们要封装一个可以创建元素节点并可以赋值属性和嵌套子节点的函数； 一可以创建元素  用到createElement 
//  可以添加属性 用到setAttribute  嵌套子节点用到appendChild    这个函数的参数是josn
/* 
    josn{
        type:p
    }


*/
function createElement(josn){
    typeof json === "undefined" ?  json = {} : "";  
    var ele = document.createElement(josn.type ? josn.type : "div");  //我们需要创建元素，元素类型是type的值  如果不存在的话 我们默认是创建div；
    for(var attr in josn.attr){
        ele.setAttribute(attr,josn.attr[attr]);   // 遍历attr属性   如果是空则不执行  若不为空我们创建属性。
    }
    if(josn.type == "input" || josn.type == "textarea"){
        ele.value = josn.html ? josn.html : "";
    }else{
        ele.innerHTML = josn.html ? josn.html : "" ;
    }

    for(var i = 0, childEle; josn.child && (childEle = josn.child[i++]);){   //我们需要判断是否有子节点  没有的话 造成短路运算跳出循环，
        childEle.nodeType  === 1 ? ele.appendChild( childEle ) : ele.appendChild( createElement(childEle)); //  如果有的话 我们需要在创建的元素里面添加子节点，此时子节点还未被创建我们需要再次调用封装的函数。
    }
    return ele;
}






function addTodoitem(){
    addTodolist();
}
//点击回车创建li等一些列元素
function addTodolist(){
    // var iptvalue = ele_input.value;
    // var li = document.createElement("li");
    // var input  = document.createElement("input");
    // input.type = "checkbox";
    // var p  = document.createElement("p");
    // p.innerHTML = iptvalue;
    // var a  = document.createElement("a");
    // a.innerHTML = "-"; 
    // ele_todolist.appendChild(li);
    // li.appendChild(input);
    // li.appendChild(p);
    // li.appendChild(a);


    var li = createElement({
        type : "li" ,
        child: [
            {
                type : "input",
                attr : {
                    type : "checkbox"
                }
            },
            {
                type : "p",
                html : ele_input.value
            },
            {
                type : "a",
                html : "_"
            }
        ]
    })


    ele_todolist.insertBefore(li,ele_todolist.childNodes[0]);
    // ele_todolist.appendChild(li);
    li.children[0].onchange = handleRmover;
    li.children[2].onclick  = handlerDel;
    //本次任务是给生成的内容实现实时编辑功能
    //当鼠标点击的时候 需要生成一个input输入框 
    //事件类型应该为内容发生改变时添加，因为p标签没有blur
    li.children[1].onclick = handlerChangText;
    li.children[1].onchange = handlerWriteText ;
    count();
}
function handlerChangText(){
    //创建元素input
    if(this.children.length >= 1){
        return false;
    }
    var input = createElement({
        type : "input",
        attr : {
            html : this.innerHTML,
        }
    })
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
}
function handlerWriteText(){
    this.outHTML = this.value;
}


//下一步给创建的元素绑定事件
//当checkbox被选中时
function handleRmover(){
    if(this.checked){
        ele_donelist.insertBefore(this.parentNode,ele_donelist[0]);
    }else{
        ele_todolist.insertBefore(this.parentNode,ele_todolist[0]);
    }
    count();
}
function handlerDel(){
    this.parentNode.remove();
    count();
}
function count(){
    var todoCount = ele_todolist.children.length;
    var doneCount = ele_donelist.children.length;
    ele_todocount.innerHTML = todoCount;
    ele_donecount.innerHTML = doneCount;
}

ele_input.onkeydown = function(evt){
    var e = evt || event;
    if(e.keyCode == 13){
        addTodoitem();
        ele_input.select();
    }
    
}