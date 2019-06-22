
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

      // console.log(li);

      li.children[0].onchange = handlerTodoToDone;
      li.children[2].onclick = removeItem;

      ele_todoList.insertBefore(li , ele_todoList.childNodes[0]);
      countLi();
 }
 function handlerTodoToDone(){
      if(this.checked){
            ele_doneList.insertBefore(this.parentNode , ele_doneList.childNodes[0]);
      }else{
            ele_todoList.insertBefore(this.parentNode , ele_todoList.childNodes[0]);
      }
      countLi()
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


function createElement( domJson ){
      typeof domJson === "undefined" ?  domJson = {} : ""; 

      var ele = document.createElement( domJson.type ? domJson.type : "div" );
      for(var attr in domJson.attr ){
            ele.setAttribute(attr , domJson.attr[attr]); 
      }
      ele.innerHTML = domJson.html ? domJson.html : "";

            childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild( createElement(childEle) );
      }

      return ele;
}



ele_input.onkeydown = function(evt){
      var e = evt || window.event;
      if(e.keyCode === 13){
            addTodoItem();
            ele_input.select();
      }
}