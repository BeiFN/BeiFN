// 导入外部库
let {$,on} = Utils;

// 首页
class Core{
      
      constructor(){
            console.log(this);
            this.option = $(".options");
            this.main = Utils.$(".main");
            this.init();
      }
      init(){
            console.log(this);
            on(this.option,"click",this.handlerClick.bind(this));
      }
      handlerClick(evt){
            let e = evt || window.event;
            let target = e.target ||e.srcElement;

            if(target.nodeName !== "P") 
                  return false;

            // console.log(target);
            // 获取下标
            this.setHardLevel(target);
            console.log(Core.hardLevel);
            this.clearAll();//清场
            this.showAll();//显示开场界面logo
            this.animate();//显示开场动画
            setTimeout(()=>{
                  this.clearAll();//清除开场显示
                  this.gameStart();//开始游戏
            },1500);

      }
      clearAll(){
            this.option? this.option.remove():"";
            clearInterval(this.loading);
            this.logo ? this.logo.remove():"";
            this.plane_loading?this.plane_loading.remove():"";
      }
      showAll(){
            this.logo = Core.createEle("logo");
            this.plane_loading = Core.createEle("plane-loading");
      }
      setHardLevel(target){
            Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
      }
      animate(){
            let index = 0;
            this.loading = setInterval(()=>{
                  index ++;
                  console.log("loading",index);

                  if(index%3 === 0){
                        console.log("ss");
                        this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-4483375ae7043942.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

                  }else if(index%3 === 1){
                        console.log("ss3");

                        this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-c53b48a9025ef930.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

                  }else{
                        console.log("ss2");

                        this.plane_loading.style.backgroundImage = `url("https://upload-images.jianshu.io/upload_images/2845301-ecb7640ccd9e7b77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240")`;

                  }
                  
                  console.log(index);
                  // this.plane_loading.style.backgroundImage = `url(./images/loading${++index%3+1}.png)`;
            },500);

            let positionY = 0;
            let speed =5;
            switch(this.hardLevel){
                  case 0: speed= 20;break;
                  case 1: speed= 15;break;
                  case 2: speed= 10;break;
                  case 3: speed= 20;break;
            }
            this.bg_moving = setInterval(()=>{
                  positionY += speed;
                  this.main.style.backgroundPositionY = positionY + "px";
            },50);
      }
      gameStart(){
            console.log("开始游戏"+Core.hardLevel);
            plane.init().fire();
            Enemy.enemyCreater();
      }

      static hardLevel;
      static createEle(className){
            let ele = document.createElement("div");
            ele.className = className;
            document.body.appendChild(ele);
            return ele;
      }
}

// 战机
class Plane{
      constructor(){
            // this.init();
      }
      init(){
            this.ele = this.createPlane();
            this.main = $(".main");
            Plane.plane_size = {//战机尺寸
                  width:this.ele.offsetWidth,
                  height: this.ele.offsetHeight,
            }
            this.mainSize = {//背景尺寸位置
                  left :this.main.offsetLeft,
                  width : this.main.offsetWidth,
                  height : this.main.offsetHeight,

            }
          
            on(document, "mousemove",this.planeMove.bind(this));

            return this;
      }
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
      planeMove(evt){//战机移动
            let e = evt || window.event;
            let {x,y} = this.boundary(e.clientX - Plane.plane_size.width/2, e.clientY - Plane.plane_size.height/2);
            Plane.x = x;
            Plane.y = y;
            this.ele.style.left = x + "px";
            this.ele.style.top = y + "px";

      }
      boundary(x,y){//边界检测
            let minX = this.mainSize.left;
            let maxX = this.mainSize.left +this.mainSize.width - Plane.plane_size.width;
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;

            y = y < 0 ? 0 : y;
            return {
                  x,    //=== x:x,
                  y,    //=== y:y,
            }
      }     
      fire(){//发射子弹
            let frequency = 100;//子弹冷却时间
            switch(Core.hardLevel){//判断当前游戏难度
                  case 0 : frequency = 500; break;//困难
                  case 1 : frequency = 300; break;//普通
                  case 2 : frequency = 200; break;//简单
                  case 3 : frequency = 100; break;//付费
            }
            setInterval(()=>{
                  new Bullet();//构建子弹
            },frequency);
      }



      static x;//战机x
      static y;//战机y
      static plane_size;//战机尺寸

}

// 子弹
class Bullet{
      // 子弹共用定时器策略，判断定时器是否存在，不存在则创建定时器再调用子弹移动方法。
      // 判断存子弹数组是否存在，不存在则创建
      // 创建子弹时，将所需的子弹信息以对象形式存在数组中
      // 子弹移动时，从for循环中遍历，修改每个子弹对象的对应属性值
      constructor(){
            this.speed = 20;
            if(Bullet.bullet_timer === undefined){
                  Bullet.bullet_timer = setInterval(()=>{
                        this.bulletMove();
                  },50);
            }
            if(Bullet.bullet_list === undefined){
                  Bullet.bullet_list = [];
            }
            this.init();         
      }

