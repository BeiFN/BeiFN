//todolist功能实现 

/**
 *  @var    ipt    输入框元素
 *  @var    span1  记录todo列表的个数
 *  @var    ol     todo列表
 *  @var    span2  记录done列表的个数
 *  @var    ul     done列表
 */

var ipt = $("#title");
var span1 = $("#todocount");
var ol = $("#todolist");
var span2 = $("#donecount");
var ul = $("#donelist");

//todolist的即时编辑输入功能的高级的实现

//利用事件委托机制进行绑定事件 事件委托利用的是事件冒泡的原理 
//使用事件委托是为了给不同的元素绑定不同的函数，因此提取出不同的函数和不同的选择器
//todolist中要处理p，但是监听加在了ol上，所以要选择所有的ol中的p，判定后对p进行处理
// ol.addEventListener("click",delegation(fnInput,"p"));
// ol.addEventListener("change", delegation(fnChange,"p"))
// function delegation(fn,selector){
//     return function(evt){
//         var ele = $(selector).length == 1? $(selector)[0]:$(selector);
//         // var ele = $(selector).length == 1? $(selector)[0]:$(selector);
//         // console.log(ele);
//         var e = evt||window.event;
//         var target = e.target||e.srcElement;
//         //先进行判定，判定之后调用fn
//         fn(ele,e,target); //事件处理函数
//     }
// }
// function fnInput(ele,e){
//     // var newInput = document.createElement("input");
//     // ele.appendChild(newInput);
//     // console.log(ele)
// }
// function fnChange(ele,e,target){
//     // ele.outerHTML = target.value;
// }



//todolist的即时编辑输入功能的实现当用户点击ol的li中的p标签时就会在创建一个input标签放入p标签中使用户可以输入内容
//因为p是在js中动态产生的，所以在绑定事件时不容易找到该元素，避免给每个p标签绑定标签时出现冗余，可以根据冒泡机制将事件绑定在ol中

ol.addEventListener("click", addInput);
ol.addEventListener("change", inputChangeed);
function addInput(evt){
    var e = evt||window.event;
    var target = e.target||e.srcElement;
    // console.log(e, target);
    var ipt = document.createElement("input");
    target.appendChild(ipt);
    //ul应该绑定两个事件，第一个是添加input，第二个是input改变时就将p的input被p中input中的内容替换
}
function inputChangeed(evt){
    var e = evt||window.event;
    var target = e.target||e.srcElement;
    // console.log(e, target)
    target.parentNode.outerHTML = target.value;
}

/**
 * @param {选择器：string} selector 
 * 返回一个dom或者为数组，承载一组dom，dom是获得的元素的变量
 */
// 封装获取标签的方法  querySelectorAll(selector)
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length>1 ? ele: ele[0];
}

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
        span1.innerHTML = ol.children.length;
        span2.innerHTML = ul.children.length;    
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

