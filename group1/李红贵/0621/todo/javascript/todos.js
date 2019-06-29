function selector(select){
    var ele = null;
    return (ele = document.querySelectorAll(select)).length===1? ele[0] :ele;

}

var e_todolist = selector("#todolist");
var e_donelist = selector("#donelist");
var e_todocout = selector("#todocount");
var e_donecout = selector("#donecount");
var e_input = selector("#title");

e_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        addTodoList();
        e_input.select();
    }
}
function addTodoList(){
    var ipttext = e_input.value;
    console.log(ipttext);
    var li = createElementView( {
        type : "li",
        children : [
            {
                type : "input",
                attr : {type: "checkbox"}
            },
            {
                type : "p",
                html : ipttext
            },
            {
                type : "a",
                html : "-"
            }
        ],
        html : "",
    });
    console.log(li);
    li.children[0].onchange = checkView;
    li.children[2].onclick = removeNotes;
    e_todolist.insertBefore(li, e_todolist.childNodes[0]);
    countNum();
}
function createElementView(jsonData){
    typeof jsonData === "undefined"? jsonData = {}: "";

    var view = document.createElement(jsonData.type?jsonData.type : "div");

    for(var key in jsonData.attr){
        view.setAttribute(key, jsonData.attr[key]);
    }
    // console.log(jsonData.html);
    view.innerHTML = jsonData.html?jsonData.html:"";

    for(var i=0, childs;jsonData.children && (childs = jsonData.children[i++]);){
        childs.nodeType ===1? view.appendChild(childs):view.appendChild(createElementView(childs));
    }
    return view;

}

function checkView(){
    if(this.checked){
        e_donelist.insertBefore(this.parentNode, e_donelist.childNodes[0]);
    }else{
        e_todolist.insertBefore(this.parentNode, e_todolist.childNodes[0]);
    }
    countNum();
}

function removeNotes(){
    this.parentNode.remove();
    countNum();
}

function countNum(){
    e_todocout.innerHTML = e_todolist.children.length;
    e_donecout.innerHTML = e_donelist.children.length;
}



// 添加高级封装

on(e_todolist , "click" , handlerChangeText , "p");
on(e_todolist , "change" , handlerWriteText , "input");

function handlerChangeText(){
    
      if(this.children.length >= 1){
            return false;
      }
      //解决连续点击，多次创建input的bug

      var input = createElementView({
            type : "input",
            attr : {
                  value : this.innerHTML,
            }
      })
      this.innerHTML = "";
      this.appendChild(input);
      input.select();

      // on(input,"click" ,function(){
      //       //阻止事件冒泡
      // })
}



// 事件冒泡阻止 ?  
// 事件委托之后,事件的触发机制出现了一些变动。 绑定的多个触发事件会一一执行，非冒泡机制，等他们执行完后才会进行冒泡。
function handlerWriteText(){
      // console.log(this.value);
      this.outerHTML = this.value;
}


function on(dom,evetType,callback,selector){
    if(dom.addEventListener){
          if(arguments.length === 4 && typeof arguments[3] === "string" ){
                dom.addEventListener(evetType , delegation( callback , selector ));
          }else{
                dom.addEventListener(evetType , callback);
          }
    }else if(dom.attachEvent){
          dom.attachEvent("on" + eventType, callback);
    }else{
          dom["on" + eventType] = callback;
    }
}

function delegation( handlerClick , selector ){
    return function(evt){
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var eleList = this.querySelectorAll(selector);
          var targetFamily = [];
          var _tempTarget = target;
          var count = 0;
          while(true && count ++ < 100){
                if(_tempTarget === this || _tempTarget === null){
                      break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
          }
          for(var i = 0 , ele ; ele = eleList[i++]; ){
                if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                      handlerClick.call(ele , e);
                      break;
                }
          }
    }
}