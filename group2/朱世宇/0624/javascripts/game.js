var select = document.getElementById("select");
var list = document.getElementById("list");
var h2 = document.getElementsByTagName("h2")[0];

select.onclick = function(evt){
      var e = evt || window.event;
      list.style.display = "block";
      //阻止事件冒泡到父元素，阻止任何父事件处理程序的执行。
      typeof e.stopPropagation === "function" ? e.stopPropagation() : e.cancelBubble = true;
    }
    document.onclick = function(evt){
         var e = evt || window.event;
          list.style.display = "none";
          console.log(e.target.innerText);
          if(e.target.tagName = "LI"){
             h2.innerText = e.target.innerText;
          }
    }