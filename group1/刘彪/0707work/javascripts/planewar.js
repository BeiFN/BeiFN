/**
 * 1.核心部分:难度选择,开场动画,背景移动
 * 2.飞机   :跟随移动
 * 3.子弹   :飞行移动,和敌机交互
 * 4.敌机   : 分类,中小大.
 */

//核心部分
//1.logo入场 
//2.飞机动画
//3.背景动画
 let { $ , on } = Utils;

 class Core{
     constructor(){
         //难度选项
        this.option = $(".options");
        this.main   = $(".main");
        this.loading_pics=[
            "https://upload-images.jianshu.io/upload_images/2845301-4483375ae7043942.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/2845301-c53b48a9025ef930.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/2845301-ecb7640ccd9e7b77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        ]
        //初始化
        this.init();
     }
     init(){
         //绑定事件
        on(this.option,"click" ,this.handlerClick.bind(this));
     }
     //事件处理函数
     handlerClick(evt){
         let e = evt || window.event;
         let target = e.target || e.srcElement;

         this.getHardLevel(target);
         //清空
         this.clearAll();
         //显示logo和加载飞机
         this.showAll();
         //飞机动画
         this.loadAnim();

         setTimeout(()=>{
            this.clearAll();
            this.gameStart();
         },2000)
     }
     clearAll(){
         this.option.remove();
         clearInterval(this.loading);
         this.logo ? this.logo.remove() : "";
         this.plane_loading ? this.plane_loading.remove() : "";

     }
     getHardLevel(target){
         Core.hard_level = Array.from(target.parentNode.children).indexOf(target);
     }
    showAll(){
       this.logo =  Core.createEle("logo");
       this.plane_loading =  Core.createEle("plane-loading");
     }
     loadAnim(){
         let index = 0;
         let positionY = 0;
         let speed = 5;
         switch(Core.hard_level){
             case 0: speed = 20;break;
             case 1: speed = 8 ;break;
             case 2: speed = 5 ;break;
             case 3: speed = 20;break;
         }
         this.loading = setInterval(()=>{
            this.plane_loading.style.backgroundImage = `url(${this.loading_pics[index++ % 3]})`;
            
         },500)
         this.bg_move = setInterval(()=>{
             positionY += speed;
             this.main.style.backgroundPositionY = positionY +"px";
         },50)
     }

     gameStart(){
       plane.init().fire();
       Enemy.enemyCreater();
     }
     static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
     }
     static hard_level;

 }

 //飞机
 class Plane{
        constructor(){

        }
        init(){
            this.ele = this.createPlane();
            this.main = $(".main");
            this.main_size= {
                left  : this.main.offsetLeft,
                width : this.main.offsetWidth
            }
            Plane.plane_size = {
                width:this.ele.offsetWidth
            }
            this.ele_size = {
                width : this.ele.offsetWidth,
                height: this.ele.offsetHeight,
            }
            on(document, "mousemove" , this.planeMove.bind(this));

            return this;
        }
        planeMove(evt){
            let e = evt || window.event;
            let init_position = {
                left :  e.clientX - this.ele_size.width/2,
                top :  e.clientY - this.ele_size.height/2
            }
            let {x , y} = this.boundary(init_position.left,init_position.top);
            Plane.x = x;
            Plane.y = y;
            this.ele.style.left =x + "px";
            this.ele.style.top = y +"px";
        }
        boundary(x,y){
            let minX = this.main_size.left;
            let maxX = this.main_size.left + this.main_size.width-this.ele_size.width;

            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;
            
            y = y < 0 ? 0 : y;
            return {
                x,
                y
            }
        }
        createPlane(){
            let plane = Core.createEle("plane");
            let cWidth = document.documentElement.clientWidth;
            plane.style.left = cWidth/2 - plane.offsetWidth/2 + "px";
            Plane.x = plane.offsetLeft;
            Plane.y = plane.offsetTop;
            return plane;
        }
        fire(){
            let frequency = 100;
            switch(Core.hard_level){
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

 //单计时器子弹
class Bullet{
    constructor(){
        this.speed = 10;
      
         //只创建一个子弹列表
         if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        
        let ele = this.createBullet();
           //确保无论多少次实例,只创建一个定时器;
           if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(() => {
                this.bulletMove();
            }, 50);
        }
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : ele.offsetWidth,
                height: ele.offsetHeight
            }
        }
       
    }
    createBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
       
        let left = Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        

        let top = Plane.y;
        //每创建一个子弹就把信息放进子弹数组
        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die:this.bulletDie.bind(this)
        })

        return ele;
    }
    bulletMove(){
        for(let attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= -20){
                this.bulletDie(bullet);
                continue;
            }
            bullet.ele.setAttribute("data" , "move");
            bullet.top -= this.speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
    
        }
        
    }
    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index,1);
        bullet.ele.className += " die";

        //等待动画完成
        setTimeout(()=>{
            bullet.ele.remove();
            bullet = false;
        },500)
    }
    static bullet_timer;
    static bullet_list;
    static bullet_size;
}
class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
        this.main_size = {
            width: this.main.offsetWidth,
            height:this.main.offsetHeight,
            left :this.main.offsetLeft,
        }
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(()=>{

            this.enemyMove();
            //碰撞检测
            this.collisionDetection();
        },100)
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        //1.className 
        //2.speed
        // 3.hp
        // 4.die className

        this.enemies = {
            "small" :{
                className :"enemy-small",
                speed : 5,
                hp:1,
                dieClassName:"enemy-small-die"
            },
            "middle":{
                className :"enemy-middle",
                speed : 3,
                hp:5,
                dieClassName:"enemy-middle-die"
            },
            "large" :{
                className : "enemy-large",
                speed:1,
                hp:50,
                dieClassName:"enemy-large-die"
            }

        }
        enemy_type = enemy_type ? enemy_type :"small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();
    }
    init(){
        this.createEnemy();
    }
    createEnemy(){
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push(
            {
                ele,
                hp:this.enemy_data.hp,
                left:Enemy.randomLeft(this.main_size.left,this.main_size.width+this.main_size.left-ele.offsetWidth),
                top:0,
                speed : this.enemy_data.speed,
                width:ele.offsetWidth,
                height:ele.offsetHeight,
                die:this.enemyDie.bind(this)
            }
        )
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if(enemy.top >= this.main_size.height-50){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top +"px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index, 1);
        enemy.ele.className +=" die";
        setTimeout(()=>{
            enemy.ele.remove();
        },1000)
    }
   collisionDetection(){
       let bullets = Bullet.bullet_list;
       let enemys = Enemy.enemy_list;

       //双层循环比对;
       for(let i= 0,bullet; bullet = bullets[i];i++){
           for(let k= 0,enemy;enemy = enemys[k];k++){
               if(this.collisionLeft(enemy,bullet)){
                   if(this.collisionTop(enemy,bullet)){
                       bullet.die(bullet);
                       enemy.hp--;
                       if(enemy.hp <= 0){
                           enemy.die(enemy);
                       }
                   }
               };
           }
       }
   }

   collisionLeft(enemy,bullet){
       return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
   }
   collisionTop(enemy,bullet){
       return bullet.top > enemy.top -Bullet.bullet_size.height&&bullet.top < enemy.top + enemy.height;
   }
   static enemy_timer;
   static enemy_list;
   static enemy_size;
   static randomLeft(min, max){
       return min+Math.round(Math.random()*(max-min));
   }

static enemyCreater(){
    //敌机创建
    let count = 0;
    setInterval(() => {
        count++;
        Math.random() > 0.5? new Enemy() : "";
        count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle"):""):"";
        count % 10=== 0 ? (Math.random()< 0.9 ? new Enemy("large"):""):"";
    }, 1000);
  }
}





 //功能调用
 new Core();
let plane = new Plane();