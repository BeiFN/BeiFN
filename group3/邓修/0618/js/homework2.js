//倒计时
// setInterval(countDown, 1000)
// function countDown() {
//     var countArray = getCountDown(2019, 6, 19); //设置倒计时时间
//     days_box.innerHTML = countArray[3]
//     hour_box.innerHTML = countArray[0];
//     minute_box.innerHTML = countArray[1]
//     second_box.innerHTML = countArray[2];
// }
// // 在页面加载的时候 , 第一次要调用一下;
// countDown();
// function getCountDown() {
//     // 1. 只传年月日 ;
//     // 2. 传年月日时分秒;
//     var
//         hour = 0,
//         minute = 0,
//         second = 0;
//     var targetDate = new Date();
//     targetDate.setFullYear(arguments[0]);               // 设置年份
//     targetDate.setMonth(arguments[1] - 1);              // 设置月份
//     targetDate.setDate(arguments[2]);                   // 设置日期

//     // 根据参数不同,我们会进行不同的计算;
//     if (arguments.length > 3) {
//         hour = arguments[3];
//         minute = arguments[4];
//         second = arguments[5];
//     }
//     targetDate.setHours(hour);                          //设置小时
//     targetDate.setMinutes(minute);                      //设置分钟
//     var targetTime = targetDate.setSeconds(second);     //设置秒，并返回设置的时间戳
//     var reduce = targetTime - Date.now();               //设置时间减当前时间得到剩余时间，单位为毫秒
//     var second = parseInt(reduce / 1000 % 60);          //剩余时间的秒数除以60得到余数为要显示的秒数
//     var minute = parseInt(reduce / 1000 / 60 % 60);     //剩余时间的秒数除以60再除以60得到余数为要显示的分钟数
//     var hour = parseInt(reduce / 1000 / 3600);          //剩余时间的秒数除以3600得到要显示的小时数
//     var days = hour > 24 ? parseInt(hour / 24) : 0;     //剩余时间如果超过24小时，就显示天数和除以24得到的余数
//     hour = hour > 24 ? hour % 24 : hour;                //剩余时间如果超过24小时，就显示天数和除以24得到的余数
//     if(days===0)
//         days=null;
//     else
//         days+=" : ";
//     return [
//         hour < 10 ? "0" + hour + " : " : "" + hour + " : ",
//         minute < 10 ? "0" + minute + " : " : "" + minute + " : ",
//         second < 10 ? "0" + second : "" + second,
//         days
//     ];
// }

//数码时钟
// setInterval(nowTime,500)
// function nowTime(){
//     var d=new Date();
//     var year=d.getFullYear() + "/";
//     var month=(d.getMonth()*1+1) + "/";
//     var wday=d.getDate() + "&nbsp;&nbsp;";
//     var hour=d.getHours();
//     var minute=d.getMinutes();
//     var second=d.getSeconds();
//     hour=hour < 10 ? "0" + hour + "&nbsp;:&nbsp;" : "" + hour + "&nbsp;:&nbsp;";
//     minute=minute < 10 ? "0" + minute + "&nbsp;:&nbsp;" : "" + minute + "&nbsp;:&nbsp;";
//     second=second < 10 ? "0" + second : "" + second;
//     container.innerHTML=year+month+wday+hour+minute+second;
// }
// nowTime();

//进度条和广告弹出框
// var progress_width = 0;
// var progress_interval = null;
// var target = 600; // 目标点;
// progress_interval = setInterval(progressing, 30)
// function progressing(prop) {
//     if (prop !== undefined && typeof prop === "number") {
//         progress_width = target * prop / 100;
//     } else {
//         progress_width += 5;
//     }
//     percent.innerHTML=parseInt(progress_width/6) + "%";
//     progress.style.width = progress_width + "px";
//     if (progress_width === target) {
//         alert("广告");
//         clearInterval(progress_interval);
//     }
// }
// // progressing(30);
// document.onclick = function () {
//     progressing(0);
// }

//顶部悬浮和回到顶部
// window.onscroll = function () {
//     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//     // 1. 控制nav导航的定位属性和回到顶部按钮的隐藏;
//     if (scrollTop >= 400) {
//         nav.style.position = "fixed";
//         nav.style.top = "0px";
//     } else {
//         nav.style.position = "static";
//         goTop.style.display = "none";
//     }

//     // 2.控制回到顶部按钮的显示隐藏;
//     if (scrollTop >= 1400) {
//         // console.log(goTop.offsetTop);
//         // alert("停");
//         goTop.style.position = "absolute";
//         goTop.style.top = "2000px";
//         goTop.style.display = "block";
//     } else if (scrollTop < 1400 && scrollTop >= 400) {
//         goTop.style.cssText = "display:block;position:fixed;top:600px";
//     }
// }

// goTop.onclick = function () {
//     // 给scrollTop 赋值为 0;
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }