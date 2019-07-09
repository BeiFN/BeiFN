/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。
 *  */ 

 /**
  * 飞机大战  planewar
  */

let { $ , on } = Utils;

//   核心类
class Core{
    constructor(){
        this.option        = $(".options");
        this.main          = $(".main");
        // this.handlerLevel  = 0;                  //默认难度为 0
        // 添加核心事件
        this.init();
    }
    init(){
        on(this.option,"click",this.handlerClick.bind(this));
    }
    // 添加耦合关系
    handlerClick(evt){
        let e = evt || event;
        let target = e.target || e.srcElement;
        // 判断用户是否点击的模式
        if(target.nodeName !== "P" )return false;
        // console.log(target)
        // 获取用户点击的下标    
        this.getLevel(target);
        // 清除界面
        this.clearAll();
        // 开场动画
        this.showAll();
        // 飞机动画
        // this.animation();
        // 背景移动
        this.bgMove();
        // 过3秒自动开启游戏
        setTimeout(()=>{
            this.clearLogo();
            this.startGame();
        },1000);
        // console.log(this.getLevel)
    }
    // 获取用户点击的下标
    getLevel(target){
        // 转换为真数组，判断出现的位置
        Core.handlerLevel = Array.from(target.parentNode.children).indexOf(target); 
        // console.log(this.handlerLevel)
    }
    // 清除界面
    clearAll(){
        this.option.remove();
    }
    // 开场动画
    showAll(){
        // 开场logo
        this.logo = Core.createEle("logo");
        // 开场飞机
        this.plane_loading = Core.createEle("plane-loading")
    }
    // 飞机动画
    // animation(){
        // console.log("飞机动画");
        // let index = 0;
        // 定时器，每隔0.6s运行一次，改变一次背景图片
        // this.loading = setInterval(()=>{
        //     this.plane_loading.style.backgroundImage = `url(images/loading${ ++index % 3 + 1 }.png)`;
        // },600);
    // }
    // 背景移动
    bgMove(){
        let speed = 10;         //初始速度
        let top   = 0;          //距离顶部初始值   
        
        // 根据等级判断背景移动速度
        switch(Core.handlerLevel){
            case 0: speed = 40; break;
            case 1: speed = 30; break;
            case 2: speed = 20; break;
            case 3: speed = 10; break;
        }  
        this.bg_run = setInterval(()=>{
            top  += speed;
            this.main.style.backgroundPositionY =  top + "px";
        },100);
    }
    // 清除定时器和LOGO
    clearLogo(){
        this.logo.remove();
        // clearInterval(this.loading);
        // this.plane_loading.remove();
    }
    // 开启游戏
    startGame(){
        // console.log("go game");
        new Plane();                //调用飞机类 
        Enemy.enemyCreater();       //敌机出现
    }
    // 静态方法
    static handlerLevel;
    // 静态方法 --> 创建一个有className的DIV
    static createEle(className){
        let ele = document.createElement("div");
            ele.className = className;
            document.body.appendChild(ele);
            return ele;
    }
}
// 飞机
class Plane{
    constructor(){
       this.init();
    }
    init(){
        // 创建一个me飞机
        this.ele  = this.createPlane();
        // 获取飞机的宽和offsetLeft值
        this.eleSize = {
            left :this.ele.offsetLeft,
            width:this.ele.offsetWidth,
            height:this.ele.offsetHeight,
        }
        this.main = $(".main");
        this.mainSize = {
            left :this.main.offsetLeft,
            width:this.main.offsetWidth,
        };
        Plane.planeSize = {
            width :this.ele.offsetWidth,
        }
        // console.log(this.mainSize.left,this.mainSize.width)
        // 添加一个事件
        on(document,"mousemove",this.handlerMove.bind(this));
    }
    // 处理耦合关系
    handlerMove(){
        // 移动飞机
        this.planeMove();
        // 发射子弹
        this.biu();
    }
    // 移动飞机
    planeMove(evt){
        let e = evt || event;
        // console.log(x,y,this.ele)
        // this.ele.style.left = x - this.ele.offsetWidth/2  + "px";
        // this.ele.style.top  = y - this.ele.offsetHeight/2 + "px";
        let {x,y} = this.border( e.clientX - this.eleSize.width/2 , e.clientY - this.eleSize.height/2);
        // 储存planeX / Y 获取飞机的x，y
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y  + "px";
        // console.log(x,y,e.clientX - this.eleSize.width/2,e.clientY - this.eleSize.height/2)
    }
    // 边界检测
    border(x,y){
        let min = this.mainSize.left;        //最小值
        let max = this.mainSize.left + this.mainSize.width - this.eleSize.width;  //最大值
        x = x < min? min : x;
        x = x > max? max : x;     
        y = y < 0 ?  0 : y;
        // console.log(x,y)
        return {
            x,
            y
        }
    }
    // 创建一个me飞机
    createPlane(){
        // console.log("创建飞机");
        // 获取当前浏览器的宽度
        let maxWidth = document.documentElement.clientWidth;
        // console.log(maxWidth);
        // 创建一个飞机ele_plane
        let ele_plane = document.createElement("div");
            ele_plane.className = "plane";
            ele_plane.style.cursor = "none";
            document.body.appendChild(ele_plane);
            // 设定飞机的起始位置
            ele_plane.style.left = maxWidth /2 - ele_plane.offsetWidth /2 + "px";
            Plane.x = ele_plane.offsetLeft;
            Plane.y = ele_plane.offsetTop;
            return ele_plane;
    }
    // 发射子弹
    biu(){
        let rate = 100;
        // console.log(Core.handlerLevel);
        // 判断模式
        switch(Core.handlerLevel){
            case 0:rate = 400;break;
            case 1:rate = 300;break;
            case 2:rate = 200;break;
            case 3:rate = 100;break;
        }
        setInterval(()=>{
            // 调用子弹
            new Bullet();
        },rate);
    }
    // 为了后面的可以获取到飞机的运动x，y
    static x;
    static y;
    static planeSize;
}

