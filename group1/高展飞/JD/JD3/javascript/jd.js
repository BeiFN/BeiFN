
var hide = $(".hide");
var logo = $(".logo");
var reder = $(".reder");
var place =$(".place");
var container1 = $(".container1");
var slides =$(".wrapper1").children;
var h = $(".hour");
var m = $(".minute");
var s= $(".second");


function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1? ele[0] :ele;
}
//头部
xspan.addEventListener("click",handlerXspan);
function handlerXspan(){
    hide.style.display = "none";
}

//北京




// //导航
// var json = [
//     {
//         urlImage: "https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/static/images/sprite.head.png"
//     },
//     {
//         urlImage:"https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=0.4061590679023295"
//     }
// ];
// logo.addEventListener("mouseover",handlerLogoOver);
// function handlerLogoOver(){
      

//         logo.style.background ='url('+json[1].urlImage+')';
        
// }
// logo.addEventListener("mouseout",handlerLogoOut);
// function handlerLogoOut(){ 
//          logo.style.background ="url(https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/static/images/sprite.head.png)";
//         setTimeout(function(){
           
//         },2000)
       
// }
//倒计时
function countdown(){
    var hour = 2;
    var minute = 59;
    var second = 60;
    var timer = setInterval(()=>{
        if(hour<=0&& minute<=0&&second<=0){
            hour = 2;
            minute = 59;
            second = 59;
        }
        if(minute<=0){
            minute = 59;
            hour --;
        }
        if(second<=0){
            minute --;
            second = 60;
        }

        second --;
        h.innerHTML = hour<10? "0"+hour: "hour";
        m.innerHTML = minute<10? "0" +minute :minute;
        s.innerHTML = second<10? "0" +second :second;
    },1000)
}
countdown();
//四连击轮播
var json =[
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        title:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        title:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        title:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img14.360buyimg.com/mobilecms/s140x140_jfs/t1/73096/11/3514/123422/5d1b2559E63247cdd/76000962babb6090.jpg!q90.webp",
        name:"【专柜正品】香奈儿邂逅柔情女士香水/5号香水/CoCo小姐姐应嘤嘤",
        nowprice:"￥468.00",
        oriprice:"￥908.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        title:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        title:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    },
    {
        img:"https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/46545/37/4159/105627/5d1dc828Ea7a32c69/85ae4b8ecde83c96.jpg!q90.webp",
        name:"【宗家】惠州茅台镇酱香白酒真的好哟",
        nowprice:"￥289.00",
        oriprice:"￥469.00"
    }
]
function  container11(){
var j =-1;
for(var k=0;k<8;k++){
    var count = 0;
    var str = "";
    for(var i = 4*k; i<json.length;i++){
        count++;
        str +=  '<div class="dd">'+
                '<img src="'+json[i].img+'" alt="" >'+
                '<p>'+json[i].name+'</p>'+
                '<dl>'+
                    '<dt>'+json[i].nowprice+'</dt>'+
                    '<dd>'+json[i].oriprice+'</dd>'+
                '</dl>'+
                '</div>'
       if(count === 4){
            j++;
            for(var j,slide;slide=slides[j];){
                slide.innerHTML= str;
                break;
            }
            break;
       }
    }
}
}
container11();






// for(var i = 0; i<json.length;i++){
//     str +=  '<div>'+
//             '<img src="'+json[i].img+'" alt="" >'+
//             '<p>'+json[i].name+'</p>'+
//             '<dl>'+
//                 '<dt>'+json[i].nowprice+'</dt>'+
//                 '<dd>'+json[i].oriprice+'</dd>'+
//             '</dl>'+
//             '</div>'
// }
// container1.innerHTML = str;
// 倒计时
