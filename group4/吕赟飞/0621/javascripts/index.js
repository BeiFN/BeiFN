/**
 * 
 *    @var ele_input          输入框元素
 *    @var ele_todoList       todo列表
 *    @var ele_doneList       done列表
 * 
 * 
 */

var ele_input = $("#title");
var ele_todoList = $("#todolist");
var ele_doneList = $("#donelist");
var ele_todocount = $("#todocount");
var ele_donecount = $("#donecount");

/**
 * @param {选择符:string} selector 
 * 返回一个dom或者一个伪数组,承载一组dom;
 */

function $(selector) {
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function addtoItem() {
      var str = ele_input.value;
      var li = creatElement({
            type: "li",
            children: [{
                        type: "input",
                        attr: {
                              type: "checkbox"
                        }
                  },
                  {
                        type: "p",
                        html: str
                  },
                  {
                        type: "a",
                        html: "-"
                  }
            ]
      })

      ele_todoList.insertBefore(li, ele_todoList.childNodes[0]);

      li.children[0].onchange = movetoDoDone;
      li.children[2].onclick = deleteItem;
      li.children[1].onclick = editText;
      li.children[1].onblur = editDone;

      countLi();
}

function editText(){
      this.setAttribute("contenteditable","true");
}

function editDone(){
      this.setAttribute("contenteditable","false");
}

function movetoDoDone() {
      if (this.checked) {
            ele_doneList.insertBefore(this.parentNode, ele_doneList.childNodes[0]);
      } else {
            ele_todoList.insertBefore(this.parentNode, ele_todoList.childNodes[0]);
      }
      countLi();
}

function deleteItem() {
      this.parentNode.remove();
      countLi();
}

function countLi() {
      var todocount = ele_todoList.children.length;
      var donecount = ele_doneList.children.length;
      ele_todocount.innerHTML = todocount;
      ele_donecount.innerHTML = donecount;

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

function creatElement(domJson) {
      typeof domJson === "undefined" ? domJson = {} : "";

      var ele = document.createElement(domJson.type ? domJson.type : "div");

      for (var index in domJson.attr) {
            ele.setAttribute(index, domJson.attr[index]);
      }

      ele.innerHTML = domJson.html ? domJson.html : "";

      for (var i = 0, childNode; domJson.children && (childNode = domJson.children[i++]);) {
            (childNode.nodeType === 1) ? ele.appendChild(childNode): ele.appendChild(creatElement(childNode));
      }

      return ele;
}


ele_input.onkeydown = function (evt) {
      var e = evt || event;
      if (e.keyCode === 13) {
            addtoItem();
            ele_input.value = "";
      }
}