      init(){
            let ele = this.createBullet();
            if(Bullet.bullet_size === undefined){
                  Bullet.bullet_size = {
                        width : ele.offsetWidth,
                        height : ele.offsetHeight,
                  }
            }
      }
      createBullet(){
            let ele = document.createElement("div");
            ele.className = "bullet";
            document.body.appendChild(ele);

            let left = Plane.x + Plane.plane_size.width/2 - (Bullet.bullet_size ? Bullet.bullet_size.width/2 : ele.offsetWidth/2);
            let top = Plane.y;

            Bullet.bullet_list.push({
                  ele,
                  left,
                  top,
                  die: this.bulletDie.bind(this),
            })

            return ele;
      }
      bulletMove(){
            for(let attr in Bullet.bullet_list){
                  let bullet = Bullet.bullet_list[attr];
                  if(bullet.top <= -50){
                        this.bulletDie(bullet);
                        continue;
                  }
                  // Bullet.bullet_list[attr].ele.setAttribute("data","move");
                  bullet.ele.setAttribute("data","move");
                  bullet.top -= this.speed;
                  bullet.ele.style.top = bullet.top + "px";
                  bullet.ele.style.left = bullet.left + "px";
            }
      }
      bulletDie(bullet){
            let index = Bullet.bullet_list.indexOf(bullet);
            Bullet.bullet_list.splice(index,1);
            bullet.ele.className += " die";

            setTimeout(()=>{
                  bullet.ele.remove();
                  bullet = false;//清除引用
            },500);
      }

      static bullet_timer;
      static bullet_list;
      static bullet_size;
}

// 敌机
class Enemy{
      constructor(enemy_type){
            this.main = $(".main");
            this.mainSize = {
                  width : this.main.offsetWidth,
                  height : this.main.offsetHeight,
                  left : this.main.offsetLeft,
            }
            Enemy.enemy_timer ? "":Enemy.enemy_timer = setInterval(()=>{
                  this.enemyMove();
                  this.collisionDetection();
            },50);
            Enemy.enemy_list ? "":Enemy.enemy_list = [];
            this.enemies = {
                  "small" :{
                        className : "enemy-small",
                        speed : 10,
                        hp : 1,
                        dieClassName : "enemy-small-die",
                  },
                  "middle" :{
                        className : "enemy-middle",
                        speed : 5,
                        hp : 10,
                        dieClassName : "enemy-middle-die",
                        },
                  "large" :{
                        className : "enemy-large",
                        speed : 1,
                        hp : 50,
                        dieClassName : "enemy-large-die",
                  },
            }
            enemy_type = enemy_type?enemy_type:"small";
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
                  left : Enemy.randomLeft(this.mainSize.left, this.mainSize.left + this.mainSize.width - ele.offsetWidth),
                  top: 0,
                  speed : this.enemy_data.speed,
                  width : ele.offsetWidth,
                  height : ele.offsetHeight,
                  die: this.enemyDie.bind(this),
            });
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
            let index  = Enemy.enemy_list.indexOf(enemy);
            Enemy.enemy_list.splice(index,1);
            enemy.ele.className += " die";
            setTimeout(()=>{
                  enemy.ele.remove();
            },1000);
      }
      collisionDetection(){
            let bullets = Bullet.bullet_list;
            let enemys = Enemy.enemy_list;

            for(let i =0,bullet; bullet = bullets[i];i++){
                  for(let k =0,enemy; enemy = enemys[k];k++){
                        if(this.collisionLeft(enemy,bullet)){
                              if(this.collisionTop(enemy,bullet)){
                                    bullet.die(bullet);
                                    enemy.hp --;
                                    if(enemy.hp <= 0){
                                          enemy.die(enemy);
                                    }
                              }
                        }
                  }
            }
      }
      collisionLeft(enemy,bullet){
            return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width;
      }
      collisionTop(enemy, bullet){
            return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
      }
      static enemy_timer;
      static enemy_list;
      static enemy_size;
      static randomLeft(min,max){
            return min + Math.round(Math.random()*(max - min));
      }
      static enemyCreater(){
            let count = 0;
            setInterval(()=>{
                  count ++;
                  Math.random() > 0.5 ? new Enemy() : "";
                  count % 5 === 0 ? (Math.random()<0.8 ? new Enemy("middle") :"") :"";
                  count % 10 === 0 ? (Math.random()<0.9 ? new Enemy("large") :"") :"";
            },1000);
      }
}

// 创建实例
new Core();
let plane = new Plane();


class BaseKnowledge{
      constructor(){

      }
      handlerClick(evt){
            let e = evt || window.event;//获取点击事件固定写法
            let target = e.target ||e.srcElement;//获取目标固定写法
            
            if(target.nodeName !== "P")//判断点击的是不是P标签，nodeName获取标签名
                return false;
      }
      
      knowledge(){
            this.option.remove();//移除标签dom.remove();
            
            Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
            Array.from([]);//将客户内伪数组类型数据转为数组。
            arr.indexOf(tar);//tar在数组内的下标，如果不存在，返回-1；
            
            let ele = document.createElement("div");//创建一个div
            ele.className = "plane";//给创建的元素添加class属性值,给class属性赋值,是下面写法的简写
                var myAttr = document.createAttribute("class");
                //创建属性节点，固定写法为document.createAttribute(),只是创建，需要再添加
                mytAtr.nodeValue = "plane";
                console.log(myAttr);
                ele.setAttributeNode(myAttr);//创建的属性添加到box上
            document.body.appendChild(ele);//把创建的div添加到body末尾
            
            ele.className += " die";//给ele添加class属性值die，注意添加属性时要有空格，不然拼接会导致所有两个class值失效
            
            //将获取offset的方法存放在外边，避免在定时器等多次触发的方法中获取
            this.mainSize = {//背景尺寸位置
                left :this.main.offsetLeft,
                width : this.main.offsetWidth,
                height : this.main.offsetHeight,
            }
            
            let cWidth = document.documentElement.clientWidth;//获取屏幕宽
            
            ele.setAttribute("data","move");//给标签ele设置属性data和属性值move
            
            
            let index = Bullet.bullet_list.indexOf("bullet");//获取bullet在Bullet.bullet_list中的下标
            Bullet.bullet_list.splice(index,1);//删除数组Bullet.bullet_list中第index的元素，1后面再加参数为替换元素
            
            

      }
}