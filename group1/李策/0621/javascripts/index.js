// var Input = Find("#title");
// var todolist = Find("#todolist");
// var donelist = Find("#donelist");

// function Find(clue) {
//     var element = null;
//     return (element = document.querySelectorAll(clue)).length === 1 ? element[0] : element;
// }

// function Add() {
//     var ipt = Input.value;
//     var li = creat({
//         type: "li",
//         children: [{
//             type: "input",
//             attr: {
//                 type: "checkbox" 
//             }
//         },
//         {
//             type : "p" ,
//             html : ipt 
//         },
//         {
//             type : "a" ,
//             html : "-"
//         }
//         ]
//     })
//     todolist.insertBefore( li , todolist.childNodes[ 0 ]);
//     li.childNodes [ 0 ] . onchange = moveItem ;
//     li.childNodes [ 2 ] . onclick  = removeItem;
// }

// function creat(Json){
//     typeof Json === undefined ? Json = {} : "" ;
//     var ele = document.createElement( Json.type ? Json.type : "div" ) ;
//     for( var index in Json.attr ){
//         ele.setAttribute( index , Json.attr[ index ]) ;
//     }
//     ele.innerHTML = Json.html ? Json.html : "" ;
//     for( var i = 0 , Child ; Json.children && ( Child = Json.children[ i++ ]);){
//         Child.Nodetype === 1 ? ele.appendChild( Child ) : ele.appendChild( creat( Child )) ;
//     }
//     return ele ;
// }

// function moveItem(){
//     if( this.checked ){
//         donelist.insertBefore( this.parentNode , donelist.childNodes[ 0 ]) ;
//     } else {
//         todolist.insertBefore( this.parentNode , todolist.childNodes[ 0 ]) ;
//     }
// }

// function removeItem(){
//     this.parentNode.remove() ;
// }

// Input.onkeydown = function(evt){
//     var e = evt || window.event;
//     if(e.keyCode === 13){
//         Add();
//         Input.select();
//     }
// }







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