/* 分析
1.核心部分：难度选择，开机动画，计分，暂停。。。。
2.飞机：跟随移动
3，敌机：分类：小中大
4.子弹：飞行移动和敌机的交互（击落)
*/


let { $ , on } = Utils;
//核心：logo入场，飞机放屁~~~，背景移动
class Core{
    constructor(){
        //选择核心元素进行调用
        this.option() = $(".options");
        this.main = $(".main");
        
        //初始化功能
        this.init();
        //背景图。用在bgmoving

    }
    init(){
        //绑定事件
       on(this.option,"click",this.handlerClick.bind(this));
    }
    handlerClick(evt){
        //处理耦合关系,原理来自于委托
        //点击是应该获取什么??   不能白点击
        //获取难度等级
        //简单委托
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "p") return false;
        //记录当前元素下标 //没有for循环所以不适合用闭包
        //进行封装 this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
        this.setHardLevel(target);
       //测试功能 console.log(this.sethardLevel(target));
        
       //在logo出现前清除当前页面:清场：面向对象的思想：目的性强
       this.clearAll();

        /*
       //显示logo
       this.showLogo();
       //显示飞机动画
       this.showPlaneAnimate();
        */

        //将上述进行统一，showALL    显示logo以及加载飞机
        this.showAll();

        //显示动画
        this.animate();
        //欢迎界面出现三秒
        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        },3000)
        //欢迎界面过后，进行清空现存界面:图标   注意！！！背景图片不需要清空动画       在函数编写，对函数进行复用
        //清空后进行新的页面加载
    }

    clearAll(){
        this.option? this.option.remove(): "";
        clearInterval(this.loading);
        this.logo? this.logo.remove():"";
        this.plane_loading? this.plane_loading.remove():"";

    }

    setHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
       }
       
/* 

       showLogo(){
            let ele = document.createElement("div");
            ele.className = "logo";
            document.body.appendChild(ele);

       }
       showPlaneAnimate(){
           let ele = document.createElement("div");
           ele.className = "plane-loading";
            document.body.appendChild(ele);
       }

 */
 
       //进行封装
    showAll(){
           
        /* Core.creatEle("logo");
        Core.creatEle("plane-loading")  */
        //this一下进行保存，好找 
        this.logo = Core.creatEle("logo");
        this.plane_loading = Core.creatEle("plane-loading")

    }
    
    animate(){
           //定时器记得关掉:加上标记
           let index = 0;
           this.loading = setInterval(() => {
               //this指向实例
               this.plane_loading.style.backgroundImage = 'url(./images/loading${++index%3+1}.png)';
           },800)

           //初始化背景图的位置
           let positionY = 0;
           //设置速度
           let speed = 5;
           switch(this.hardLevel){
               case 0: speed = 20; break;
               case 1: speed = 10; break;
               case 2: speed =  5; break;
               case 3: speed = 20; break;
           }
          
           this.bg_moving = setInterval(()=>{
                //移动效果的实现
                positionY += speed;
                this.main.style.backgroundPositionY = positionY + "px";
                
           },50)
    }
    
    //游戏开始
    gameStart(){
          plane.init().fire();
          Enemy,enemyCreater();
    }


    static creatEle(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    //功能调用
    static hardLevel;
}


class Plane{
    constructor(){ 

    }
    init(){
        this.ele  = this.creatPlane();
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
        //创建元素--飞机，放入页面---飞机入场
        on(document,"mousemove",this.planeMove.bind(this));
        //on????
        //计算初始位置    飞机位置歪了，减去自身宽度：用offsetWidth
        


    }
    creatPlane(){
        //创建元素
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth/2 - ele.offsetWidth + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele; 
    }

   
    planeMove(evt){
        let e = evt || window.event;
        //获取鼠标当前位置
        
        //边界检测
        let {x,y} = this.boundary(e.clientX-this.eleSize.width  / 2,e.clientY-this.eleSize.height / 2);   
        Plane.x = x;
        Plane.y = y; 
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
        
    }
    //边界检测
    boundary(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        x = x<minX ? minX : x;
        x = x>maxX ? maxX : x;

       y = y<0 ? 0 : y;
        return {
            x,
            y
        }
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
}


/* 
//单定时器  子弹  原始版本
class Bullet{
    constructor(){
        this.init();
    }
    init(){
        this.creatEle();
        this.eleMove();
    }
    creatEle(){

    }
    eleMove(){
        setInterval(() => {

        },50)
    }//定时器会开的太多，对性能有损耗
}
 */



 
class Bullet{
    constructor(){
        this.speed = 20;
        //if确保单一定时器，统一子弹列表
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(() => {
                this.bulletMove();
            },50)
        }

        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
         this.init();
    }
    init(){
        let ele = this.creatBullet();

        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : ele.offsetWidth,
                height: ele.offsetHeight
            }
        }
    }
    creatBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);

        //获取位置
        let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;

        //子弹列表
        Bullet.bullet_list.push({
              ele ,
              left,
              top , 
              die : this.bulletDie.bind(this)
        })

        return ele; 
    }
    bulletMove(){

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


//敌机入场   倒着的子弹
class Enemy{
    constructor(enemy_type) {
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
        //敌机四大不同
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
        
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();
}


    init(){
             this.createEnemy();
    }
    
    
    creatEnemy(){
        let ele = document.createElement("div");
        le.className = this.enemy_data.className;
        document.body.appendChild(ele);

        //敌机列表
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
        let index = Enemy.      enemy_list.indexOf(enemy);
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
let plane = new Plane();