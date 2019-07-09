/**
 * 核心部分=》难度选择，开场动画，计分，暂停
 * 飞机   =》跟随移动
 * 子弹   =》飞行移动，和敌对机的交互（击落）
 * 敌对机 =》 类型 大中小
 */

 let { $ , on } = Utils;
 //核心部分

 //选择难度
 //logo入场
 //动态飞机
 //背景运动

 class Core{
      constructor(){
            //获取元素
            this.option = $(".options");
            this.main   = $(".main");

            this.init();
      }
      init(){
            //绑定事件
            on(this.option,"click",this.handlerClick.bind(this));
      
      
            
      }

      handlerClick(evt){
            //处理耦合关系
            //事件委托
            let e      = evt || window.event;
            let target = e.target || e.srcElement;
            //如何确定p元素点击事件
            //一般事件绑定都是多个一样的同级元素 或是动态生成的元素 下面这种办法真的很实用
            if(target.nodeName !== "P") return false;
            //确定了都是p元素后，获取其下标 需要一个值获取难度
            // Core.hard_level = Array.from(target.parentNode.children).indexOf(target);
            this.setHardLevel(target);
            //选择下标成功 该清空页面元素了
            this.clearAll();
            //清除成功 加载logo
            this.showAll();
            //加载飞机背景动画
            this.animate();
            setTimeout( () => {
                  //清除页面其他元素
                  this.clearAll();
                  //开始游戏
                  this.gameStart();
            },3000);
      }
      setHardLevel(ele){
            //获取对应事件下标 值得学习一波
            //我现在对于数组与字符串的用法不太灵活
            Core.hard_level = Array.from(ele.parentNode.children).indexOf(ele);  
      }
      clearAll(){
            this.option        ? this.option.remove() : "";
            this.logo          ? this.logo.remove() : "";
            this.plane_loading ? this.plane_loading.remove() : "";
            clearInterval(this.loading);
      }
      showAll(){
           this.logo = Core.createEle("logo");
           this.plane_loading = Core.createEle("plane-loading");
      }
      animate(){
            //怎么加载 定时器
            //根据元素下标确定等级
            //首先加载飞机动画
            let index = 0;
            //通过开定时器，添加飞机加载动画 另外 ~~中间直接用${}直接添加动态数值就行了再也不用双引号和++分隔了
            this.loading = setInterval(()=>{
                  this.plane_loading.style.backgroundImage = `url(./images/loading${++index  % 3 +1}.png)`
            },600)

            //加载背景图移动
            let positionY = 0;
            let speed     = 5;

            switch(Core.hard_level){
                  case 0: speed = 20;break;
                  case 1: speed = 15;break;
                  case 2: speed = 10;break;
                  case 3: speed = 20;break;
            }
            //这个定时器必须游戏结束时才关闭
            this.bg_moving = setInterval(()=>{
                  positionY += speed;
                  this.main.style.backgroundPositionY = positionY +"px";
            },50)
      }
      gameStart(){
            //游戏开始
            console.log("游戏开始")
            plane.init().fire();
            Enemy.enemyCreater();
      }

      static hard_level;
      //因为创建元素方法通用，可以放到静态资源 以备使用
      static createEle(className){
            let ele = document.createElement("div");
            ele.className = className;
            document.body.appendChild(ele);
            return ele;
      }
 }

 //写完了开场动画
 //首先要加载飞机

