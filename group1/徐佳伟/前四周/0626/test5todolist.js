on(todolist,"click",handlerChangeingText,"p");
// on(todolist,"change",handlerChangeText,"input");
function handlerChangeingText(){
    // if(this.children.length >= 1){
    //     return false;
    // }
    var input = createElement({
        type : "input",
        attr : {
            type : "text",
            value : this.innerHTML
        }
    })
    console.log(this);
    console.log(this.innerHTML)
    this.innerHTML = "";
    this.appendChild(input);
    input.select();
    // on(input,"click",handlerClick);
}
function handlerClick(evt){
    var e = evt || window.event;
   
    typeof e.stopPropagation === "function"? e.stopPropagation() : e.cancelBubble = true;
}

function handlerChangeText(){
    this.outerText = this.value;
}