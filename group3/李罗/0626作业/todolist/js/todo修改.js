on(ele_todoList,"click",handlerChangeText,"p");
on(ele_todoList,"change",handlerWriteText,"input");
function handlerChangeText(){
    if(this.children.length>=1){
        return false;
    }

    var input=createElement({
        type:"input",
        attr:{
            value:this.innerHTML,
        }
    })
    this.innerHTML="";
    this.appendChild(input);
    input.select();
}


//阻止事件冒泡
function handlerWriteText(){
    this.outerHTML=this.value;
}

function on(dom,evetType,callback,selector){
    if(dom.addEventListener){
        if(arguments.length===4 &&typeof arguments[3] === "string"){
            dom.addEventListener(evetType,delegation(callback,selector));
        }else{
            dom.addEventListener(evetType,callback);
        }
    }else if(dom.attachEvent){
        dom.attachEvent("on" +eventType,callback);
    }else{
        dom["on"+eventType]=callback;
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