class Plane{
      constructor(){
            this.main = $(".main");
            //获取了那个当前窗口的宽度？？？
            this.cWidth = document.documentElement.offsetWidth;
            //嗯。没错经检验就是当前窗口的宽度，会随页面宽度变化而改变
            // console.log(this.cWidth);
      }
      //选择元素绑定事件
      init(){
            this.plane = this.createPlane();
            //为了下面的子弹位置 我忍了
            Plane.plane_size = {
                  width : this.plane.offsetWidth
            }
            //一切为了性能 日腾咯
            this.mainSize = {
                  left : this.main.offsetLeft,
                  width: this.main.offsetWidth
            }
            //这个对象 必须先动态创建一个plane才能获取具体宽高
            this.planeSize = {
                  width  : this.plane.offsetWidth,
                  height : this.plane.offsetHeight           
            }
            
           on( document , "mousemove" , this.planeMove.bind(this));
           return this;
      }
      //创建自己的战机
      createPlane(){
            let plane = document.createElement("div");
            plane.className = "plane";
            document.body.appendChild(plane);
            plane.style.cursor = "none";
            //生成飞机初始位置
            plane.style.left = this.cWidth / 2 - plane.offsetWidth/2 + "px";
           
          
            return plane;
      }
      //移动事件
      planeMove(evt){
            let e = evt || window.event;
            // let{x,y} = this.boundary(e.clientX - this.plane.sty)
            let {x,y} = this.boundary(e.clientX - this.planeSize.width /2,e.clientY - this.planeSize.height/2);
            //为了确定后面子弹创建的位置，么得脾气只能存入这个xy
            Plane.x = x;
            Plane.y = y;
            this.plane.style.left = x + "px";
            this.plane.style.top  = y + "px";
            
      }
      //固定边界
      boundary(x,y){
            let minX = this.mainSize.left;
            let maxX = this.mainSize.left + this.mainSize.width - this.planeSize.width;
            
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;
            y = y < 0    ? 0 : y   ;
            //es6新写法
            return{
                  x,y
            }
      }
      //开炮
      fire(){
            //这句声明不太懂
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
            //-有点小迷----懂了

            setInterval(()=>{
                  //确定了是开炮频率，难度越高开炮频率越低，
                  //每一个class创建每一粒子弹
                  new Bullet();
            },frequency);
      }
      static x;
      static y;
      static plane_size;
}

//发射子弹
//考虑一下怎么制造子弹？如何一个定时器发射多枚子弹？
class Bullet{
      constructor(){
            this.speed = 20;

            if(Bullet.bullet_timer === undefined){
                  Bullet.bullet_timer = setInterval(()=>{
                        this.bulletMove();
                  },50)
            }
            //还要只有一个子弹列表
            if(Bullet.bullet_list === undefined){
                  Bullet.bullet_list = [];
            }
            //还有下面的写法 这检测这个方法有缺陷=>修改完成
            // Bullet.bullet_list === undefined ?  Bullet.bullet_list = [] : "";
            // console.log(Bullet.bullet_list)
            //初始化
            this.init();
      }
      init(){     
            let bullet = this.createBullet();
            if(Bullet.bullet_size === undefined){
                  Bullet.bullet_size = {
                        width  : bullet.offsetWidth,
                        height : bullet.offsetHeight
                  }
            }
      }
      createBullet(){
            let bullet = document.createElement("div");
            bullet.className = "bullet";
            document.body.appendChild(bullet);
            //三木运算为了省性能
            let left = Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : bullet.offsetWidth /2);
            let top  = Plane.y;

            Bullet.bullet_list.push({
                  bullet,
                  left,
                  top,
                  die : this.bulletDie.bind(this)
            })
            return bullet;
      }
      bulletMove(){
            //子弹都给我动起来
            //只能说是通过定时器加循环 实现
            for(let attr in Bullet.bullet_list){
                  let bullet = Bullet.bullet_list[attr];
                  if(bullet.top <= -50){
                        this.bulletDie(bullet);
                        continue;
                  }
                  bullet.top -= this.speed;
                  //创建的子弹运动轨迹
                  bullet.bullet.style.top  = bullet.top  + "px";
                  bullet.bullet.style.left = bullet.left + "px";
            }
      }
      bulletDie(bullet){
            let index = Bullet.bullet_list.indexOf(bullet);
            //在数组中移除
            Bullet.bullet_list.splice(index,1);
            bullet.bullet.className += " die";
            //过段时间直接删除
            setTimeout(()=>{
                  bullet.bullet.remove();
                  bullet = false;
            },600)
      }

      static bullet_timer;
      static bullet_list ;
      static bullet_size ;
}

