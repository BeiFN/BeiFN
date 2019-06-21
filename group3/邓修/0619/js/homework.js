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

//