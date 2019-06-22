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
      //  var li  =  createElement({
      //        type : "li" ,
      //        children : [
      //             createElement({
      //                   type : "input",
      //                   attr : {
      //                        type : "checkbox" 
      //                   } 
      //             }),   
      //              createElement({
      //                    type : "p",
      //                    html : iptValue
      //              }),
      //              createElement({
      //                    type : "a",
      //                    html : "-"
      //              })
      //        ]
      //  })

      var li  =  createElement({
            type : "li" ,
            children : [
                  {
                        type : "input",
                        attr : {
                              type : "checkbox" 
                        } 
                  },   
                  {
                        type : "p",
                        html : iptValue
                  },
                  {
                        type : "a",
                        html : "-"
                  }
            ]
      })

      ele_todoList.insertBefore(li , ele_todoList.childNodes[0]);
 }

/**
 * 
 * @param { domjson结构 } domJson 
 *  
 * 结构示例 : 
 * {
      type : "p",
      attr : {
            class : "hello"
      },
      html : "hello world"
}
 * 
 */

function createElement( domJson ){
      typeof domJson === "undefined" ?  domJson = {} : ""; 

      var ele = document.createElement( domJson.type ? domJson.type : "div" );
      for(var attr in domJson.attr ){
            ele.setAttribute(attr , domJson.attr[attr]); 
      }
      ele.innerHTML = domJson.html ? domJson.html : "";

      // 增加插入元素的功能; children;
      // 所有引用类型隐式数据类型转换为 true ;
      for(var i = 0, childEle ; domJson.children && (childEle = domJson.children[i++]) ;  ){
            // console.log(ele);
            childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild( createElement(childEle) );
      }

      return ele;
}


//----------------业务部分-----------------------

ele_input.onkeydown = function(evt){
      var e = evt || window.event;
      if(e.keyCode === 13){
            addTodoItem();
            ele_input.select();
      }
}