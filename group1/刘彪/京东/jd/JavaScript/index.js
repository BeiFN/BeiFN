function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

//关闭广告
var cancelBtn = $(".cancelBtn");
var topAd = $(".topAd");
cancelBtn.onclick = function(){
    topAd.style.display = "none";
}

//秒杀倒计时
let hoursbox = $(".hoursbox");
let minutebox = $(".minutesbox");
let secondbox = $(".secondsbox");

 
setInterval(() => {
    var time    = getCountDown(2019,7,9);
    hoursbox.innerHTML = time[0];
    minutebox.innerHTML = time[1];
    secondbox.innerHTML = time[2];
   

}, 1000);

function getCountDown(){
    var 
          hour   = 0,
          minute = 0,
          second = 0;

    var targetDate = new Date();
    targetDate.setFullYear(arguments[0]);           // 2019 6 18 
    targetDate.setMonth   (arguments[1] - 1);       // 2019 7 18 
    targetDate.setDate    (arguments[2]);           // 2019 7 10 
    
    // 根据参数不同,我们会进行不同的计算;
    if( arguments.length > 3){
          hour   = arguments[3];
          minute = arguments[4];
          second = arguments[5];
    }
    targetDate.setHours  (hour);
    targetDate.setMinutes(minute);
    var targetTime = targetDate.setSeconds(second);

    var reduce = targetTime - Date.now();

    var second = parseInt(reduce / 1000 % 60) ;
    var minute = parseInt(reduce / 1000 / 60 % 60);
    var hour   = parseInt( reduce / 1000 / 3600);
    var days   = hour > 24 ? parseInt(hour / 24) : 0;  
    hour       = hour > 24 ? hour % 24 : hour;

    // console.log(hour);
    return [
                hour < 10 ? "0" + hour : "" + hour ,
                minute < 10 ? "0" + minute : "" +minute ,
                second < 10 ? "0" + second : "" +second ,
                days ? days : ""
          ];
}


