class Firework{

  constructor(selector){
    this.main = document.querySelector(selector);
    // 参数判断;
    if(this.main === null){ return false};
    this.init();
  }

  init(){
    this.main.addEventListener("click" , this.hanlderFireClick.bind(this));
  }

  hanlderFireClick(evt){
    var e = evt || window.event;
    var offsetX = e.offsetX;
    var offsetY = e.offsetY;
    // // this => 实例对象;
    // // 创建出一个随机颜色的div供我使用;
    // var fire = this.createFirework();
    // fire.style.left = offsetX + "px";
    // fire.style.bottom = 0;
    // this.main.appendChild(fire);
    var fire = this.fireworkInit(offsetX);
    this.fireworkMove(fire,offsetY, this.fireworkBoom.bind(this,offsetX,offsetY));
  }
  fireworkBoom(offsetX,offsetY){
    // console.log(offsetX,offsetY);
    var randomFireCount = 15 + Math.round(Math.random() * 10);
    var blank = Math.round(360 / randomFireCount);
    var r = 100 + Math.round(Math.random() * 100);
    var angle = 0;

    for(var i = 0 ; i < randomFireCount ; i++){
          angle += blank;

          var fire_targetX = Math.round(Math.cos( Math.PI / 180 * angle ) * r + offsetX); 
          var fire_targetY = Math.round(Math.sin( Math.PI / 180 * angle ) * r + offsetY); 

          var fire_boom = this.createFirework();
          fire_boom.style.left = offsetX + "px";
          fire_boom.style.top  = offsetY + "px";
          this.main.appendChild(fire_boom);

          Firework.move(fire_boom , {
                left : fire_targetX ,
                top  : fire_targetY ,
                opacity : 0
          },function(fire_boom){
                fire_boom.remove();
          }.bind(false,fire_boom))
    }

  }

  fireworkMove(fire , offsetY , boomCallback){
    Firework.move(fire,{
          top : offsetY
    },function(){
          fire.remove();
          boomCallback();
    });
  }     


  fireworkInit(offsetX){
        // this => 实例对象;
        // 创建出一个随机颜色的div供我使用;
        var fire = this.createFirework();
        fire.style.left = offsetX + "px";
        fire.style.bottom = 0;
        this.main.appendChild(fire); 
        return fire;
  }

  createFirework(){
    // 1.创建元素;\
    var fire = document.createElement("div");
    // 2. 运算;
    fire.className = "firework";
    fire.style.background = Firework.getRandomColor();
    // 3. 放入页面中;
    // this.main.appendChild(fire);
    return fire;
  }

  static getRandomColor(){
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

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


new Firework("#container");