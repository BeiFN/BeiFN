/*
*核心部分，出场界面 ， 难度选择，logo部分，加载部分；
*飞机
*子弹
*敌机
*交互部分
*/

let{ $ , on} = Utils;


class Core{

      constructor()
      {
            this.option = $(".options")
    
            this.main = $(".main")
            this.init();
      }
      init()
      {
            //绑定事件
            on(this.option,"click", this.handlerClick.bind(this))
      }
      handlerClick(evt)
      {

            let e = evt || event;
            let target = e.target || e.srcElement;
            if(target.nodeName != "P")return false;
            //获取下表、
            this.sethardLevel(target);
            //清场
            this.clearAll();
            //显示LOGO，显示加载界面
            this.showAll();
            //小飞机动画
            //背景动画
             this.animate();
             //清场，并开始游戏
             setTimeout( ()=> {
                   this.clearAll();
                   this.gameStart();
             },1000)


      }
      //记录当前元素下标
      sethardLevel(target)
      {
            //简单事件委托
            Core.hardLevel = Array.from(target.parentNode.children).indexOf(target)
            //return this.hardLevel;
      }

      clearAll()
      {
            // console.log(this.option)
            this.option ? this.option.remove() : "";
            clearInterval(this.loading);
            this.plane_loading ? this.plane_loading.remove() : "";
            this.logo ? this.logo.remove() : "";

          
      }
      showAll()
      {
            this.logo = Core.createEle("logo"),
            this.plane_loading = Core.createEle("plane-loading")
            

      }
      animate()
      {
            let index = 0;
            let positionY = 0;
            let speed = 5;
            this.loding = setInterval( () => {
            this.plane_loading.style.backgroundImage = `url(./images/loading${index++%3+1}.png)`
            },80)


            switch(this.hardLevel)
            {
                  case 0 : speed = 20 ; break;
                  case 1 : speed = 8  ; break;
                  case 2 : speed = 5  ; break;
                  case 3 : speed = 20 ; break;
            } 
            this.bg_moving = setInterval(
                  ()=>{
                        positionY += speed ;
                        this.main.style.backgroundPositionY = positionY + "px";
                   },50)
      }
      gameStart()
      {
            plane.init().fire();
            Enemy.enemyCreater();
      }
      static createEle(className)
      {
            let ele = document.createElement("div")
            ele.className = className;
            document.body.appendChild(ele)
            return ele
      }
      static hardLevel;
}
//创建飞机
class Plane
      {
            constructor()
            {
                  
            }
            init()
            {     
                  this.ele = this.createPlane()
                 
                  this.main = $(".main")
                  this.mainSize = {
                        left : this.main.offsetLeft,
                        width : this.main .offsetWidth
                  }
                  Plane.plane_size ={
                        width:this.ele.offsetWidth,
                        //height: this.ele.offsetHeight

                  }
                  this.eleSize = {
                        width  : this.ele.offsetWidth,
                        height : this.ele.offsetHeight
                  }
                  on(document,"mousemove", this.planeMove.bind(this));

                  //返回实例对象操作实际上是用来连缀的
                  return this
            }
            planeMove(evt)
            {
                  let e= evt || event;
                  let {x,y} = this.boundry(
                        e.clientX - this.eleSize.width/2,
                        e.clientY - this.eleSize.height/2
                  )
                  Plane.x = x;
                  Plane.y = y ;
                  this.ele.style.left = x + "px";
                  this.ele.style.top = y + "px";

            }
            boundry(x,y)
            {     let minX =  this.mainSize.left;
                  let maxX =  this.mainSize.left + this.mainSize.width - this.eleSize.width ;
                  x = x < minX ? minX : x;
                  x = x > maxX ? maxX : x;
      
                  y = y < 0 ? 0 : y;
                  return {
                        x ,
                        y 
                  }
            }
            createPlane()
            {
                  let ele = document.createElement("div");
                  let Cwidth = document.documentElement.clientWidth;
                  ele.className= "plane";
                  ele.style.cursor = "none"
                  document.body.appendChild(ele);
                  ele.style.left = Cwidth/2-ele.offsetWidth/2+"px"//页面渲染之后才有宽度
                  return ele

            }
            fire()
            {
                  let frequency = 100;
                  switch(Core.hardLevel)
                  {
                  case 0 : frequency = 500;
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
class Bullet{
      constructor(){
            
            this.speed= 20;
            if(Bullet.bullet_timer == undefined)
                  {
                        Bullet.bullet_timer = setInterval( ()=>{
                              this.bulletMove();
                        },50)
                  }
            if(Bullet.bullet_list == undefined)
                  {
                        Bullet.bullet_list = [];
                  }
             this.init();
      }
      init()
      {
            this.ele = this.createBullet();
            if(Bullet.bullet_size === undefined)
            {
                  Bullet.bullet_size = 
                  {
                        width:this.ele.offsetWidth,
                        height:this.ele.offsetHeight
                  }
            }
            
      }
      createBullet()
      {
            let ele =document.createElement("div")
            ele.className = "bullet";
            document.body.appendChild(ele)

            let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
            let top = Plane.y;
            Bullet.bullet_list.push({
                  ele,
                  left,
                  top
                 
            })
            return ele;
       
      }
      bulletMove()
      {
            for(let attr in Bullet.bullet_list)
                  {
                        let bullet = Bullet.bullet_list[attr]
                        if(bullet.top <= 30)
                              {
                                    this.bulletDie(bullet)
                                    continue;
                              }
                        bullet.top -= this.speed ;
                        bullet.ele.style.top = bullet.top +"px"
                        bullet.ele.style.left = bullet.left  +"px"
                  }
      }
      bulletDie(bullet)
      {
            let index = Bullet.bullet_list.indexOf(bullet)
            Bullet.bullet_list.splice(index,1);
            bullet.ele.className += " die";

            setTimeout(()=>{
                  bullet.ele.remove();
                  bullet = false;
            },500)
      }
      static bullet_timer;
      static bullet_list;
      static bullet_size;
      
}
//敌机
class Enemy{
      constructor(enemy_type)
      {
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
            Enemy.enemy_list ? "" : Enemy.enemy_list =[];

            this.enemies= {
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
            enemy_type= enemy_type? enemy_type : "small"
            this.enemy_data = this.enemies[enemy_type]
            this.init();
      }
      init()
      {
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
      static enemy_timer;
      static enemy_list;
      static enemy_size;
      static randomLeft(min,max)
      {
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
                 new Enemy("large")
           } , 1000)
      }
}


// new Enemy();
//功能调用

new Core()
let plane = new Plane();

