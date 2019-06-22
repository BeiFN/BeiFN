/**
 * 
 *    @var ele_input          输入框元素
 *    @var ele_todoList       todo列表
 *    @var ele_doneList       done列表
 */

 var ele_input    = $("#title");
 var ele_todoList = $("#todolist");
 var ele_doneList = $("#donelist");


/**
 * @param {选择符:string} selector 
 * 返回一个dom或者一个伪数组,承载一组dom;
 */
 function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ;
 }

 function addTodoItem(){
       var iptValue = ele_input.value;
      
       //建立一个结构;
       var li  = document.createElement("li");
       var ipt = document.createElement("input");
       ipt.type = "checkbox";
       var p   = document.createElement("p");
       p.innerHTML = iptValue;
       var a   = document.createElement("a");
       a.innerHTML = "-";

       li.appendChild(ipt);
       li.appendChild(p);
       li.appendChild(a);

      //  console.log(li);
       ele_todoList.appendChild(li);
 }

// 对创建元素加以封装实现简化功能;


console.log(createElement("p","innerHTML","hello world"))

// function createElement(type,attr,value){
//       var ele = document.createElement(type);
//       ele[attr] = value;
//       return ele;
// }

// 一个元素节点是什么样形式存在 ? 

var p = {
      // 可选参数;
      type : "p",
      attr : {
            class : "hello"
      },
      html : "hello world"
}
// 根据这个对象结构创建一个可以定制的dom节点;
function createElement( domJson ){
      // domJson 是 undefined ? 
      typeof domJson === "undefined" ?  domJson = {} : ""; 

      // 默认创建div ? 
      var ele = document.createElement( domJson.type ? domJson.type : "div" );
      // 给元素节点添加属性;
      // domJson.attr => 
      // attr : {
      //       class : "hello"
      // }
      for(var attr in domJson.attr ){
            ele.setAttribute(attr , domJson.attr[attr]); 
      }
      //判定元素内部的内容 ;
      
      ele.innerHTML = domJson.html ? domJson.html : "";

      return ele;
}

createElement(p);



//----------------业务部分-----------------------

ele_input.onkeydown = function(evt){
      var e = evt || window.event;
      if(e.keyCode === 13){
            addTodoItem();
            ele_input.select();
      }
}