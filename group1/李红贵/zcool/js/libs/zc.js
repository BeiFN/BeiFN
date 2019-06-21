

  var page = 0, n=0;
  
  function changeBannerImg(n , type){
    if(type === "+"){
        n += 1;
        if(n > 5){
            n = 0;
        }

    }else{
        n -= 1;
        if(n < 0){
            n = 5;
        }
    }
    console.log(n);
    return n;
  }

var bannImgArr = ['https://img.zcool.cn/community/014fa65d0002cba801213ec2a943f6.jpg@1380w',
                    'https://img.zcool.cn/community/01576e5d0002a3a801213ec2c0e506.jpg@1380w',
                    'https://img.zcool.cn/community/016c785d01aa27a801205e4b719f4d.png@1380w',
                    'https://img.zcool.cn/community/0111655d0002b7a801205e4b674fed.jpg@1380w',
                    'https://img.zcool.cn/community/016f0c5d01a9c7a801213ec2fa2eb3.jpg@1380w',
                    'https://img.zcool.cn/community/0164b75d01b57ca801213ec203a326.jpg@1380w'];

window.onload = function(){

}


var timers = null;
timers = setInterval(changePage,5000);
     
function changePage(){
    page = changeBannerImg(page , "+");
    changeImage(page);
}
lastBtn.onclick = function(){
    page = changeBannerImg(page , "-");
    changeImage(page);
}


accessLink.onclick = function (){
    alert("进入第"+page+"个链接");
}


nextBtn.onclick = function(){
    page = changeBannerImg(page, "+");
      
      console.log(page);
      console.log(bannImgArr[page]);
      var str =  bannImgArr[page];

    var str1 = "https://img.zcool.cn/community/0164b75d01b57ca801213ec203a326.jpg@1380w";

    bannImg.style.backgroundImage = "url("+ bannImgArr[page] +")";

  

}


function changeImage(page){
    switch(page){
        case 0: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/014fa65d0002cba801213ec2a943f6.jpg@1380w');";
            break;
        case 1: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/01576e5d0002a3a801213ec2c0e506.jpg@1380w');";
            break;
        case 2: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/016c785d01aa27a801205e4b719f4d.png@1380w');"
            ;break;
        case 3: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/0111655d0002b7a801205e4b674fed.jpg@1380w');"
            ; break;
        case 4: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/016f0c5d01a9c7a801213ec2fa2eb3.jpg@1380w');"
            ;break;
        case 5: 
            bannImg.style = "background-image:url('https://img.zcool.cn/community/0164b75d01b57ca801213ec203a326.jpg@1380w');"
            ;break;
    }

  }
                    
                    
  window.onscroll = function(){
    // screenTop//超出顶部的高度

    // 有兼容性问题，浏览器升级后，无法还原，解决方案   分别加body和html高度
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
   
    console.log(scrollTop);



// 获取屏幕高
    var hbody = window.innerHeight || document.body.offsetHeight
    console.log(hbody);

    if(scrollTop > 920){
        console.log("定");
        
        goTop.style.position = "absolute";
        goTop.style.right= "60px";
        goTop.style.top = "1395px";
    }else if(scrollTop >= 200 && scrollTop <= 920){
        // 
        goTop.style.cssText = "display:block; position:fixed; right:60px; bottom:50px";

        // goTop.style.display = "block";
        // goTop.style.position = "fixed";
        // goTop.style.right= "60px";
        // goTop.style.bottom= "50px";


    }else {
        goTop.style.display = "none";
    }

}                   
                    








