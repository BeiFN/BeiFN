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
}

function handlerWriteText(){
      // console.log(this.value);
      this.outerHTML = this.value;
}