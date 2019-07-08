/**
 * 1.布局，显示难度选择按钮
 * 2.点击按钮，按钮列表消失 ，清屏
 * 3.开场动画：logo 小飞机滑动过场动画
 * 4.开场动画结束：清屏，游戏开始
 * 5.游戏开始：飞机出现 定时器创建并发射子弹(类) 敌机出现(类);
 * 
 */

let {$ , on} = Utils;

class Game{
	constructor(arg) {
	   this.options = $(".options") ;
	   this.main = $(".main")
	   
	   
	   this.init();
	}
	init(){
		on(this.options , "click" , this.thishandlerClick.bind(this))
	}
	//耦合处理函数
	thishandlerClick(evt){
		let e = evt || window.event;
		let target = e.target || e.srcElement ;
		if(target.nodeName !== "P") return false;
		// 获取下标
		this.setLevelIndex(target);
		
		// console.log(this.game_level); //成功调用耦合函数;
		//清屏
		this.clearScreen();
		this.showLogo();
		this.showLoadingAnimate();
		setTimeout(() => {
			this.clearScreen();
			this.gameStart();
		},3000)
	}
	//logo展示部分
	showLogo(){
		this.logo = Game.createEle("logo");
	}
	//展示过场动画
	showLoadingAnimate(){
		this.loading = Game.createEle("plane-loading");
		// var index = 1;
		// this.load_timer = setInterval( () => {
		// 	this.loading.style.backgroundImage = `url(./images/loading${index++ % 3 +1}.png)`;
		// },500)
	}
	//清屏函数，可多次调用;
	clearScreen(){
		this.options ? this.options.remove() : "";
		clearInterval(this.load_timer);
		
		this.logo ? this.logo.remove() : "" ;
		this.loading ? this.loading.remove() : ""

	}
	//获取下标
	setLevelIndex(target){
		Game.game_level = Array.from(target.parentNode.children).indexOf(target);;
	}
	gameStart(){
		//创建飞机和火药
		my_plane.init();
		my_plane.fire();
		//创建敌方飞机
		Enemy.createRandomEnemy();
		
		
	}
	
	static createEle(classname){
		let ele = document.createElement("div");
		ele.className = classname;
		document.body.appendChild(ele);
		return ele;
	}
	static game_level;
}

//创建我方飞机
/**
 * 1.创建飞机
 * 2.设置飞机初始化位置
 * 3.给主区域添加mousemove事件，飞机根据鼠标移动而移动
 * 4.边界检测
 * 5.触发火药函数
 * 
 */
class Plane{
	constructor(){
		
	}
	init(){
		this.plane = this.createPlane();
		this.main = $(".main");
		
		Plane.planeWidth = this.plane.offsetWidth;
		this.main_size = {
			width : this.main.offsetWidth,
			height : this.main.offsetHeight,
			left : this.main.offsetLeft
		}		
		this.plane_size = {
			width : this.plane.offsetWidth,
			height : this.plane.offsetHeight,
		}
		on(document , "mousemove" , this.move.bind(this));
	}
	move(evt){
		let e = evt || window.event;
		Plane.x = e.clientX -this.plane_size.width /2 ;
		Plane.y = e.clientY - this.plane_size.height /2;
		//move之前进行边界检测
		let {x,y} = this.boundary(Plane.x,Plane.y);
		Plane.x = x ;
		Plane.y = y;
		this.plane.style.left = x + "px";
		this.plane.style.top = y + "px";

	}
	boundary(x,y){
		let minX = this.main_size.left ;
		let maxX = this.main_size.left + this.main_size.width - this.plane_size.width;
		x = x < minX ? minX : x ;
		x = x > maxX ? maxX : x ;
		let maxY = this.main_size.height - this.plane_size.height;
		y = y < 0 ? 0 : y ;
		y = y > maxY ? maxY : y;
		
		return{
			x,
			y
		}	
	}
	//创建我方飞机
	createPlane(){
		let ele = document.createElement("div");
		ele.className = "plane";
		document.body.appendChild(ele);
		ele.style.left = parseInt(document.documentElement.clientWidth /2 - ele.offsetWidth /2) + "px" ;
		Plane.x = ele.offsetLeft;
		Plane.y = ele.offsetTop;

		return ele;
	}
	fire(){
		let level = 200;
		switch (Game.game_level){
			case 0:
				level = 300;
				break;
			case 1:
				level = 200;
				break;
			case 2:
				level = 150;
				break;
			case 3:
				level = 100;
				break;		
		}
		setInterval( () => {
			new Bullet();		
		},level); 
	}
	
	static x ;
	static y ;
	static planeWidth;
}


//创建子弹(火药)
/**
 * 创建子弹元素，把元素添加到屏幕；
 * 创建用来存放子弹的数组，只需要创建一次
 * 创建一个定时器来控制所有的子弹移动，保证定时器只有一个；
 * 创建子弹爆炸函数，判断死亡条件
 */

class Bullet{
	
