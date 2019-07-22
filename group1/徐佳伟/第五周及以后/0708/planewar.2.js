//飞机大战

//几个类？
//核心事件
//飞机
//子弹交互
//敌机
//工具类

//引入工具
let { on , $ } = Utils;

//页面加载 核心部分
class Core{
      constructor(){
            //获取元素
            this.main   = $(".main");
            this.option = $(".options");
            //初始化类
            this.init();
      }
      init(){
            //给元素添加绑定事件 千万要记得固定this
            on(this.option , "click" , this.handlerClick.bind(this));
      }
      handlerClick(evt){
            //获取事件源
            let e = evt || window.event;
            let target = e.target || e.srcElement;

            //进行事件源的判断
            if(target.nodeName !== "P") return false;
            //确定都是p标签之后 获取对应下标
            Core.hard_level = this.getHardLevel(target);
            // alert(Core.hard_level);
            //获取对应难度之后清除元素
            this.clearAll();
            //创建元素
            this.createAll();
            //创建动态元素
            this.animal();
            //加载完毕，游戏开始
            setTimeout(()=>{
                  this.clearAll();
                  this.gameStart();
            },1000)
      }
      getHardLevel(ele){
            return Array.from(ele.parentNode.children).indexOf(ele);
      }
      clearAll(){
            this.logo          ? this.logo.remove()         : "";
            this.option        ? this.option.remove()       : "";
            this.loading_plane ? this.loading_plane.remove(): "";
            clearInterval(this.loading);
      }
      createAll(){
            this.logo          = Core.createEle("logo");
            this.loading_plane = Core.createEle("plane-loading");
      }
      animal(){
            //动态小飞机
            let index = 0;
            this.loading = setInterval(()=>{
                  this.loading_plane.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`
            },800)

            //动态背景图
            let PositionY = 0;
            let speed     = 0;
            //根据难度等级设置移动值
            switch(Core.hard_level){
                  case 0 : speed = 20 ; break;
                  case 1 : speed = 15 ; break;
                  case 2 : speed = 10 ; break;
                  case 3 : speed = 25 ; break;
            }
            //这个定时器不可以关闭哦
            setInterval(()=>{
                  PositionY += speed;
                  // console.log(speed,PositionY)
                  this.main.style.backgroundPositionY = PositionY + "px";
            },50)
      }

      gameStart(){
            console.log("游戏开始")
            new Plane();
            Enemy.enemyCreater();
      }

      //因为难度等级其他类也要用，所以最好设为静态资源
      static hard_level;
      static createEle(className){
            let ele = document.createElement("div");
            ele.className = className;
            document.body.appendChild(ele);
            return ele;
      }
}
//核心部分大致完成 
//开始创造自己的战机
class Plane{
      constructor(){
            //获取元素
            this.main = $(".main");
            this.cWidth = document.documentElement.offsetWidth;
           
            this.init();
      }
      init(){
            //绑定事件
            //发现不能绑定事件，直接执行事件就好
            //创建战机可以在移动里完成
            //所以只需创建移动的耦合处理函数
            //写着发现需要绑定移动事件
            this.plane = this.createPlane();
            this.mainSize = {
                  left : this.main.offsetLeft,
                  top  : this.main.offsetTop ,
                  width: this.main.offsetWidth
            }
            //老夫记住了，写着子弹还得回头改你，等着吧回头给你一场造化
            Plane.planeSize = {
                  width  : this.plane.offsetWidth,
                  height : this.plane.offsetHeight
            }
            on( document , "mousemove" , this.handlerMovePlane.bind(this) );
            this.fire();
      }
      handlerMovePlane(evt){
            var e = evt || window.event;

            // let x = e.clientX - this.planeSize.width  / 2;
            // let y = e.clientY - this.planeSize.height / 2;
            let {x,y} = this.boundry(e.clientX - Plane.planeSize.width/2,e.clientY - Plane.planeSize.height/2);
            this.plane.style.left = x + "px";
            this.plane.style.top  = y + "px";
            Plane.x = x;
            Plane.y = y;
      }
      createPlane(){
            let plane = Core.createEle("plane");
            plane.style.left = this.cWidth / 2 - plane.offsetWidth / 2 + "px";
            plane.style.cursor = "none";
            //乖乖这两行可不敢删了，它关乎着子弹刚开始的位置
            Plane.x = plane.offsetLeft;
            Plane.y = plane.offsetTop ;
            return plane;
      }
      boundry(x,y){
            let minX = this.mainSize.left;
            let maxX = this.mainSize.left + this.mainSize.width - Plane.planeSize.width;
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;
            y = y < 0    ? 0    : y;
            return{x,y};
      }
      //飞机基本构建完成
      //但是飞机需要开炮，需要弄一个与子弹交互的方法
      fire(){
            //通过定时器控制子弹密度
            let fireArtillery = 0;
            
            switch(Core.hard_level){
                  case 0 : fireArtillery = 500; break;
                  case 1 : fireArtillery = 400; break;
                  case 2 : fireArtillery = 300; break;
                  case 3 : fireArtillery = 100; break;
            }
            //因为需要一直开炮，所以不需要定时器
            setInterval(()=>{
                  new Bullet();
                  console.log(fireArtillery)
            },fireArtillery);
      }
      //为了方便修正下边子弹初始位置
      static x;
      static y;
      static planeSize;
}

//飞机构造完成 下面开始创建子弹
//如何实现一个定时器控制一梭子弹？
//需要一个子弹列表，定时器控制子弹列表来实现
class Bullet{
      constructor(){
            //获取元素
            // this.main = $(".main");
            this.speed = 20;

            //子弹移动需要定时器控制
            if(Bullet.bullet_timer === undefined){
                  Bullet.bullet_timer = setInterval(()=>{
                        this.bulletMove();
                  },50)
            }  
            
            //唯一的子弹列表
            // Bullet.bullet_list === undefined ? Bullet.bullet_list = [] : "";
           
            if(Bullet.bullet_list === undefined){
                  Bullet.bullet_list = [];
            }
            this.init();
      }

      init(){
            //绑定事件?好像不太需要
            //因为游戏加载完直接发射子弹没有触发这一说啊
            let bullet = this.createBullet();
            //子弹大小
            if(Bullet.bullet_size === undefined){
                  Bullet.bullet_size = {
                        width  : bullet.offsetWidth,
                        height : bullet.offsetHeight
                  }
            }   
      }
      //创建新的子弹
      createBullet(){
            let ele = Core.createEle("bullet");
            //养兵千日用在一时啊
            let left = Plane.x + Plane.planeSize.width/2 - ele.offsetWidth/2 ;
            let top  = Plane.y ;
            //不小心踩了个大坑，我日
            // console.log(left,top)
            // ele.style.left = left + "px";
            // ele.style.top  = top  + "px";
            Bullet.bullet_list.push({
                  ele,
                  left ,
                  top  ,
                  die  : this.bulletDie.bind(this)
            })
            return ele;
      }

      //子弹移动
      bulletMove(){
            for( let attr in Bullet.bullet_list){
                  let bullet = Bullet.bullet_list[attr];

                  if(bullet.top <= -30){
                        this.bulletDie(bullet);
                        continue;
                  }
                  bullet.top -= this.speed;
                  bullet.ele.style.top  = bullet.top + "px";
                  bullet.ele.style.left = bullet.left + "px";
            }
      }
      //子弹销毁
      bulletDie(bullet){

            let index = Bullet.bullet_list.indexOf(bullet);
            Bullet.bullet_list.splice(index,1);

            bullet.ele.className += " die";

            setTimeout(()=>{
                  bullet.ele.remove();
                  bullet = false;
            },500)
      }
      
      static bullet_list ;
      static bullet_size ;
      static bullet_timer;
}
//创建敌机
//需要用到策略模式
//根子弹差不多了
class Enemy{
      constructor(enemy_type){
            //获取元素
            this.main = $(".main");
            this.mainSize = {
                  width : this.main.offsetWidth,
                  left  : this.main.offsetLeft,
                  height: this.main.offsetHeight
            }
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
            //给个默认值
            enemy_type === undefined ? enemy_type = "small" : "";
            //获取当前的敌机个体
            this.enemt_data = this.enemies[enemy_type];

            if(Enemy.enemy_timer === undefined){
                  Enemy.enemy_timer = setInterval(()=>{
                         this.enemyMove();
                         this.collisionDetection();
                  },50) 
             }
             if(Enemy.enemy_list === undefined){
                   Enemy.enemy_list = [];
             }

            this.init();
      }
      init(){
            //添加事件
            //怎么添加？
           this.createEnemy();
      }
      //创建敌机
      createEnemy(){
            let enemy = Core.createEle(this.enemt_data.className);
            Enemy.enemy_list.push({
                  enemy,
                  hp : this.enemt_data.hp,
                  speed : this.enemt_data.speed,
                  left : this.mainSize.left + Math.round(Math.random() * (this.mainSize.width - enemy.offsetWidth)),
                  top : 0 ,
                  width : enemy.offsetWidth,
                  height : enemy.offsetHeight,
                  die : this.enemyDie.bind(this)
            })
      }
      enemyMove(){
            for( let attr in Enemy.enemy_list ){
                  let enemy = Enemy.enemy_list[attr];
                  if(enemy.top >= this.mainSize.height){
                        this.enemyDie(enemy);
                        continue;
                  }
                  enemy.top += enemy.speed;
                  enemy.enemy.style.left = enemy.left + "px";
                  enemy.enemy.style.top  = enemy.top  + "px";
            }
      }
      enemyDie(enemy){
            let index = Enemy.enemy_list.indexOf(enemy);
            Enemy.enemy_list.splice(index , 1);
            enemy.enemy.className += " die";
            
            setTimeout(()=>{
                  enemy.enemy.remove();
                  enemy = false;
            },1000)
      }
      //边界检测
      collisionDetection(){
            let bullets = Bullet.bullet_list;
            let enemys = Enemy.enemy_list;

            for( let i = 0 , bullet ; bullet = bullets[i] ; i ++){
                  for(let j = 0 , enemy ; enemy = enemys[j] ; j ++){
                        if(bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width){
                              if(bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height){
                                    bullet.die(bullet);
                                    enemy.hp --
                                    if(enemy.hp <= 0){
                                          enemy.die(enemy);
                                    }
                              }
                        }
                  }
            }
      }
      static enemy_list;
      static enemy_timer;

      static enemyCreater(){
            let count = 0;
            setInterval(()=>{
                  count ++;

                  Math.random() > 0.5 ? new Enemy() : "";
                  count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
                  count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
                  
                  //我这套大飞机有点多
                  // Math.random() > 0.5 ? new Enemy("small") : "";
                  // (Math.random() > 0.8 || count % 8 === 0) ? new Enemy("middle"): "";
                  // (Math.random() > 0.95 || count % 15 === 0) ? new Enemy("large") : "";

            },1000)
      }
}
new Core();