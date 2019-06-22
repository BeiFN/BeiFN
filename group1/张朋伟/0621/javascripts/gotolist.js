var ele_input = document.getElementById("title");
var ele_todolist = document.getElementById("todolist");
var ele_donelist = document.getElementById("donelist");
var ele_todoCount = document.getElementById("todocount");
var ele_doneCount = document.getElementById("donecount")





function addTodoItem() {
    //获取input的内容
    iptValue = ele_input.value;
    // 将值插入到togo列表中
    // 1 创建列表

    // var li = createElement({
    //     type: "li",
    //     children: [{
    //             type: "input",
    //             attr: {
    //                 type: "checkbox"
    //             }
    //         },

    //         {
    //             type: "p",
    //             html: iptValue
    //         },
    //         {
    //             type: "a",
    //             html: "-"
    //         }
    //     ]

    // })
    var li = createElement({
        type: "li",
        children: [{
                type: "input",
                attr: {
                    type: "checkbox"
                }
            },
            {
                type: "p",
                html: iptValue
            },
            {
                type: "a",
                html: "-"
            }
        ]
    })



    //插入内容
    function createElement(domJson) {
        typeof domJson === "undefined" ? domJson : "";
        var ele = document.createElement(domJson.type ? document.type : "div");
        for (var attr in domJson.attr) {
            ele.setAttribute(attr, domJson.attr[attr]);
        }
        ele.innerHTML = domJson.html ? domJson.html : "";

        //添加元素
        for (var i = 0, childEle; domJson.children && (childEle = domJson.children[i++]);) {
            // console.log(ele);
            childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild(createElement(childEle));
        }
        return ele;
    }
    li.children[0].onchange = handlerTodoToDone;
    li.children[1].onclick = removeItem;
    ele_todolist.insertBefore(li, ele_todolist.childNodes[0]);
    countLi();

}

function handlerTodoToDone() {
    if (this.checked) {
        ele_donelist.insertBefore(this.parentNode, ele_donelist.childNodes[0]);
    } else {
        ele_todolist.insertBefore(this.parentNode, ele_todolist.childNodes[0]);
    };
    countLi();
}

function removeItem() {
    this.parentNode.remove();
    countLi();
}

function countLi() {
    var doneCount = ele_donelist.children.length;
    var todoCount = ele_todolist.children.length;
    ele_todoCount.innerHTML = todoCount;
    ele_doneCount.innerHTML = doneCount


}


ele_input.onkeydown = function (evt) {
    var e = evt || window.event;
    if (e.keyCode === 13) {
        addTodoItem();
        ele_input.select();
    }
}

// ele_input.onkeydown = function (evt) {
//     var e = evt || event;
//     if (e.keyCode === 13) {
//         addTodoItem();
//         ele_input.select();
//     }
// }