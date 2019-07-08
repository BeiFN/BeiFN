class Base {
      width() {
            if(!this.$width){
                  this.$width = this.el.offsetWidth;
            }
            return this.$width;
      }
      height() {
            if(!this.$height){
                  this.$height = this.el.offsetHeight;
            }
            return this.$height;
      }
      left(val) {
            if(val!=undefined) {//写！=underfined是为了后面判断敌军的位置？
                  this.el.style.left = val + "px";
            } else {
                  return this.el.offsetLeft;
            }
      }
      top(val) {
            if(val!=undefined) {//写！=underfined是为了后面判断敌军的位置？
                  this.el.style.top = val + "px";
            } else {
                  return this.el.offsetTop;
            }
      }
}
Base.constant = {	//常量，飞机的类型
      PLANE_TYPE_BIG : Symbol(),//大
      PLANE_TYPE_MIDDLE : Symbol(),//中
      PLANE_TYPE_SMALL : Symbol()//小
}

//游戏系统(单例)
class Game extends Base {
      constructor(){
            super();
            if(!Game.instance) {
                  Game.instance = Object.create(Game.prototype);
                  Game.instance.el = document.getElementsByClassName("main")[0];
                  Game.instance.enemies = new Set();
            }
            return Game.instance;
      }
      run(){
            //启动
            this.optionsInit();	
      }
      
      optionsInit(){//选择菜单初始化
            //给菜单添加点击事件
            let options = this.el.getElementsByClassName("options")[0];
            options.addEventListener("click",(e)=>{
                  this.level = e.target.getAttribute("value");
                  //清除菜单
                  options.style.display = "none";
                  this.start();
            })
      }
      start() {
            //先加载一小会儿
            this.loading( ()=>{
                  this.realStart();
            })
      }
      //加载页面
      loading(callback) {
            //callback();
            let ele = document.createElement("div");
            ele.className = "loading";
            game.el.appendChild(ele);
            //加载时,就是切换三张图片
            let num = 1;
            let timer = setInterval( ()=>{//用箭头函数,直接不用考虑this的问题了
                  ele.style.backgroundImage = `url(images/loading${num}.png)`;
                  num++;
                  if(num == 4) num=1;
            },300);
            setTimeout( ()=>{
                  clearInterval(timer);//关闭上面的定时器
                  ele.remove();//清除loading动画
                  this.el.getElementsByClassName("logo")[0].remove();
                  callback();
            },3000)
            
      }
      //真正地开始
      realStart() {
            //背景滚动
            this.bgStartMoving();
            //加载我方战机
            this.myplane = new MyPlane(this.level).init().show();
            //不断地加载敌方飞机
            this.autoCreateEnemy();
      }
      
      //加载敌方飞机
      autoCreateEnemy() {
            //分别设置加载大飞机，中飞机，小飞机的定时器
            //飞机出现的时间间隔，数量不同
            setInterval(()=>{
                  if(Math.random() > 0.8) {
                        this.enemies.add(new Enemy( Base.constant.PLANE_TYPE_BIG).init().move());
                  }
            },2000)
            setInterval(()=>{
                  if(Math.random() > 0.6) {
                        this.enemies.add(new Enemy( Base.constant.PLANE_TYPE_MIDDLE).init().move());
                  }
            },1600)
            setInterval(()=>{
                  if(Math.random() > 0.2) {
                        this.enemies.add(new Enemy( Base.constant.PLANE_TYPE_SMALL).init().move());
                  }
            },800)
      }
      
      //添加某个对象到游戏中
      append(somebody) {
            this.el.appendChild(somebody.el);
      }
		
// 		width() {
// 			if(!this.$width) {
// 				this.$width = this.el.offsetWidth;
// 			}
// 			return this.$width;
// 		}
// 		height() {
// 			if(!this.$height) {
// 				this.$height = this.el.offsetHeight;
// 			}
// 			return this.$height;
// 		}
      left(){
            if(!this.$left) {
                  this.$left = this.el.offsetLeft;
            }
            return this.$left;
      }
      //背景图的移动
      bgStartMoving(){
            let val = 0;
            setInterval( ()=>{
                  this.el.style.backgroundPositionY = (val+=2) + "px";
            },30)
      }
}
let game = new Game();
game.run();

class MyPlane extends Base {
      constructor(level){
            super();
            if(!MyPlane.instance){
                  MyPlane.instance = Object.create(MyPlane.prototype);
                  //错：this.level = level;
                  MyPlane.instance.level = level;
            }
            return MyPlane.instance;
      }
      //初始化我方战机的位置,移动,子弹发射速度
      init(){
            this.el = document.createElement("div");
            this.el.className = "my-warplain";
            //game.append(this);
            this.show();
            //战机的位置
            this.left( game.width()/2 - this.width()/2 );
            this.top( game.height() - this.height() );
            //鼠标控制飞机移动
            this.addMouseController();
            //子弹发射的频率
            switch(this.level){
                  case '4': this.interval = 1000; break;
                  case '3': this.interval = 600; break;
                  case '2': this.interval = 400; break;
                  case '1': this.interval = 200; break;
                  
            }
            this.autoFire();
            return this;
      }
      
