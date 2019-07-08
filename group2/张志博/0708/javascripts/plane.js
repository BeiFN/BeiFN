/**
 * 1.核心部分 => 难度选择，开场动画，计分，暂停。。
 * 2.飞机    => 跟随移动
 * 3.子弹   => 飞行移动
 * 4.敌机   => 分类，小中大
 * */ 

 let { $ , on } = Utils;

 //核心代码；
    // 1.logo入场
    // 2.加载动画
    // 3.背景运动

class Core{
    constructor(){
        //核心元素；
        this.option = $(".options");
        //难度等级
        // this.hardLevel = 0;
        //初始化；
        this.init();

        //获取背景
        this.main = $(".main");

    }
    init(){
        on(this.option , "click" , this.handlerClick.bind(this));
    }
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;

        if(target.nodeName !== "P") return false;

        //获取下班；
        this.setHardLevel(target);

        //清空；
        this.clearAll();

        //显示logo
        this.showAll();

        //显示加载动画
        this.animate();

        setTimeout( () => {
            this.clearAll();
            this.gameStart();
        } , 3000)

        
    }



    setHardLevel(target){
        this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
        console.log(this.hardLevel);
    }
    clearAll(){
        // this.option.remove();
        //都要判断是否存在
        this.option ? this.option.remove() : "";
        clearInterval(this.loading);
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }

    showAll(){
        this.logo = Core.createEle("logo");
        this.plane_loading = Core.createEle("plane-loading");
    }


    animate(){
        let index = 0;


        //显示加载的第几张图片
        this.loading = setInterval( () =>{
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
        },800)
        let positionY = 0;
        let speed     = 5;
        switch (this.hardLevel) {
            case 0:
                speed = 20;                
                break;
            case 1:
                speed = 8;                
                break;
            case 2:
                speed = 5;                
                break;
            case 3:
                speed = 20;                
                break;
        }
        this.bg_moving = setInterval( ()=>{
            positionY +=speed;
            this.main.style.backgroundPositionY = positionY + "px";
        } , 50)

    }
    gameStart(){
            // alert("游戏开始");
            // console.log("游戏开始");
        plane.init();
        }
    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static createEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
    //游戏开始
    

}

class Plane{
    constructor(){

    }
    init(){
        this.ele = this.createPlane();
        this.main = $(".main");
        this.mainSize = {
            left : this.main.offsetLeft,
            width : this.main.offsetWidth
        }
        this.eleSize = {
            width : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        }

        on(document , "mousemove" , this.planeMove.bind(this));

    }
    //飞机移动
    planeMove(evt){
        let e = evt ||window.event;
        let { x , y} = this.boundary(e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top = y + "px";
    }


    //边界检测
    boundary(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        //检测左右边界
        x = x < minX ? minX : x;
        x = x > maxX ? maxX : x;
        //检测上边界
        y = y < 0 ? 0 : y;
        return {
            x,
            y
        }
    }
    //创建飞机
    createPlane(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth/2 - ele.offsetWidth/2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }
    fire(){
        let frequency = 100;
        switch (Core.hardLevel) {
            case 0:
                frequency = 500;
                break;
            case 1:
                frequency = 300;
                break;
            case 2:
                frequency = 200;
                break;
            case 3:
                frequency = 100;
                break;
        }
        setInterval( ()=>{
            new Bullet();
        },frequency)
    }
    static x;
    static y;
    static plane_size;
}

//子弹
// class Bullet{
//     constructor(){

//         this.speed = 20;

//         //无论有多少实例了，都会只创建一个定时器，创建一个统一的子弹列表；
//         //确保只创建一个子弹运动定时器；

//         if(Bullet.bullet_timer === undefined){
//             Bullet.bullet_timer = setInterval( ()=>{
//                 this.bulletMove();
//             },50)
//         }

//         if(Bullet.bullet_list === undefined){
//             Bullet.bullet_list = [];
//         }
//         this.init();
//     }
//     init(){
//         let ele = this.createBullet();
//         if(Bullet.bullet_size === undefined){
//             Bullet.bullet_size = {
//                 width : ele.offsetWidth,
//                 height : ele.offsetHeight
//             }
//         }
//     }

//     createBullet(){


//         let ele = document.createElement("div");
//         ele.className = "bullet";
//         document.body.appendChild(ele);


//         let left = Plane.x + Plane.plane_size.width /2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
//         let top = Plane.y;
//         Bullet.bullet_list.push({
//             ele,
//             left,
//             top,
//             die : this.bulletDie.bind(this)
//         })
//         return ele;
//     }
// bulletMove(){
//     for(let attr in Bullet.bullet_list){
//         let bullet = Bullet.bullet_list[attr];
//         if(bullet.top <= -20){
//             this.bulletDie(bullet);
//             continue;
//         }

//         bullet.ele.setAttribute("data","move");
//         bullet.top -= this.speed;
//         bullet.ele.style.top = bullet.top + "px";
//         bullet.ele.style.left = bullet.left + "px";


//     }
// }

// bulletDie(bullet){
//     let index = Bullet.bullet_list.indexOf(bullet);
//     Bullet.bullet_list.splice(index,1);

//     bullet.ele.className += " die";

//     //等待动画完成；
//     setTimeout( ()=>{
//         bullet.ele.remove();
//         bullet  = false; //清除引用；
//     },500)
// }

//     static bullet_timer;
//     static bullet_list;
//     static bullet_size;
// }
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

          
          let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
          let top = Plane.y;

