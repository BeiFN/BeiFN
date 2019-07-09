class Utils{
      static $(selector){
            let ele = null;
            return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
      }
      static on( dom , eventType,  handlerEvent ){
            dom.addEventListener(eventType,handlerEvent);
      }
      static createEle(className){
            let ele = document.createElement("div");
            ele.className = className;
            document.body.append(ele);
            return ele
      }
}