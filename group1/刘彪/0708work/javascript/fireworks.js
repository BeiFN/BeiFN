let{move} = Utils;

class FireWorks{
    constructor(selector){
        this.main = document.querySelector(selector);
        if(this.main === null){return false;}
        this.init();
    }
    init(){
        this.main.addEventListener("click",this.handlerClick.bind(this))
    }
    handlerClick(evt){
        let e = evt || window.event;
        let offsetX = e.offsetX;
        let offsetY = e.offsetY;
        let fire = this.FireWorksInit(offsetX);
        this.fireworksMove(fire,offsetY,this.fireworkBoom.bind(this,offsetX,offsetY));
    }
    FireWorksInit(offsetX){
        let fire = this.createFirework();
        fire.style.left = offsetX + "px";
        fire.style.bottom = 0;
        this.main.appendChild(fire);
        return fire;
    }
    createFirework(){
        let fire = document.createElement("div");
        fire.className = "firework";
        let randomColor = "#"+Math.round(Math.random()*parseInt("ffffff",16)).toString(16).padStart(6,"0");
        fire.style.background = randomColor;
        return fire;
    
    }
    fireworksMove(fire,offsetY,boomCallBack){
        move(fire,{
                top : offsetY
            },function(){
                fire.remove();
                boomCallBack();
            });
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

}

new FireWorks("#container");