on(todolist, "click", handlerClick, "p")
on(todolist,"change",handlerWrite,".changeTxt")
function handlerClick() {
    if (this.children.length >= 1) {
        return false;
    }
    var ipt = createElement({
        type: "input",
        attr: {
            type: "text",
            value: this.innerHTML,
            class:"changeTxt"
        }
    })
    // ipt.value = this.innerHTML;
    this.innerHTML = ""
    this.appendChild(ipt)
}
// todolist.addEventListener("click",pTextChange);
// function pTextChange(evt){
//     var e = evt||event;
//     ipt.value = pTextChange.innerHTML;
//     pTextChange.innerHTML=""
// }
function handlerWrite(){
    this.outerHTML = this.value
}