//我方飞机大炮已就绪
//敌军出击
//因为种类不同 需要用到策略模式
class Enemy{
      //敌军类型什么鬼？？？-------------------------------
      constructor(enemy_type){
            //正常的获取元素
            this.main = $(".main");
            this.mainSize = {
                  width : this.main.offsetWidth,
                  height: this.main.offsetHeight,
                  left  : this.main.offsetLeft
            }

            //跟子弹一样绑定一个定时器
            if(Enemy.enemy_timer === undefined){
                  Enemy.enemy_timer = setInterval(()=>{
                        //敌机移动
                        this.enemyMove();
                        //边界检测
                        this.collisionDetection();
                  },50)
            }
            //根子弹一样 创建一个列表
            if(Enemy.enemy_list === undefined){
                  Enemy.enemy_list = [];
            }
           
            //首先考虑敌军类型
            //类型 hp 移速 死亡动画
            this.enemies = {
                  "small" :{
                        className : "enemy-small",
                        speed     : 10,
                        hp        : 1,
                        dieClassName : "enemy-small-die"
                  },
                  "middle" :{
                        className : "enemy-middle",
                        speed     : 7,
                        hp        : 10,
                        dieClassName : "enemy-middle-die"
                  },
                  "large" :{
                        className : "enemy-large",
                        speed     : 1,
                        hp        : 30,
                        dieClassName : "enemy-large-die"
                  }
            }
             //在来个默认子弹类型-----------------------
             enemy_type = enemy_type === undefined ? enemy_type : "small";
             this.enemy_data = this.enemies[enemy_type];
            
             //初始化
             this.init();
      }
      init(){
            //创建敌军类型
            this.createEnemy();
      }
      createEnemy(){
            let ele = document.createElement("div");
            ele.className = this.enemy_data.className;
            document.body.appendChild(ele);

            Enemy.enemy_list.push({
                  ele,
                  hp : this.enemy_data.hp,
                  speed : this.enemy_data.speed,
                  left :Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth ),
                  top : 0,
                  width : ele.offsetWidth,
                  height : ele.offsetHeight,
                  die : this.enemyDie.bind(this)
            })
      }
      //敌军移动几乎跟子弹类似
      enemyMove(){
            for( var attr in Enemy.enemy_list){
                  let enemy = Enemy.enemy_list[attr];
                  enemy.top += enemy.speed;
                  //敌机移动超过屏幕
                  if(enemy.top >= this.mainSize.height ){
                        this.enemyDie(enemy);
                        continue;
                  }

                  enemy.ele.style.left = enemy.left + "px";
                  enemy.ele.style.top  = enemy.top  + "px";
            }
      }
      //根删除子弹类似啊
      //不对 还有个动画了
      enemyDie(enemy){
            let index = Enemy.enemy_list.indexOf(enemy);
            Enemy.enemy_list.splice(index , 1);
            enemy.ele.className += " die";

            setTimeout(()=>{
                  enemy.ele.remove();
            },1000)
      }

      //碰撞检测
      collisionDetection(){
            let bullets = Bullet.bullet_list;
            let enemys  = Enemy.enemy_list  ;

            //双层循环比对
            for(let i = 0 , bullet ; bullet = bullets[i] ; i++){
                  for(let k = 0 , enemy ; enemy = enemys[k] ; k++){
                        if(bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width)
                              if(bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height){
                                    bullet.die(bullet);
                                    enemy.hp --;
                                    if(enemy.hp <=0 )
                                          enemy.die(enemy);
                              }
                  }
            }
      }

      static enemy_size ;
      static enemy_list ;
      static enemy_timer;
      static randomLeft(min,max){
            return min + Math.round(Math.random() * (max - min));
      }

      //随机创建敌对机
      static enemyCreater(){
            //小敌机
            let count = 0;
            //因为需要一直创建敌机，所以这个定时器也不能去掉哦
            setInterval(()=>{
                  count ++;
                  Math.random() > 0.5 ? new Enemy() : "";
                  count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
                  count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";

            },1000)
      }

}


 new Core();
 let plane = new Plane();