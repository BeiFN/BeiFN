/**
 *  ele_title  列表输入框的内容
 *  ele_todolist  代办事项
 *  ele_donelist   已完成事项
 */

 var ele_title = document.querySelector("#title");
 var ele_todolist = document.querySelector("#todolist");
 var ele_donelist = document.querySelector("#donelist");

/**
 * json = {
 *      type:"li",
 *      attr:{
 *       class:"active";
 *      },
 *      html:"",
 *      children:[
 *        {type: input, attr:{type:"checkbox"} },{type: p, html:value}
 *      ]
 * }
 */
//添加列表项
 function addNewList(){
     var listText = ele_title.value;
     var li = createEle({
         type:"li",
         attr:{
             class:"aaa"
         },
         childrens:[
             {
                 type:"input",
                 attr:{
                     type:"checkbox"
                 }
             },
             {
                 type:"p",
                 html: listText
             },
             {
                 type:"a",
                 html:"-"
             }
         ]
     });
    //  console.log(li);
    ele_todolist.insertBefore(li , ele_todolist.childNodes[0]);
    //添加checkbox的改变事件
    li.children[0].onchange = todoJumpDone;
    //a标签的点击删除事件
    li.children[2].onclick = deleteList;

    //列表数量的显示
    todocount.innerHTML =ele_todolist.childElementCount;
    ele_title.value = "";
 }


//改变checkbox的状态，列表项会根据需求在tolist和donelist之间跳转
function todoJumpDone(){
    if(this.checked){
        ele_donelist.insertBefore(this.parentNode  ,ele_donelist.childNodes[0]);
        todocount.innerHTML =ele_todolist.childElementCount;
        donecount.innerHTML = ele_donelist.childElementCount;
    }else{
        ele_todolist.insertBefore(this.parentNode  , ele_todolist.childNodes[0]);
        todocount.innerHTML =ele_todolist.childElementCount;
        donecount.innerHTML = ele_donelist.childElementCount;
    }
}

//元素a的删除列表项事件
function deleteList(){
    this.parentNode.remove();
    todocount.innerHTML =ele_todolist.childElementCount;
    donecount.innerHTML = ele_donelist.childElementCount;
}

//通过json对象创建元素
function createEle(eleJson){
    typeof domJson === "undefined" ? domJson = {} : "";
    // 创建元素
    var ele = document.createElement( eleJson.type ? eleJson["type"] :"div" );

    //添加attr里的属性
    for(var a in eleJson.attr){
        ele.setAttribute(a,eleJson.attr[a]);
    }
    if(eleJson.html){
        ele.innerHTML = eleJson.html;
    }

    //添加子元素----------------疑问点:代码能看懂，但是不明白为什么要这样写，为什么要判断childNode的元素类型
    for(var i = 0 , childNode ; eleJson.children && (childNode = eleJson.children[i++]);){
     childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild( createEle(childNode) );
    //    childNode.nodeType === 1 ? ele.appendChild(e) :ele.appendChild(createEle(e));;
    }

    //添加子元素----------------
    for(var i in eleJson.childrens ){        
        var e = createEle(eleJson.childrens[i]);
        ele.appendChild(e);
    }
    // console.log(ele);
    return ele;
 }

//按下enter键，触发添加事件
 ele_title.onkeydown = function(evt){
    var e = evt || event;
    if(e.keyCode === 13){
        addNewList();
    }
}
 