var ipt=$$("#title");
var todolist=$$("#todolist");
var donelist=$$("#donelist");
ipt.onkeydown=addItem;
function addItem(evt){
    var e=evt||window.event;
    if(e.keyCode==13){
        var iptValue=ipt.value;
        var li=creatItem({
                        type:'li',
                        attr:{
                            class:"box"
                        },
                        children:[
                            {
                                type:'input',
                                attr:{type:'checkbox'}
                            },
                            {
                                type:'p',
                                html:iptValue
                            },
                            {
                                type:'a',
                                html:'-'
                            }
                        ]

    })
    todolist.insertBefore(li,todolist.childNodes[0]);
    ipt.select();
    li.childNodes[0].onchange=handelChange;
    li.childNodes[2].onclick=removeItem;
    }
}

function creatItem(ele){
    typeof ele=="undefined"?ele={}:"";
    var item=(ele.type?document.createElement(ele.type):document.createElement("div"));
    for(attr in ele.attr){
        item.setAttribute(attr,ele.attr[attr]);
    }
    item.innerHTML=ele.html?ele.html:"";
    for(var i = 0, childEle ; ele.children && (childEle = ele.children[i++]) ;  ){
        item.appendChild(creatItem(childEle));
    }
    console.log(item);
  return item;

}
function handelChange(){
    if(this.checked){
        donelist.insertBefore(this.parentNode,donelist.childNodes[0])
    }else{
        todolist.insertBefore(this.parentNode,todolist.childNodes[0])
    }
}
function removeItem(){
    this.parentNode.remove();
}
function $$(selector){
    return (document.querySelectorAll(selector).length==1?document.querySelectorAll(selector)[0]:document.querySelectorAll(selector));
}
