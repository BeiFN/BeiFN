//let { $ , on } = Utils;
class Selected{
    constructor(){
        this.item = $(".ui-areamini-content-list");
        this.inner= $(".ui-areamini-text");
        this.colors = this.item.children;
        this.init();
    }
    init(){
        this.item.addEventListener("click" , delegation(this.changeColor.bind(this) , ".item"));
    }
    changeColor(evt,ele){
        //console.log(ele);
        for(let i = 0 , col ; col = this.colors[i++];){
              removeClassName(col,"selected");
        }
        ele.className += " selected";
        this.inner.innerHTML=ele.innerHTML;
    }
}
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
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
                      handlerClick.call(ele , e , ele);
                      break;
                }
          }
    }
}
function removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\\s\?"+className) , "" );
    }
 new Selected()