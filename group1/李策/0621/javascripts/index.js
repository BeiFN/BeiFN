
var eleInput = getelement("#title");
var eleTodolist = getelement("#todolist")
var eleDonelist = getelement("#donelist")
var todosummary = getelement("#todocount")
var donesummary = getelement("#donecount")

function getelement(clue){
    var ele = null;
    return ( ele = document.querySelectorAll(clue) ).length === 1 ?  ele[0] :ele ;
}

function Addlist() {
    var ipt = eleInput.value;
    var li = CreateElement({
        type: "li",
        children: [
            {
                type: "input",
                attr: {
                    type :"checkbox"
                }
            },
            {
                type : "p",
                html : ipt 
            },
            {
                type : "a",
                html : "-"
            }
        ]
    })
    eleTodolist.insertBefore( li , eleTodolist[ 0 ]);
    li.children[0].onchange = moveItem;
    li.children[2].onclick  = removeItem;
    summary();
}

function CreateElement(lijson){
    typeof lijson === undefined ? lijson = {} : "";

    var ele = document.createElement( lijson.type ? lijson.type : "div");

    for( var index in lijson.attr ){
        ele.setAttribute( index,lijson.attr[index]);
    }

    ele.innerHTML = lijson.html ? lijson.html : "" ;

    for( var i = 0, Child ; lijson.children && ( Child = lijson.children[i++]) ; ){
        Child.nodeType === 1 ? ele.appendChild(Child) : ele.appendChild( CreateElement(Child) );
    }
    return ele;
}

function moveItem(){
    if( this.checked ){
        eleDonelist.insertBefore( this.parentNode , eleDonelist.childNodes[0] );
    } else {
        eleTodolist.insertBefore( this.parentNode , eleTodolist.childNodes[0] );
    }
    summary();
}

function removeItem(){
    this.parentNode.remove();
    summary();
}

function summary(){
    todosummary.innerHTML = eleTodolist.children.length;
    donesummary.innerHTML = eleDonelist.children.length;
}



eleInput.onkeydown = function (evt) {
    var e = evt || window.event;
    if (e.keyCode === 13) {
        Addlist();
        eleInput.select();
    }
}