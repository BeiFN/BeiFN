//延时二级菜单
// var navBtn = document.getElementById("nav_btn");
// var list = document.getElementById("list");
// var timer = null;
// //移入一级菜单显示二级菜单
// navBtn.addEventListener("mouseover", displayList);
// function displayList() {
//     list.style.display = "block";
// }
// //移出一级菜单延时隐藏二级菜单
// navBtn.addEventListener("mouseout", delayHideList);
// function delayHideList() {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//         list.style.display = "none";
//     }, 500);
// }
// //移入二级菜单通知一级菜单不在隐藏二级菜单
// list.addEventListener("mouseover", notHideList);
// function notHideList() {
//     clearTimeout(timer);
//     list.style.display = "block";
// }
// //移出二级菜单隐藏二级菜单
// list.addEventListener("mouseout", hideList);
// function hideList() {
//     list.style.display = "none";
// }

//去标签
// var reg=/<[^<>]*>\s*/g;//元字符方式
// // var reg=/<(.*?)>\s*/g;//懒惰模式
// var input=document.getElementById("input");
// var output=document.getElementById("output");
// var btn=document.getElementById("btn");
// btn.addEventListener("click",deletTag);
// function deletTag(){
//     var inputValue=input.value;
//     output.value=inputValue.replace(reg,"");
// }

//bind封装和柯里化
// function myBind(fn,_this){
//     var arg1=[].slice.call(arguments).slice(2);     //myBind在创建函数时绑定的参数
//     return function(){
//         var arg2=[].slice.call(arguments);          //匿名函数被调用时传入的参数
//         fn.apply(_this,arg1.concat(arg2));
//     }
// }
// function fn(){
//     console.log(this,arguments);
// }
// var foo=myBind(fn,{name:"my bind"},"this is my bind");
// foo(1,2,3);