	constructor(arg) {
		this.speed = 10;
		
		if(Bullet.bullet_timer === undefined){
			Bullet.bullet_timer = setInterval( () => {
				this.bulletMove();
			}, 50 )
		}
		if(Bullet.bullet_list === undefined){
			Bullet.bullet_list = []
		}
	    this.init();
	}
	init(){
		let ele = this.createBullet();
		
		if(Bullet.bullet_size === undefined){
			Bullet.bullet_size = {
				width : ele.offsetWidth,
				height : ele.offsetHeight
			}
		}
		
	}
	createBullet(){
		let bullet = document.createElement("div");
		bullet.classList = "bullet";
		document.body.appendChild(bullet);
		let left = Plane.x + Plane.planeWidth /2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : bullet.offsetWidth/2) ;
		bullet.style.left = left + "px";
		bullet.style.top = Plane.y + "px";
				
		Bullet.bullet_list.push({
			bullet,
			left,
			top : Plane.y,
			die : this.bulletDie.bind(this)
		});
		return bullet;
	}
	bulletMove(){
		for(let attr in Bullet.bullet_list){
			let bt = Bullet.bullet_list[attr];
			bt.top -= this.speed ;
			bt.bullet.style.top = bt.top + "px";
			
			if(bt.top <= 0){
				this.bulletDie(bt);
			}
		}
	}
	bulletDie(bt){
		let index = Bullet.bullet_list.indexOf(bt);
		Bullet.bullet_list.splice(index,1);	
		bt.bullet.className += " die";
		setTimeout( () => {	
			bt.bullet.remove();
		}, 500)		
	}
	
	static bullet_size;
	static bullet_timer;
	static bullet_list;
}

//创建敌方飞机
/**
 * 1.敌方飞机由三种类型，每种类型的类名、血量、速度和死亡方式不同，创建对象存储这些内容；
 * 2.分别创建用来存放敌军飞机数据的数组和用来控制所有敌方飞机移动的定时器，这两个变量都要求只能创建一次；
 * 3.每当类初始化时，根据构造函数的参数，在敌方类型中寻找合适数据，获取存到data里
 * 4.初始化函数init中调用创建敌方飞机的函数，该函数根据data的数据创建敌军飞机放到屏幕里
 * 5.定时器调用的移动函数，通过循环移动飞机列表中所有的飞机。判断死亡条件，调用飞机死亡函数；
 */
class Enemy{
	constructor(enemy_type) {
	    this.main = $(".main");
		this.main_size = {
			width : this.main.offsetWidth,
			height : this.main.offsetHeight,
			left : this.main.offsetLeft
		}
		Enemy.enemy_list ? "" : Enemy.enemy_list = [];
		Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( () => {
			this.enemyMove();
			this.collisionDetection();
		},100)
		
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
		// console.log(this.enemy_data);
		let ele = document.createElement("div");
		ele.className = this.enemy_data.className ;
		document.body.appendChild(ele);
		ele.style.left = Enemy.randomLeft(this.main_size.left + this.main_size.width -ele.offsetWidth , this.main_size.left) + "px";
		ele.style.top = 0;
		
		Enemy.enemy_list.push({
			ele,
			left : ele.offsetLeft,
			top : ele.offsetTop,
			width : ele.offsetWidth,
			height : ele.offsetHeight,
			hp : this.enemy_data.hp,
			speed : this.enemy_data.speed,
			die : this.enemyDie.bind(this)
		})
		
	}
	enemyMove(){
		for(var attr in Enemy.enemy_list){
			let enemy = Enemy.enemy_list[attr];
			enemy.top += enemy.speed;
			enemy.ele.style.top = enemy.top + "px";
			
			if(enemy.top >= this.main_size.height - 100){
				this.enemyDie(enemy);
			}
		}
	}	
	enemyDie(enemy){
		let index = Enemy.enemy_list.indexOf(enemy);
		Enemy.enemy_list.splice(index,1);
		enemy.ele.className += " die"
		setTimeout( () => {
			enemy.ele.remove();
		},1000)
	}
	collisionDetection(){
		console.log(1);
		let enemies = Enemy.enemy_list;
		let bullets = Bullet.bullet_list;
		for(let i=0 ,enemy ; enemy = enemies[i++];){
			for(let j=0 ,bullet ; bullet = bullets[j++];){
				// console.log(this.collisionLeft(enemy,bullet),this.collisionTop(enemy,bullet) );
				if( this.collisionLeft(enemy,bullet) ){
					if( this.collisionTop(enemy,bullet) ){
						bullet.die(bullet);
						enemy.hp --;
						if(enemy.hp === 0){
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
	collisionTop(enemy,bullet){
		return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
	}
	static createRandomEnemy(){
		let count = 0;
		setInterval( () => {
			count ++ ;
			Math.random() > 0.5 ? new Enemy() : "";
			count % 5 === 0 ?  (Math.random() < 0.8 ? new Enemy("middle"):"" ): "";
			count % 10 === 0 ?  (Math.random() < 0.9 ? new Enemy("large"):"" ): "";

		},1000)
	}
	
	static randomLeft(max , min){
		return min + Math.round(Math.random() * (max - min));
	}
	
	static enemy_timer;
	static enemy_list;
}

//---------------------------------
new Game();
let my_plane = new Plane();