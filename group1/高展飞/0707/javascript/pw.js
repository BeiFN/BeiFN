/****
 * 
 * 1.核心部分  =》 难度选择，开场动画，计分，暂停等
 * 2.飞机      =》跟随移动
 * 3.子弹      =》  飞行移动，和敌机的交互（击落）
 * 4.敌机      =》 分类，小中大。
 * 
 */

let{ $ , on } = Utils;
 //核心部分
 //logo入场
 //飞机动画
 //背景运动

 class Core{
    constructor(){
       //核心元素
       this.option = $(".options");
       this.main = $(".main");
       //难度等级
       this.hardLevel = 0;
       //背景运动
       this.init();
    }
    init(){
        
       on(this.option,"click",this.handlerClick.bind(this));
    }
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target  || e.srcElement;
        if(target.nodeName !== "P")  return false;
        //获取下标
        this.setHardLevel(target);
        //清空难度菜单
        this.clearAll();
        //logo和小飞机出现
        this.showAll();
        //动画
        this.animate();
        setTimeout(()=>{
            this.clearAll();
            this.gameStart();
        },3000)
    }
    setHardLevel(target){
           this.hardLevel =Array.from(target.parentNode.children).indexOf(target);
           //console.log(this.hardLevel);
    }
    clearAll(){
        this.option? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove(): "";
        this.plane_loading ? this.plane_loading.remove():"";
    }
    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading= Core.createEle("plane-loading");
    }
    animate(){
        //背景移动
        let positionY = 0;
        let speed = 10;
        switch(this.hardLevel){
            case 0 :speed = 20 ; break;
            case 1 :speed = 8 ;break;
            case 2 :speed = 5 ;break;
            case 3 :speed = 20; break;
        }
        this.bg_moving= setInterval(() => {
            positionY += speed;
            
            this.main.style.backgroundPositionY=positionY + "px";
        },50)

        //小飞机移动
        let index = 0;
        this.loading = setInterval(()=>{
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`
        },800)
    }
    gameStart(){
        console.log("let's start");
    }



     static createEle(className){
         let  ele = document.createElement("div");
         ele.className = className;
         document.body.appendChild(ele);
         return ele;
     }

 }


 //功能调用
 new Core();