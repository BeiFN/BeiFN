class Utils{




    
static move( dom , options , callback){
    clearInterval( dom.timer );
    dom.timer = setInterval( function(){
          // console.log(1);
          // 根据 attr 判定获取 iNow;
          // 根据iNow 和 target 获取 speed;
          // 根据target和 iNow 判定终止条件;
          // 根据attr 判定 dom操作;
          // * attr  target;
          for(var attr in options){
                // console.log(attr,options[attr]);
                if( attr === "opacity"){
                      var iNow = parseInt(getComputedStyle(dom)[attr] * 100 )
                }else{
                      var iNow = parseInt(getComputedStyle(dom)[attr])
                }
                // console.log(attr , iNow);
                // target => options[attr];
                var speed = (options[attr] - iNow) / 10;
                speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);

                if(options[attr] === iNow){
                      // 所有属性运动结束之后再去关闭定时器;
                      delete options[attr];
                      // console.log(options);
                      // var count = 0;
                      // for(var key in options){
                      //       count ++;
                      // }
                      // if(count === 0){
                      //       clearInterval(dom.timer);
                      // }
                      if(Object.keys(options).length === 0){
                            clearInterval(dom.timer);
                            typeof callback === "function" ? callback() : "";
                      }
                }else{
                      if(attr === "opacity"){
                            dom.style[attr] = (iNow + speed) / 100;
                      }else{
                            dom.style[attr] = iNow + speed + "px";
                      }
                }
          }
    } ,50)
}
}