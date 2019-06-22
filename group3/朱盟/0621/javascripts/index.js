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
      // 创建一个li结构;

      // 通过 json 构建一个 dom树 * ******
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

      // 找到节点，绑定事件;

      li.children[0].onchange = handlerTodoToDone;

      // 插入li结构;
      // 给li结构之中dom对象(input,a)绑定事件;
}
// 构建dom树;
function handlerTodoToDone(){
      // console.log(this);
      // this 表示那个元素触发的事件;
      if(this.checked){
            ele_doneList.insertBefore( this.parentNode , ele_doneList.childNodes[0] )
      }else{
            ele_todoList.insertBefore( this.parentNode , ele_todoList.childNodes[0] )
      }

}

/*{
      type : xxx,
      attr : {
            class : "value"
      },    
      html : xxx,
      children : [];
}
*/

function createElement(domJson){
      // 不传参数咋办 ? 
      typeof domJson === "undefined" ? domJson = {} : "";
      // 可选参数 1: type;
      var ele = document.createElement(domJson.type ? domJson.type : "div");
      // 添加属性 ;  setAttribute( name , value)
      for(var attr in domJson.attr){
            ele.setAttribute(attr , domJson.attr[attr])
      }
      // 添加html;  value*** 
      ele.innerHTML = domJson.html ? domJson.html : "";
      // 判定是否存在子集;
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