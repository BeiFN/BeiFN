on(ele_todoList , "click" , handlerChangeText , "p");
on(ele_todoList , "change" , handlerWriteText , "input");

function handlerChangeText(){
      if(this.children.length >= 1){
            return false;
      }
      var input = createElement({
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

// function cancleBubble(e){
//       // console.log(e);
//       e.stopPropagation();
// }

// input = 阻止事件冒泡 > p 

// ul   fn1 阻止事件冒泡没法阻止fn2执行;
//      fn2

// 事件冒泡阻止 ?  
// 事件委托之后,事件的触发机制出现了一些变动。 
function handlerWriteText(){
      // console.log(this.value);
      this.outerHTML = this.value;
}