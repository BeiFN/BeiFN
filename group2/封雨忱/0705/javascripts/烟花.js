let {randomColor}=Utils;
class Firework{
    constructor(selector){
        this.main = document.querySelector(selector);
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
        var fire = this.fireworkInit(offsetX);
        this.fireworkMove(fire,offsetY, this.fireworkBoom.bind(this,offsetX,offsetY));
    }
    fireworkBoom(offsetX,offsetY){
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

              move(fire_boom , {
                    left : fire_targetX ,
                    top  : fire_targetY ,
                    opacity : 0
              },function(fire_boom){
                    fire_boom.remove();
              }.bind(false,fire_boom))
        }
    }
    fireworkMove(fire , offsetY , boomCallback){
        move(fire,{
            top : offsetY
      },function(){
            fire.remove();
            boomCallback();
      });
    }
    fireworkInit(offsetX){
        var fire = this.createFirework();
        fire.style.left = offsetX + "px";
        fire.style.bottom = 0;
        this.main.appendChild(fire); 
        return fire;
    }
    createFirework(){
        var fire = document.createElement("div");
            fire.className = "firework";
            fire.style.background = randomColor();
            return fire;
    }
}
function move( dom , options , callback){
    clearInterval( dom.timer );
    dom.timer = setInterval( function(){

          for(var attr in options){
                // console.log(attr,options[attr]);
                if( attr === "opacity"){
                      var iNow = parseInt(getComputedStyle(dom)[attr] * 100 )
                }else{
                      var iNow = parseInt(getComputedStyle(dom)[attr])
                }

                var speed = (options[attr] - iNow) / 10;
                speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);

                if(options[attr] === iNow){
                      delete options[attr];

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
new Firework("#container");
