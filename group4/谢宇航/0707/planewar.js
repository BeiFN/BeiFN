/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。
 * 
 *  */ 

let { $ , on } = Utils;

 // 核心部分;
 // 1. logo入场 ;
 // 2. 飞机动画 ;
 // 3. 背景运动 ;

 class Core{
      constructor(){
            // 核心元素;
            this.option = $(".options");
            this.main   = $(".main");
            // 初始化功能;
            this.init();
      }
      init(){
            // 绑定事件;
            on(this.option , "click" , this.hanlderClick.bind(this));
      }
      hanlderClick(evt){
            // 处理耦合关系;
            // 记录当前元素的下标;
            // 简单委托;
            let e = evt || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName !== "P") return false;
            // 获取下标;
            this.setHardLevel(target);
            // 清场;
            this.clearAll();
            // 显示logo;
            this.showAll();
            // 显示飞机动画;  
            this.animate();
            setTimeout( () => {
                  this.clearAll();
                  this.gameStart();
            } , 1000)
      }
      clearAll(){
            this.option ? this.option.remove() :"";
            clearInterval(this.loading);
            this.logo? this.logo.remove() : "";
            this.plane_loading? this.plane_loading.remove(): "";
      }
      setHardLevel(target){
            Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
      }
      showAll(){
            this.logo = Core.createEle("logo");
            this.plane_loading = Core.createEle("plane-loading");
      }
      animate(){
            let index = 0;
            this.loading = setInterval( ()=>{
                  // console.log(this)  => 实例对象;
                  this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
            } , 800)

            let positionY = 0;
            let speed     = 5;

            switch(this.hardLevel){
                  case 0 : speed = 20;break;
                  case 1 : speed = 8;break;
                  case 2 : speed = 5;break;
                  case 3 : speed = 20;break;
            }

            this.bg_moving = setInterval( ()=>{
                  positionY += speed;
                  this.main.style.backgroundPositionY = positionY + "px";
            } , 50)
      }
      gameStart(){
            // 游戏开始了;
            // console.log("let's start");
            plane.init().fire();
      }

      static createEle(className){
            let   ele = document.createElement("div");
                  ele.className = className;
                  document.body.appendChild(ele);
                  return ele;
      }
      static hardLevel;
 }

// 功能调用;
 class Plane{
       constructor(){

       }
       init(){
            this.ele = this.createPlane();
            this.main = $(".main");
            Plane.plane_size = {
                  width:this.ele.offsetWidth
            }
            this.mainSize = {
                  left  : this.main.offsetLeft,
                  width : this.main.offsetWidth
            }
            this.eleSize = {
                  width  : this.ele.offsetWidth,
                  height : this.ele.offsetHeight
            }
            // 1. 创建元素并放入页面之中;
            on(document , "mousemove" , this.planeMove.bind(this));

            // 返回实例对象操作实际上是用于连缀的;
            return this;
       }
       planeMove(evt){  
            let e = evt || window.event;
           
            let { x , y } = this.boundary( e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
            Plane.x = x;
            Plane.y = y;
            this.ele.style.left = x + "px";
            this.ele.style.top  = y + "px";
       }
       boundary(x,y){
            let minX =  this.mainSize.left;
            let maxX =  this.mainSize.left + this.mainSize.width - this.eleSize.width ;
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;

            y = y < 0 ? 0 : y;
            return {
                  x ,
                  y 
            }
       }
       createPlane(){
            let ele = document.createElement("div");
            let cWidth = document.documentElement.clientWidth;
            ele.className = "plane";
            ele.style.cursor = "none";
            document.body.appendChild(ele);
            ele.style.left = cWidth/2 - ele.offsetWidth / 2 + "px";
            return ele;
       }

       fire(){

            let frequency = 100;

            switch(Core.hardLevel){
                  case 0 : 
                        frequency = 500;
                        break;
                  case 1 : 
                        frequency = 300;
                        break;
                  case 2 : 
                        frequency = 200;
                        break;
                  case 3 : 
                        frequency = 100;
                        break;
            }

             setInterval( ()=>{
                   new Bullet();
             } , frequency)
       }

       static x;
       static y;
       static plane_size;
 }
 
 // 单计时器子弹;
 // 原始版子弹;
 class Bullet{    
      constructor(){
            this.speed = 20;
            // 确保无论多少次实例,我也之创建一个定时器,创建一个统一的子弹列表;
            // 确保只创建一个子弹运动定时器;
            if(Bullet.bullet_timer === undefined){
                  Bullet.bullet_timer = setInterval( ()=> {
                       this.bulletMove();
                  },50)
            }
            // 确保只创建一个子弹列表;
            if(Bullet.bullet_list === undefined){
                  Bullet.bullet_list = [];
            }
            this.init();
      }
      init(){
            let ele = this.createBullet();

            if(Bullet.bullet_size === undefined){
                  Bullet.bullet_size = {
                        width  : ele.offsetWidth,
                        height : ele.offsetHeight
                  }
            }
         
      }
      createBullet(){
            let ele = document.createElement("div");
            ele.className = "bullet";
            document.body.appendChild(ele);
         
            Bullet.bullet_list.push({
                  ele ,
                  left : Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2),
                  top  : Plane.y
            })

            return ele;
      }

      bulletMove(){
            // console.log("让所有的子弹运动");
            for(let attr in Bullet.bullet_list){
                  let bullet = Bullet.bullet_list[attr];
                  if(bullet.top <= 50){
                        this.bulletDie(bullet);
                        continue ;
                  }
                  bullet.top -= this.speed ;
                  bullet.ele.style.top  =  bullet.top + "px";
                  bullet.ele.style.left =  bullet.left + "px";
            }
      }
      bulletDie(bullet){
            let index = Bullet.bullet_list.indexOf(bullet);
            Bullet.bullet_list.splice(index,1);

            bullet.ele.className += " die";

            // 等待动画完成;
            setTimeout( ()=>{
                  bullet.ele.remove();
                  bullet = false;// 清除引用;
            },500)    
      }

      static bullet_timer;
      static bullet_list;
      static bullet_size;
 }

//  new Bullet();

// 敌机;

 class Enemy{
       constructor( enemy_type ){
            Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( this.enemyMove.bind(this),50);
            
            // 1. className     不同;
            // 2. speed         不同;
            // 3. hp            不同;
            // 4. die className 不同;
            this.enemies = {
                  "small" : {
                        className : "enemy-small",
                        speed     : 10,
                        hp        : 1,
                        dieClassName : "enemy-small-die"
                  },
                  "middle" : {
                        className : "enemy-middle",
                        speed     : 5,
                        hp        : 10,
                        dieClassName : "enemy-middle-die"
                  } ,
                  "large" : {
                        className : "enemy-large",
                        speed     : 1,
                        hp        : 50,
                        dieClassName : "enemy-large-die"
                  } 
            }


            this.init();
       }
       init(){
             this.createEnemy();
       }
       createEnemy(){
            let ele = document.createElement("div");
            ele.className = ""
       }
       enemyMove(){

       }


       static enemy_timer ;
       static enemy_list ;
       static enemy_size  ;
 }

 new Core();
 let plane =  new Plane();
