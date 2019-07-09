/**
 * 
 *  */ 
 var ele_pao = $("#pao");
 var ele_pao_text = ele_pao.children[0];
 // 屏幕的宽度;
 var clientWidth = document.documentElement.clientWidth;

/**
 * 
 *  */ 

 function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
 }
 
 function createRandomLetter(){
      var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
      // console.log(randomLetter);
      var ele = document.createElement("div");
      ele.className = "fish";
      ele.innerHTML = randomLetter;
      ele.style.top = 0;
      // ele在没有插入页面的时候是没有offset值的;
      // console.log(ele.offsetWidth);
      // 边界;
      ele.style.left = Math.round( Math.random() * (clientWidth - 100)) + "px";
      document.body.appendChild(ele);
 }

 // 炮台的文字输入功能;
 function handlerEnterLetter(evt){
      var e = evt || window.event;
      // console.log(e);
      var keyCode = e.keyCode || e.which;

      if(keyCode >= 65 && keyCode <= 90 ){
            keyCode = String.fromCharCode(keyCode);
            ele_pao_text.innerHTML = keyCode;
      }
   
      console.log(keyCode);
 }

 document.onkeydown = handlerEnterLetter;
 setInterval( createRandomLetter , 1000);

 // 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
 window.onresize = function(){
      clientWidth = document.documentElement.clientWidth;
 }