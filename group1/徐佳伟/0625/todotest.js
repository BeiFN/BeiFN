on(ele_todoList,"click",handlerCreateText,"p");
on(ele_todoList,"change",handlerChangeText,"input");
function handlerCreateText(){
    // if(this.children.length >=1 ){
    //     return false;
    // }
    var input = createElement({
        type: "input",
        attr :{
            value : this.innerHTML

        }
    })
    console.log(this);
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
    on("click",handlerStopPropagation,"input");
}

function handlerStopPropagation(e){
    //冒泡兼容写法
    typeof e.stopPropagation === "function" ? e.stopPropagation() : e.cancelBubble = true;
}

function handlerChangeText(){
    this.outerHTML = this.value;
}