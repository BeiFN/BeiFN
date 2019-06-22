//动态表格创建
// btn.onclick=function(){
//     var rows=row.value;
//     var cols=col.value;
//     var tab=document.createElement("table");
//     tab.style.textAlign="center";
//     for(var i=0;i<rows;i++){                                                                                //行数
//         var tr=document.createElement("tr");                                                                //创建一行
//         for(var j=0;j<cols;j++){                                                                            //列数
//             var td=document.createElement("td");                                                            //创建一列
//             td.innerHTML=Math.round(Math.random()*100);                                                     //单元格填写0-100随机数字
//             td.style.backgroundColor="#"+Math.round(Math.random()*16777215).toString(16).padStart(6,"0");   //单元格随机颜色
//             tr.appendChild(td);
//         }
//         tab.appendChild(tr);
//     }
//     document.body.appendChild(tab);
//     document.body.style.color="#fff";
// }

//聊天对话框
// var sendBtn = document.getElementById("sendbtn");
// var sendText = document.getElementById("msg_input");
// var content = document.getElementById("content");
// sendBtn.onclick = function () {
//     //判断是否为空并去除两边多余的空格
//     if (sendText.value.trim().length === 0) return false;
//     //创建元素
//     var div = document.createElement("div");
//     var li = document.createElement("li");
//     div.style.clear = "both";
//     li.className = "msgContent right";
//     li.innerHTML = sendText.value;
//     //插入元素
//     content.appendChild(div);
//     content.appendChild(li);
//     //使元素插入后滚动到可视区域
//     li.scrollIntoView();
//     //发送后清空内容并获取焦点
//     sendText.value = "";
//     sendText.focus();
// }

//隔行变色
// var li_list = document.getElementsByTagName("li");
// var color = "";
// for (var i = 0, li; li = li_list[i++];) {
//     li.index = i;
//     if (i % 2) {
//         li.style.background = "#aaa";
//     }
//     else li.style.background = "#666";
//     li.onmouseover = function () {
//         color = this.style.background;
//         this.style.background = "#000";
//     }
//     li.onmouseout = function () {
//         this.style.background = color;
//         color = "";
//     }
// }

//延时二级菜单
// var navBtn = document.getElementById("nav_btn");
// var list = document.getElementById("list");
// // 记录当前开启的延时器;
// var timer = null;
// // 鼠标移入一级菜单;            
// navBtn.onmouseover = function () {
//     // 显示二级菜单;
//     list.style.display = "block";
// }
// // 鼠标移出一级菜单;
// navBtn.onmouseout = function () {
//     // 隐藏二级菜单; 
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//         // 如果没有移入到二级菜单，那么直接隐藏二级菜单;
//         list.style.display = "none";
//     }, 500)
// }
// list.onmouseover = function () {
//     // 鼠标移入二级菜单就关闭延时器，这样二级菜单就不会隐藏了
//     clearTimeout(timer);
//     list.style.display = "block";
// }
// list.onmouseout = function () {
//     list.style.display = "none";
// }