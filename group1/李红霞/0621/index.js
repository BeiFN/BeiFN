// //todolist功能实现 
// //获得所有要用的标签  input span ol span ul
// var ipt = $("title");
// var span1 = $("todocount");
// var ol = $("todolist");
// var span2 = $("donecount");
// var ul = $("donelist");

// //封装获取标签的方法
// function $(id){
//     return document.getElementById(id);
// }

// 封装获取标签的方法
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length>1 ? ele: ele[0];
}
var ipt = $("#title");
var span1 = $("#todocount");
var ol = $("#todolist");
var span2 = $("#donecount");
var ul = $("#donelist");
// console.log(ipt, span1,span2,ol,ul)


//当点击回车键的时候触发事件，ol中添加一个新的li，
//li包含一个input标签，p标签 a标签，分别创建并添加到li中
//将li添加到ol中

//回车键监听事件
var obj = {
    "type":"li",
    "children": [
        {
            "type":"input",
            "attr":[
                {"key":"type", "value":"checkbox"},
            ],
        },
        {
            "type":"p",
        },
        {
            "type":"a",
            "html":"-"
        }
    ]
}

window.onkeypress = function(evt){
    var e = evt || window.event;
    if(e.keyCode == 13){
        var li = createElement(obj);
        console.log(ol.childNodes)
        ol.insertBefore(li, ol.childNodes[0]);
        span1.innerHTML = ol.children.length;
        span2.innerHTML = ul.children.length;

        //点击事件，添加点击事件时首先需要获取点击事件，但li是动态生成的，
        //只能当li创建的时候就直接添加处理点击事件的函数
        li.children[2].onchange = change;
        li.children[0].onclick = click;
    }
}
function click(){
        this.parentNode.remove();
}
function change(){
    //当li中的input被选中的时候，将该li移动到to中
    if(this.checked){
        this.parentNode.remove();
        ul.insertBefore(this.parentNode,ul.childNodes[0]);
        span1.innerHTML = ol.children.length;
        span2.innerHTML = ul.children.length;

    }else{
        this.parentNode.remove();
        ol.insertBefore(this.parentNode,ol.childNodes[0]);     
        span1.innerHTML = ol.children.length;
        span2.innerHTML = ul.children.length;
    
    }
    span1.innerHTML = ol.children.length;
    span2.innerHTML = ul.children.length;
}

function createElement(obj){
    var ele = document.createElement(obj.type);
    //循环遍历添加属性
    if(obj.attr){
        for(var i = 0; i < obj.attr.length; i++){
            ele.setAttribute(obj.attr[i].key, obj.attr[i].value);   
        }    
    }
    if(obj.children){
        for(var j = 0; j < obj.children.length; j++){
            var ele_temp = createElement(obj.children[j]);
            if(obj.children[j].type == "p"){
                ele_temp.innerHTML = ipt.value;
            }
            if(ele.childNodes.length > 0){
                ele.insertBefore(ele_temp, ele.childNodes[0]);
            }
            else{
                ele.appendChild(ele_temp);
            }
        }    
    }
    if(obj.html){
        ele.innerHTML = obj.html;
    }
    return ele;
}

