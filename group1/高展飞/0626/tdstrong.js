on(ele_todoList,"click" ,handlerChangeText ,"p");
function handlerChangeText(){
    //判断p中有input的话，就不会再生成input
    if(this.children.length >= 1){
        return false ;
    }
    var input = createElement({
        type : "input",
        attr :{
            value : this.innerHTML
        }
    })
    //清空p中的内容
    this.innerHTML ="";
    //在p后添加一个input
    this.appendChild(input);
    //选中内容
    input.select();
    
}
