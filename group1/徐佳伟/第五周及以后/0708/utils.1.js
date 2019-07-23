
class Utils{
      static $(selector){
            let res = null;
            return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
      }
      static on ( dom , eventType , handlerEvent){
            dom.addEventListener(eventType,handlerEvent);
      }
}