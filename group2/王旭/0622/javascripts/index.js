
var ele_input    = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var ele_todoCount = $("#todocount");
 var ele_doneCount = $("#donecount");

function $(selector){
     var ele = null;
     return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ;
}

function addTodoItem(){
      var iptValue = ele_input.value;
      var li = createElement({
            type : "li",
            children : [
                  {
                        type  : "input",
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

      ele_todoList.insertBefore( li , ele_todoList.childNodes[0] );
      li.children[0].onchange = handlerTodoToDone;
      li.children[2].onclick = removeItem;
      countLi();
}
// 构建dom树;
function handlerTodoToDone(){
      // this 表示那个元素触发的事件;
      if(this.checked){
            ele_doneList.insertBefore( this.parentNode , ele_doneList.childNodes[0] )
      }else{
            ele_todoList.insertBefore( this.parentNode , ele_todoList.childNodes[0] )
      }
      countLi();
}

function removeItem(){
      this.parentNode.remove();    
      countLi();
}

function countLi(){
      var doneCount = ele_doneList.children.length;
      var todoCount = ele_todoList.children.length;
      ele_todoCount.innerHTML = todoCount;
      ele_doneCount.innerHTML = doneCount;
}

function createElement(domJson){
      // 判断是否传参
      typeof domJson === "undefined" ? domJson = {} : "";
      var ele = document.createElement(domJson.type ? domJson.type : "div");
      for(var attr in domJson.attr){
            ele.setAttribute(attr , domJson.attr[attr])
      }
      ele.innerHTML = domJson.html ? domJson.html : "";
      for(var i = 0 , childNode ; domJson.children && (childNode = domJson.children[i++]);){
            childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild( createElement(childNode) )
      }
      return ele ;
}

ele_input.onkeydown = function(evt){
      var e = evt || event;
      if(e.keyCode === 13){
            addTodoItem();
      }
}