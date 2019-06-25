/**
 * 
 *  */ 
 var ele_pao = $("#pao");
 var ele_pao_text = ele_pao.children[0];

/**
 * 
 *  */ 

 function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
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