on(ele_todoList , "click",handlerChangeText, "p");
on(ele_todoList , "change",handlerWriteText,  "input");

function handlerChangeText(){

    //this指向触发事件的元素p
    //如果p元素的子集长度大于1,直接返回;
    if(this.children.length >= 1){
        return false;
    }
    var input = createElement({
        type:"input",
        attr:{
            value:this.innerHTML,
        }
    })
    this.innerHTML = ""; //清空p之前的内容
    this.appendChild(input);//p里加上input
    input.select();
}

function handlerWriteText(){
    //让父级元素里的内容变成input的value;
    this.outerHTML = this.value;
}