// 创建子弹
class Bullet{
    constructor(){
        // 初始速度 10
        this.speed = 20;
        // 确保只创建一个子弹的定时器
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(()=>{
                // 让子弹移动
                this.bulletMove();
            },80);
        }
        // 确保只创建一个储存子弹的数组
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        // console.log("biu");
        let ele = this.createBullet();
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width:ele.offsetWidth,
                height:ele.offsetHeight,
            }
        }
    }
    // 创建子弹
    createBullet(){
        let ele = document.createElement("div");
            ele.className = "bullet";
            document.body.appendChild(ele);
            //设置子弹的方向
            // ele.style.left = Plane.PlaneX + "px";
            // console.log(Plane.planeSize.width)
            let left = Plane.x + Plane.planeSize.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
            let top  = Plane.y;
            // 把子弹添加到数组中
            Bullet.bullet_list.push({
                ele,
                left,
                top,
                die : this.bulletDie.bind(this),
            });
            // ele.style.left = left + "px";
            // ele.style.top  = top  + "px";
            return ele;
    }
    // 子弹移动
    bulletMove(){
        // 循环遍历每一个创建好的子弹数组，bullet_list
        for(let i in Bullet.bullet_list){
            // 每一个子弹bullet
            let bullet = Bullet.bullet_list[i];
            if(bullet.top <= -20){
                // 子弹死亡
                this.bulletDie(bullet);
                continue;
            };
            // console.log(bullet.top)
                bullet.top -= this.speed;
                // console.log(bullet.left,bullet.top)
                bullet.ele.style.left = bullet.left + "px";
                bullet.ele.style.top  = bullet.top  + "px";
        }
    }
    // 子弹死亡
    bulletDie(bullet){
        // 获取死亡的子弹的下标
        let index = Bullet.bullet_list.indexOf(bullet);
        // 将死亡的子弹移出
        Bullet.bullet_list.splice(index,1);
        bullet.ele.className += " die";
            // 等待动画完成;
            setTimeout( ()=>{
                  bullet.ele.remove();
                  // 清除引用;
                  bullet = false;
            },500)    
    }
    // 静态变量，定时器
    static bullet_timer;
    // 静态变量，子弹的数组
    static bullet_list;
    // 静态变量，子弹的长度，宽度
    static bullet_size;
}
// 敌机;
 class Enemy{
       constructor( enemy_type ){
            this.main = $(".main");
            this.mainSize = {
                  width  : this.main.offsetWidth,
                  height : this.main.offsetHeight,
                  left   : this.main.offsetLeft
            }
            Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( ()=>{
                  this.enemyMove();
                  //碰撞检测;
                  this.collisionDetection()
            },50);

            Enemy.enemy_list ? "" : Enemy.enemy_list = [];
            // 1. className     不同;
            // 2. speed         不同;
            // 3. hp            不同;
            // 4. die className 不同;
            this.enemies = {
                  "small" : {
                        className : "enemy-small",
                        speed     : 8,
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
                        hp        : 30,
                        dieClassName : "enemy-large-die"
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
                  left : Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth ),
                  top : 0 ,
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
            Enemy.enemy_list.splice(index , 1);
            enemy.ele.className += " die";
            setTimeout(()=>{
                  enemy.ele.remove();
            },1000)
       }
       collisionDetection(){
            // 碰撞检测;
            let bullets = Bullet.bullet_list;
            let enemys = Enemy.enemy_list;

            // 双层循环比对;
            // console.log(bullets,enemys);
            for(let i = 0 , bullet ; bullet = bullets[i] ; i++ ){
                  for(let k = 0 , enemy ; enemy = enemys[k] ; k ++){
                        if(this.collisionLeft(enemy,bullet)){
                              if(this.collisionTop(enemy,bullet)){
                                    bullet.die(bullet);
                                    enemy.hp --
                                    if(enemy.hp <= 0){
                                          enemy.die(enemy);
                                    }
                              }
                        };
                  }
            }
       }
       collisionLeft(enemy,bullet){
            return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width
       }
       collisionTop(enemy,bullet){
           return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
       }
       static enemy_timer ;
       static enemy_list ;
       static enemy_size  ;
       static randomLeft(min , max){
            return  min + Math.round(Math.random() * (max - min));
       }
       static enemyCreater(){
             // 1. 小敌机创建;
             let count = 0;
             setInterval( ()=>{
                  count ++ ;
                  Math.random() > 0.5 ? new Enemy() : "";
                  count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
                  count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
             } , 1000)
       }
 }
new Core();  