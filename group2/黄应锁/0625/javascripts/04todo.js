on(ele_todolist , "click" , handlerChangeText , "p");
on(ele_todolist , "change" , handlerWriteText , "input");

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
      this.outerHTML = this.value;
}