/** 1.核心
 * 选择难度 => 清场 => 显示logo/loading => 游戏开始
 */
let {$, on} = Utils;

class Core{
    constructor(){
         //获取元素
         //main
         this.main = $(".main");
         //option
         this.options = $(".option");
         
        this.loading_img = ["https://i.loli.net/2019/07/06/5d209bcb7910182436.png", 
                            "https://i.loli.net/2019/07/06/5d20a08de8ee446301.png", 
                            "https://i.loli.net/2019/07/06/5d20a0aa7327941243.png"];
        
        //初始化
        this.init();
    }
    init(){
        on(this.options, "click", this.handlerClick.bind(this));
        
    }
    handlerClick(){
        //清场
        this.options.remove();
        //显示
        this.showAll();
        //loading 动画
        this.loading_animate();
        //背景移动
        this.bg_animate();
        //游戏开始
        this.gameStart();
        //获取难度下标
        this.setOptionIndex();
        // console.log(Core.optionIndex);
    }
    showAll(){
        //显示logo
        this.logo = this.showEle("logo");
        //显示loading
        this.loading = this.showEle("loading");
    }
    showEle(selector){
        this.ele = document.createElement("div");
        this.ele.className = selector;
        this.main.appendChild(this.ele);

        return this.ele;
    }
    loading_animate(){
        let i = 0;
        this.loading_timer = setInterval(()=>{
            this.loading.style.background = `url(${this.loading_img[++i%3]})`;
        }, 800)
    }
    bg_animate(){
        let speed = -10;
        let positionY = 0;
        this.bg_timer = setInterval(()=>{
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px"; 
        }, 50)
    }
    gameStart(){
        setTimeout(()=>{
            this.logo.remove();
            this.loading.remove();
            //飞机初始化=>发射子弹
            plane.init().fire();
            Enemy.enemyCreater();
        },3000)
        
    }
    setOptionIndex(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement; 
        return Core.optionIndex = Array.from(this.options.children).indexOf(target);
    }
    //因为在其他class中也会用到optionsIndex， 所以将其设置为静态变量
    static optionIndex;
 }

class Plane{
    constructor(){
    }
    init(){
        //创造一个飞机
        this.ele = this.createPlane();
        //main的size
        this.main = $(".main");
        this.main_size = {
            left : this.main.offsetLeft,
            width : this.main.offsetWidth
        }
        console.log(this.main_size.left);
        //ele的size
        Plane.plane_size = {
            width : this.ele.offsetWidth,
            height:this.ele.offsetHeight
        }
        //飞机随鼠标移动
        on(document, "mousemove", this.move.bind(this));
        return this;
    }

    createPlane(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth/2 - ele.offsetWidth / 2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
   }
    move(evt){
        let e = evt || window.event;
        let cX = e.clientX;
        let cY = e.clientY;
        //边界
        let {x, y} = this.boundary(cX  - Plane.plane_size.width/2, cY  - Plane.plane_size.height/2);
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x +"px"; 
        this.ele.style.top = y +"px";
    }
    //边界
    boundary(x, y){
        let minX;
        //最小为main的页面坐标
        minX = this.main_size.left;
        let maxX;
        //最大为main的页面坐标 + main的宽 - 飞机的宽
        maxX = this.main_size.left + this.main_size.width -Plane.plane_size.width;
        x = x<minX ? minX : x;
        x = x>maxX ? maxX : x;
        y = y<0 ? 0 : y;
        return {x, y};
    }
    //放子弹
    fire(){
        setInterval(()=>{
            new Bullet();
        },300)
    }
    //将飞机的坐标通过两个静态变量保存，运用于其他的class中
    static x;
    static y;
    static plane_size;
}

//子弹
class Bullet{
    constructor(){
        //单例模式：只创建一个子弹列表，将所有的子弹都存放在子弹列表中
        if(Bullet.bulletList === undefined){
            Bullet.bulletList = [];
        }
        //只创建一个定时器来管理子弹的运动
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(()=>{
                this.bulletMove();
            }, 50)
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
        ele.style.top = left +"px";
        ele.style.left = top + "px";
        Bullet.bulletList.push({ele, top , left, die : this.bulletDie.bind(this)});
        return ele;
    }
    bulletMove(){
        let speed = -10;
        for(let attr in Bullet.bulletList){
            let bullet = Bullet.bulletList[attr];
            if(bullet.top <= -20){
                this.bulletDie(bullet);
                continue ;
            }
            bullet.top += speed;
            bullet.ele.style.top = bullet.top +"px"; 
            bullet.ele.style.left = bullet.left+ "px";
        }
    }
    bulletDie(bullet){
        let index = Bullet.bulletList.indexOf(bullet);
        Bullet.bulletList.splice(index,1);

        bullet.ele.className += " die";

        // 等待动画完成;
        setTimeout( ()=>{
              bullet.ele.remove();
              bullet = false;// 清除引用;
        },500)    
  }
    static bulletList;
    static bullet_timer;
    static bullet_size;
}

//敌机
class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
            this.mainSize = {
                  width  : this.main.offsetWidth,
                  height : this.main.offsetHeight,
                  left   : this.main.offsetLeft
            }

        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( ()=>{
            this.enemyMove();
            // //碰撞检测;
            this.collisionDetection()
        },50);
        //存放敌机的列表=>唯一
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        //敌机类型
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
        //如果没有给类型，默认为小敌机
        enemy_type = enemy_type ? enemy_type : "small";
        //获取对应类型敌机的信息
        this.enemy_data = this.enemies[enemy_type];
        //初始化
        this.init();
    }
    init(){
        //创建敌机
        this.createEnemy();
    }
    createEnemy(){
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        //将创建的敌机放入列表中
        Enemy.enemy_list.push({
                ele,
                //血量
                hp : this.enemy_data.hp,
                //出现的位置坐标 => 随机出现在游戏界面的上方
                left : Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth ),
                top : 0 ,
                //速度
                speed : this.enemy_data.speed,
                width : ele.offsetWidth,
                height : ele.offsetHeight,
                die : this.enemyDie.bind(this)
        })
    }
    enemyMove(){
        //循环遍历敌机列表中所有敌机
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            //top值加上速度
            enemy.top += enemy.speed;
            //敌机向下运动，运动到游戏界面下方时，销毁
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
    collisionLeft(enemy,bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width
    }
    collisionTop(enemy,bullet){
       return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }

    collisionDetection(){
        // 碰撞检测;
        let bullets = Bullet.bulletList;
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

    static randomLeft(min , max){
        return  min + Math.round(Math.random() * (max - min));
    }
    static enemy_timer ;
    static enemy_list ;
    static enemy_size  ;
    
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
 let plane = new Plane();