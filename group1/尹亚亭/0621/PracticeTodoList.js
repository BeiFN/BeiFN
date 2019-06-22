
// 选择元素
var ele_input=$("#title");
var ele_todoList=$("#todolist");
var ele_doneList=$("#donelist");
var ele_todoCount=$("#todocount");
var ele_doneCount=$("#donecount");
// 对创建元素加以封装
function $(selector){
	var ele=null;
	return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
	
}

// 创建事项列表
function addToDoItem(){
	var iptValue=ele_input.value;
	// 创建出所要添加的li元素及其包含的子元素
	var li=createElement({
		type:"li",
		children:[
			{
				type:"input",
				attr:{
					type:"checkbox"
				}
			},
			{
				type:"p",
				html:iptValue
			},
			{
				type:"a",
				html:"-"
			}
		]
	})
	li.children[0].onchange=handlerToDoDone;    //选中后就移动到已经完成
	li.children[2].onclick=removeItem;      //点击删除就删除该项列表
    ele-todoList.insertBefore(li,ele-ele_todoList.childNodes[0]);  // 插入节点
	countLi();    // 计数
}
// 创建元素的封装
function createElement(domJson){
	typeof domJson==="undefined"?domJson={}:"";
	
	var ele=document.createElement(domJson.type?domJson.type:"div");
	for(var attr in domJson.attr){
		ele.setAttribute(attr,domJson.attr[attr]);
	}
	ele.innerHTML=domJson.html?domJson.html:"";
	for (var i=0,childEle;domJson.children && (childEle=domJson.children[i++]);) {
		childEle.nodeType===1?ele.appendChild(childEle):ele.appendChild(createElement(childEle));	
	}
	return ele;
}

// 移动列表事项的函数
function handlerTodoToDone(){
	if(this.checked){
		ele_doneList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);	
	}else{
		ele_todoList.insertBefore(this.parentNode,ele_doneList.childNodes[0]);
	}
	countLi();
}

// 删除列表事项的函数
function removeItem(){
	this.parentNode.remove();
	countLi();
}

// 计数列表事项的函数
function countLi(){
	var doneCount=ele_doneList.children.length;
	var todoCount=ele_todoList.children.length;
	ele_todoCount.innerHTML=todoCount;
	ele_doneCount.innerHTML=doneCount;
}


// 输入结束后按回车键，创建事项列表
ele_input.onkeydown=function(evt){
	var e=evt||window.event;
	if(e.keyCode===13){
		addTodoItem();
		ele_input.select();
	}
}