      addMouseController(){//鼠标控制
            document.addEventListener("mousemove",(e)=>{
                  let _left = Math.min(Math.max(0, e.clientX - game.left() - this.width()/2), game.width()-this.width());
                  let _top = Math.min(Math.max(0, e.clientY - this.height()/2), game.height()-this.height());
                  this.left( _left );
                  this.top( _top );
            })
      }
      show(){//显示出来
            game.append(this);
            return this;
      }
      autoFire() {//自动开火
            setInterval( ()=>{
                  new Bullet().init().move();
            },this.interval)
      }
      destroy(){//销毁
            
      }
      
// 		width(){
// 			if(!this.$width){
// 				this.$width = this.el.offsetWidth;
// 			}
// 			return this.$width;
// 		}
// 		height(){
// 			if(!this.$height){
// 				this.$height = this.el.offsetHeight;
// 			}
// 			return this.$height;
// 		}
// 		left(val) {
// 			this.el.style.left = val + "px";
// 		}
// 		top(val) {
// 			this.el.style.top = val + "px";
// 		}
}

//敌军
class Enemy extends Base {
      constructor(type){
            super();
            this.el = document.createElement("div");
            this.type = type;
      }
      init() {//初始化
            Enemy.planeList[this.type].call(this);
            //等价于 this.Enemy.planeList[this.type]();
            
            this.show();
            
            //敌军的初始位置
            this.left(Math.round(Math.random()*(game.width() - this.width())));
            this.top(-this.height());
            return this;
      }
      show() {
            game.append(this);
            return this;
      }
      move() {
            this.movetimer = setInterval(()=>{
                  this.top(this.top() + this.speed);
                  if(this.top() > game.height()) {
                        this.destroy();
                  }
            },30);
            return this;
      }
      hurt() {
            
            console.log(this.hp);
            if(--this.hp == 0) {
                  this.explode();//爆炸
            }
      }
      destroy() {
            clearInterval(this.movetimer);
            this.el.remove();
      }
      explode(){
            game.enemies.delete(this);
            //动画效果
            Enemy.explodetype[this.type].call(this);
      }
}

Enemy.planeList = {}
Enemy.planeList[Base.constant.PLANE_TYPE_BIG] = function(){
      this.el.className = "enemy-large";
      this.hp = 7;//生命值
      this.speed = 1;//速度
}
Enemy.planeList[Base.constant.PLANE_TYPE_MIDDLE] = function(){
      this.el.className = "enemy-middle";
      this.hp = 4;
      this.speed = 3;
}
Enemy.planeList[Base.constant.PLANE_TYPE_SMALL] = function(){
      this.el.className = "enemy-small";
      this.hp = 1;
      this.speed = 5;
}
Enemy.explodetype = {};
Enemy.explodetype[Base.constant.PLANE_TYPE_BIG] = function(){
      let num = 1;
      let $this = this;
      setTimeout(function fn(){
            $this.el.style.backgroundImage = `url(images/plane3_die${num}.png)`;
            num++;
            if(num<7) {
                  setTimeout(fn,200);
            } else {
                  $this.destroy();
            }
      },30);
}
Enemy.explodetype[Base.constant.PLANE_TYPE_MIDDLE] = function(){
      let num = 1;
      let $this = this;
      setTimeout(function fn(){
            $this.el.style.backgroundImage = `url(images/plane2_die${num}.png)`;
            num++;
            if(num<5) {
                  setTimeout(fn,200);
            } else {
                  $this.destroy();
            }
      },30);
}
Enemy.explodetype[Base.constant.PLANE_TYPE_SMALL] = function(){
      let num = 1;
      let $this = this;
      setTimeout(function fn(){
            $this.el.style.backgroundImage = `url(images/plane1_die${num}.png)`;
            num++;
            if(num<4) {
                  setTimeout(fn,200);
            } else {
                  $this.destroy();
            }
      },30);
}

class Bullet extends Base {
      constructor() {
            super();
            this.el = document.createElement("div");
            this.no = Math.random();
            this.el.setAttribute("no",this.no);
      }
      init() {
            this.el.className = "bullet";
            //显示
            this.show();
            //设定位置
            //子弹的left值 = 飞机的left值 + 飞机宽度的一半 - 子弹宽度的一半
            //子弹的top值 = 飞机的top值 - 子弹的高度
            this.left(game.myplane.left() + game.myplane.width()/2 -this.width()/2 )
            this.top(game.myplane.top() - this.height());
            return this;
      }
      show(){
            game.append(this);
            return this;
      }
      move() {//子弹的移动
            let t = setInterval( ()=>{
                  this.top(this.top() - 5);
                  //检测碰撞
                  this.isPeng();
                  if(this.top() < -this.height()) {
                        this.destroy();
                        clearInterval(t);
                  }
            },30)
      }
      isPeng() {
            //拿当前子弹的位置,跟所有飞机比较
            for(let enemy of game.enemies) {
                  //解构赋值
                  let [_left,_top] = [this.left(),this.top()];
                  let [minLeft,maxLeft,minTop,maxTop] = [
                              enemy.left() - this.width(),
                              enemy.left() + enemy.width(),
                              enemy.top() - this.height(),
                              enemy.top() + enemy.height()]
                  if(_left>minLeft && _left<maxLeft && _top>minTop && _top<maxTop) {
                        enemy.hurt();
                        this.destroy();
                        break;
                  }
            }
      }
      destroy() {
            this.el.remove();
      }
}

//武器
class Weapon {
      init() {
            return this;
      }
      show(){
            return this;
      }
      move() {
            
      }
      destroy() {
            
      }
}