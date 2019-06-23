// /**
//  * @var ele_input 输入框
//  * @var ele_todolist 正在做
//  * @var ele_donelist 已完成
//  */

//  var ele_input    = document.getElementById("title");
//  var ele_todolist = document.getElementById("todolist");
//  var ele_donelist = document.getElementById("donelist");
//  var ele_todoCount     = document.getElementById("todocount");
//  var ele_doneCount     = document.getElementById("donecount");
 

//  /**
//   * @param  function addTodoItem() {
      
//   }
//   */

//   function addTodoItem(){
//       var input_value = ele_input.value;
//     // 要先去创建节点li，然后才能加入，现在我们要去封装一个可以创建节点的函数
//       var li = creatElement({
//           type:"li",
//           children:[
//               {
//                   type:"input",
//                   attr:{
//                       type:"checkbox"
//                   }
                 
//               },
//               {
//                   type:"p",
//                   html:input_value
//               },
//               {
//                   type:"a",
//                   html:"-"
//               }
//           ]   
//       })
//             ele_todolist.insertBefore(li,ele_donelist.children[0]);
//             li.children[0].onchange = handlerTodoToDone;
//             li.children[2].onclick = removeItem;
//   }
  
//   function handlerTodoToDone(){
//       if(this.checked)
//       {
//           ele_donelist.insertBefore(this.parentNode,ele_donelist.children[0]);
//           calculLi();
//       }
//       else
//       {
//         ele_todolist.insertBefore(this.parentNode,ele_todolist.children[0]);
//         calculLi();
//       }
//   }

//   function removeItem()
//   {
//       this.parentNode.remove();
//       calculLi();
//   }
//   function calculLi()
//   {
//       var todoCount = ele_todolist.children.length;
//       var doneCount = ele_donelist.children.length;
//       ele_todoCount.innerHTML = todoCount;
//       ele_doneCount.innerHTML = doneCount;
//   }
//   /**
//    * @param function creatElement(domjson){}
//    *创建元素li
//    * 
//    * 
//    * 
//    */

// //   function createElement( domJson ){
// //     typeof domJson === "undefined" ?  domJson = {} : ""; 

// //     var ele = document.createElement( domJson.type ? domJson.type : "div" );
// //     for(var attr in domJson.attr ){
// //           ele.setAttribute(attr , domJson.attr[attr]); 
// //     }
// //     ele.innerHTML = domJson.html ? domJson.html : "";

// //     // 增加插入元素的功能; children;
// //     // 所有引用类型隐式数据类型转换为 true ;
// //     for(var i = 0, childEle ; domJson.children && (childEle = domJson.children[i++]) ;  ){
// //           // console.log(ele);
// //           childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild( createElement(childEle) );
// //     }

// //     return ele;
// // }

//    function creatElement(domjson){
//     typeof domjson === "undefined" ?domjson = {}:"";
//     var ele = document.createElement(domjson.type ? domjson.type:"div");
//     for(var attr in domjson.attr){
//         ele.setAttribute(attr,domjson.attr[attr]);
//     }
//     ele.innerHTML = domjson.html ?domjson.html:"";
//     for(var i = 0,childrenNode;domjson.children && (childrenNode = domjson.children[i++]);)
//     {
//         childrenNode.nodeType === 1?ele.appendChild(childrenNode):ele.appendChild(creatElement(childrenNode));
//     }
//     return ele;
//    }


// // 业务区
//    document.onkeydown = function(evt){
//     var e = evt || window.event;
//     if(e.keyCode === 13)
//     {
//         addTodoItem();
//         calculLi();
//     }
//    }

/**
 * 
 * @var ele_input 输入
 * @var ele_todolist 任务
 * @var ele_donelist 完成任务
 * @var ele_todoCount 任务数
 * @var ele_doneCount 完成任务数
 * 
 */
    var ele_input     = document.getElementById("title");
    var ele_todolist  = document.getElementById("todolist");
    var ele_donelist  = document.getElementById("donelist");
    var ele_todoCount = document.getElementById("todocount");
    var ele_doneCount = document.getElementById("donecount");
    // var ele_input    = $("#title");
    // var ele_todoList = $("#todolist");
    // var ele_doneList = $("#donelist");
    // var ele_todoCount = $("#todocount");
    // var ele_doneCount = $("#donecount");
/**
 * 
 * @param {String} selector 
 */
    // function $(selector){
    //     var ele = null;
    //   return (ele = document.querySelectorAll(selector)).length === 1? ele[0] : ele;
        
    // }
    function $(selector){
        var ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ;
   }
//     function $(selector){
//         var ele = null;
//         return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ;
//    }
  

/**
 * @param 
 * 作用：增加节点
 */
    function addTodoItem(){
        var input_value = ele_input.value;
        var li = createElement({
            type:"li",
            children:[
                {
                    type:"input",
                    attr:{
                       type: "checkbox"
                    }
                },
                {
                    type:"p",
                    html:input_value
                },
                {
                    type:"a",
                    html:"-"
                }
            ]
        })
      
      ele_todolist.insertBefore(li,ele_todolist.children[0]);
      li.children[0].onchange = handlerTodoToDone;
      li.children[2].onclick = removeItem; 
         
    }

    function handlerTodoToDone(){
        if(this.checked)
        {
            ele_donelist.appendChild(this.parentNode,ele_donelist.children[0]);
            calculLi();
        }

        else
        {
            ele_todolist.appendChild(this.parentNode,ele_todolist.children[0]);
            calculLi();
        }
    }

    function calculLi()
    {
        var todoCount = ele_todolist.children.length;
        var doneCount = ele_donelist.children.length;
        ele_doneCount.innerHTML = doneCount;
        ele_todoCount.innerHTML = todoCount;
    }

    function removeItem()
    {
        this.parentNode.remove();
        calculLi();
    }
    /**
     * @param {{
            type:"li",
            children:[
                {
                    type:"input",
                    attr:"checkbox"
                },
                {
                    type:"p",
                    html:input_value
                },
                {
                    type:"a",
                    html:"-"
                }
            ]
        }} domJson 
     * 
     * 作用：创建Dom节点
     * 
     * 
     * 
     * 
    
     */
       function createElement(domjson){
    typeof domjson === "undefined" ?domjson = {}:"";
    var ele = document.createElement(domjson.type ? domjson.type:"div");
    for(var attr in domjson.attr){
        ele.setAttribute(attr,domjson.attr[attr]);
    }
    ele.innerHTML = domjson.html ?domjson.html:"";
    for(var i = 0,childrenNode;domjson.children && (childrenNode = domjson.children[i++]);)
    {
        childrenNode.nodeType === 1?ele.appendChild(childrenNode):ele.appendChild(createElement(childrenNode));
    }
    return ele;
   }

    // function createElement(domJson){
    //     typeof domJson =="undefined" ? domJson = {} : "";
    //     var ele = document.createElement(domJson.type ? domJson.type:"div");
    //     for(var attr in domJson.attr)
    //     {
    //         ele.setAttribute(attr,domJson.attr[attr]);

    //     }
    //     ele.innerHTML = domJson.html ? domJson.html:"";
    //     for(var i = 0, childrenNode;domJson.children && (childrenNode = domJson.children[i++]);)
    //     {
    //        typeof childrenNode == 1 ? ele.appendChild(childrenNode):ele.appendChild(createElement(childrenNode));
    //     }
    //     return ele;
    // }


    // 业务实现
    document.onkeydown = function(evt)
    {
       var e = evt || window.event;
       if(e.keyCode === 13)
           {
               addTodoItem();
              
               calculLi();
           }
    }