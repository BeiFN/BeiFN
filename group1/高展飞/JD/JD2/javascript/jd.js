
var hide = $(".hide");
var logo = $(".logo");
var reder = $(".reder");
var place =$(".place");
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
