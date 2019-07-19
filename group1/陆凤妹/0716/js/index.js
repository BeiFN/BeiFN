// 添加随机颜色

$(".content div").css({
          background : function(){
                    let r = Math.round(Math.random() * 255);
                    let g = Math.round(Math.random() * 255);
                    let b = Math.round(Math.random() * 255);
                    return "rgb(" + r + ","+ g + ", "+ b+")";

          }
          
})