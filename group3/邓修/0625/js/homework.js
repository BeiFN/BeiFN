"use strict"
//事件委托封装
// var ul=document.querySelector("ul");
// ul.addEventListener("click",delegation(handlerOnclick,".lilili"));//当事件执行时，调用delegation返回的匿名函数
// function delegation(handlerOnclick,selector){       //返回一个匿名函数
//     return function(evt){                           //在匿名函数中判断给哪个元素绑定事件处理函数
//         var e=evt||event;
//         var eleList=document.querySelectorAll(selector);
//         var target=e.target||e.srcElement;
//         var targetList=[];
//         var temp=target;
//         while(true){
//             if(temp===this) break;
//             targetList.push(temp);
//             temp=temp.parentNode;
//         }
//         if(targetList.length===0)   return false;
//         for(var i=0,ele;ele=eleList[i++];){
//             if(targetList.length===1?(targetList[0]===ele):(targetList.indexOf(ele)!==-1)){
//                 handlerOnclick.call(ele);
//             }
//         }
//     }
// }
// function handlerOnclick(){
//     this.style.background="yellowgreen";
// }

//封装some()
// var arr=[1,2,3,4,5];
// function mySome(arr,fn){
//     for(var i=0;i<arr.length;i++){
//         if(fn(arr[i],i,arr))
//             return true;
//     }
//     return false;
// }
// console.log(mySome(arr,function(item,index,arr){
//     return item===3;
// }));

//封装flat()
// var arr = [
//     [1, 2, 3, 4, 5],
//     [6, 7, 8, 9, 10]
// ];
// function myFlat(arr) {
//     if (!myFlat.res) {
//         myFlat.res = [];
//     }
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] instanceof Array)
//             myFlat(arr[i]);
//         else
//             myFlat.res.push(arr[i]);
//     }
//     return myFlat.res;
// }
// console.log(myFlat(arr));