function selector(select){
    var ele = null;
    return (ele = document.querySelectorAll(select)).length===1? ele[0] :ele;

}

var e_todolist = selector("#todolist");
var e_donelist = selector("#donelist");
var e_todocout = selector("#todocount");
var e_donecout = selector("#donecount");
var e_input = selector("#title");

e_input.onkeydown = function(evt){
    var e = evt || window.event;
    if(e.keyCode === 13){
        addTodoList();
        e_input.select();
    }
}
function addTodoList(){
    var ipttext = e_input.value;
    console.log(ipttext);
    var li = createElementView( {
        type : "li",
        children : [
            {
                type : "input",
                attr : {type: "checkbox"}
            },
            {
                type : "p",
                html : ipttext
            },
            {
                type : "a",
                html : "-"
            }
        ],
        html : "",
    });
    console.log(li);
    li.children[0].onchange = checkView;
    li.children[2].onclick = removeNotes;
    e_todolist.insertBefore(li, e_todolist.childNodes[0]);
    countNum();
}
function createElementView(jsonData){
    typeof jsonData === "undefined"? jsonData = {}: "";

    var view = document.createElement(jsonData.type?jsonData.type : "div");

    for(var key in jsonData.attr){
        view.setAttribute(key, jsonData.attr[key]);
    }
    console.log(jsonData.html);
    view.innerHTML = jsonData.html?jsonData.html:"";

    for(var i=0, childs;jsonData.children && (childs = jsonData.children[i++]);){
        childs.nodeType ===1? view.appendChild(childs):view.appendChild(createElementView(childs));
    }
    return view;

}

function checkView(){
    if(this.checked){
        e_donelist.insertBefore(this.parentNode, e_donelist.childNodes[0]);
    }else{
        e_todolist.insertBefore(this.parentNode, e_todolist.childNodes[0]);
    }
    countNum();
}

function removeNotes(){
    this.parentNode.remove();
    countNum();
}

function countNum(){
    e_todocout.innerHTML = e_todolist.children.length;
    e_donecout.innerHTML = e_donelist.children.length;
}