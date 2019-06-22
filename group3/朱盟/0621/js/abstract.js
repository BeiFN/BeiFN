//---功能区

/**
 *
 * 扩展的选择器方法 |仿 JQ
 * @param {选择符*String} selecter
 * @returns 返回选中的元素对象或者元素的集合
 */
function $(selecter) {
    var ele = null; //待返回的对象
    return (ele = document.querySelectorAll(selecter)).length === 1 ? ele[0] : ele;
    //如果查找出元素的个数是1个那么，就返回匹配的选择符的伪数组的第一个，否则就返回全部
}


/**
 *元素创建
 *
 * @param {
 * {
 * tagName:""*string
 * attr:{}//*object
 * html:""// content* string
 * children:[] 子元素集合
 * } *object} object
 * @returns 创建的元素
 */
function createElement(object) {
    typeof object === "undefine" ? object = {} : ""; // 如果传进去的参数是undefine 那么赋值空对象
    object.tagName ? "" : object.tagName = "div";
    //如果对象tagName是空，那么给他默认值为div
    var ele = document.createElement(object.tagName);
    //创建对象
    for (const key in object.attr) {
        ele.setAttribute(key, object.attr[key]);
    }
    // 遍历DOM元素的属性和属性值并添加到元素
    ele.innerHTML = object.html ? object.html : "";
    //添加元素的内容 HTML
    for (var i = 0, item; object.children && (item = object.children[i++]);) {
        //在子元素列表拥有的情况才进行遍历
        item.nodeType === 1 ? ele.appendChild(item) : ele.appendChild(createElement(item));
        //如果元素的节点类型为 元素对象 那么就给他添加到 创建的元素中，否则就给他先创建后再添加到创建的元素中。
    }
    return ele;
}

// // demo
// var p = {
//     tagName: "p",
//     attr: {
//         class: "active",
//         id: 123
//     },
//     html: "123",
//     children: [{
//             tagName: "a"
//         },
//         createElement({
//             tagName: "div",
//             attr: {
//                 id: "div1"
//             },
//             html: "www"
//         })
//     ]
// }


// 测试
// console.dir();
// console.dir(setAttribute());

// setAttribute() 2. 封装getAttribute() 

createElement({tagName:"p"})
console.dir();

var p=createElement({tagName:"p"});
// p.attr();
// Object.prototype.attr=function attr(){
//     console.log("0000");
// }