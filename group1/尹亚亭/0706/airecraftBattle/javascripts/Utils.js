class Utils{
	 //选择器;
	static $(selector){
	      let ele = null;
	      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
	}
	// // 事件绑定;
	// static on(dom,evetType,callback,selector){
	//       if(dom.addEventListener){
	//             if(arguments.length === 4 && typeof arguments[3] === "string" ){
	//                   dom.addEventListener(evetType , Utils.delegation( callback , selector ));
	//             }else{
	//                   dom.addEventListener(evetType , callback);
	//             }
	//       }else if(dom.attachEvent){
	//             dom.attachEvent("on" + eventType, callback);
	//       }else{
	//             dom["on" + eventType] = callback;
	//       }
	// }
	// 
	// // 事件委托;
	// static delegation( handlerClick , selector ){
	//       return function(evt){
	//             var e = evt || window.event;
	//             var target = e.target || e.srcElement;
	//             var eleList = this.querySelectorAll(selector);
	//             var targetFamily = [];
	//             var _tempTarget = target;
	//             var count = 0;
	//             while(true && count ++ < 100){
	//                   if(_tempTarget === this || _tempTarget === null){
	//                         break;
	//                   }
	//                   targetFamily.push(_tempTarget);
	//                   _tempTarget = _tempTarget.parentNode;
	//             }
	//             for(var i = 0 , ele ; ele = eleList[i++]; ){
	//                   if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
	//                         handlerClick.call(ele , e , ele);
	//                         break;
	//                   }
	//             }
	//       }
	// }
	static on( dom , eventType,  handlerEvent ){
            dom.addEventListener(eventType,handlerEvent);
    }
}