          Bullet.bullet_list.push({
                ele ,
                left,
                top , 
                die : this.bulletDie.bind(this)
          })

          return ele;
    }

    bulletMove(){
          // console.log("让所有的子弹运动");
          for(let attr in Bullet.bullet_list){
                let bullet = Bullet.bullet_list[attr];
                if(bullet.top <= -20){
                      this.bulletDie(bullet);
                      continue ;
                }
                bullet.ele.setAttribute("data","move");
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



class Enemy{
    constructor( enemy_type){
        this.main = $(".main");
        this.mainSize = {
            width : this.main.offsetWidth,
            height : this.main.offsetHeight,
            left : this.main.offsetLeft
        }

        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( ()=>{
            this.enemyMove();

            this.collisionDetection()
        },50);
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];

        //敌机种类
        // 1.className 不同：
        // 2.speed     不同；
        // 3、hp       不同；
        //4、die className 不同；
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
                dieClassName : "enemy-small-die"
            },
            "large" : {
                className : "enemy-small",
                speed     : 1,
                hp        : 20,
                dieClassName : "enemy-small-die"
            }
            
        }
        enemy_type = enemy_type ? enemy_type : "small";
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
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_data.hp,
            left : Enemy.randomLeft(this.mainSize.left,
                this.mainSize.left + this.mainSize.width - ele.offsetWidth),
                top : 0,
                speed : this.enemy_data.speed,
                width : ele.offsetWidth,
                height : ele.offsetHeight,
                die : this.enemyDie.bind(this)
        })
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if(enemy.top >= this.mainSize.height - 50){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index,1);
        enemy.ele.className += "die";
        setTimeout( ()=>{
            enemy.ele.remove();
        },1000)
    }
    collisionDetection(){
        //碰撞检测；
        let bullets = Bullet.bullet_list;
        let enemys = Enemy.enemy_list;

        //双层循环对比
        for(let i = 0 , bullet; bullet = bullets[i] ; i++){
            for(let k = 0, enemy; enemy = enemys[k]; k++){
                if(this.collisionLeft(enemy,bullet)){
                    if(this.collisionTop(enemy,bullet)){
                        bullet.die(bullet);
                        enemy.hp -- ;
                        if(enemy.hp <= 0){
                            enemy.die(enemy);
                        }
                    }
                }
            }
        }
    }

    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min , max){
        return min + Math.round(Math.random() * (max - min));
    }
    static enemyCreater(){
        //1.小敌机创建
        let count = 0;
        setInterval( ()=>{
            count ++ ;
            Math.random() > 0.5 ? new Enemy() : "";
            count % 5 === 0?(Math.random() < 0.8 ? new Enemy("middle") : "") : "";
            count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        },1000)
    }
}

new Core();
let plane = new Plane();