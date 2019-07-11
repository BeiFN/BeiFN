/**
 * 1.核心部分 => 难度选择，开场动画，计分，暂停
 * 2.飞机    =>  跟随移动
 * 3.子弹    => 飞行移动，和敌机的交互(击落)
 * 4.敌机	=> 
 * */
 
 // 变量区
 let { $ , on } = Utils;
 
 //核心部分:
 // 1.logo入场
 // 2.飞机动画
 // 3.背景运动
 
 // 主题框架
class Core{
	constructor(){
		this.main      = $(".main");
		this.option    = $(".options");
		// this.hardLevel =0; 
		this.init();
	 }
	init(){
		 // 绑定事件: 给选项“按钮”--this.option绑定事件
		on(this.option,"click",this.hanlderClick.bind(this));
	}
	// 点击处理函数:处理耦合关系;记录当前元素的下标;简单委托;
	hanlderClick(evt){
		let e      = evt || window.event;
		let target = e.target || e.srcElement;
		// 参数判断：如果没选择选项，返回false
		if (target.nodeName !== "P" ) {		// "P"一定要大写！！! nodeName
			return false;
		}   
		// 获取下标  --- 封装一下
		this.setHardLevel(target);
		//  开始三步：1.logo入场
		// 清场;
		this.clearAll();
		// 显示logo;
		this.showAll();  
		// 显示飞机动画;
		this.animate();
		// 延迟1s后游戏开始
		setTimeout( () => {
			this.clearAll();
			this.gameStart();
		},1000)		// 这里的延迟事件和点击选项“按钮”后，我的飞机的背景加载时间有关系：>= 3倍
	}
	// 获取难度选择的下标
	setHardLevel(target){
		this.hardLevel = Array.from(target.parentNode.children).indexOf(target); 
	}	
    clearAll(){
		this.option ? this.option.remove() : "" ;
		this.logo ? this.logo.remove() : "" ;
		clearInterval(this.loading);
		this.plane_loading ? this.plane_loading.remove() : "";
	}  
	showAll(){
		this.logo          = Core.createEle("logo");
		this.plane_loading = Core.createEle("plane-loading");
	}
	// this.loading 开定时器来运动，箭头函数，设置背景图片 index%3+1 实现运动
	animate(){
		let index = 0 ;
		// 游戏加载背景图片
		this.loading = setInterval( () => {
			this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
		},300)
		
		let positionY = 0;
		let speed = 5;
		// 不同选项对应不同的难度
		switch(this.hardLevel){
			case 0 : speed = 20 ; break ;
			case 1 : speed = 12 ; break ;
			case 2 : speed = 8 ; break ;
			case 3 : speed = 20 ; break ;
		}
		// 背景的移动
		this.bg_moving = setInterval( () => {
			positionY += speed ;
			this.main.style.backgroundPositionY = positionY + "px" ;  // 性能优化
		},50)
	}
	gameStart(){
		plane.init().fire();	// Core和Plane的耦合  // fire
		Enemy.enemyCreater();  // Core和Enemy的耦合
	}
	static createEle(className){
		let ele       = document.createElement("div");
		ele.className = className;
		document.body.appendChild(ele);
		return ele;
	}
	static hardLevel;
}


class Plane{
	constructor(){

	}
	init(){
		this.ele  = this.createPlane();
		this.main = $(".main");
		this.main_size = {
			left : this.main.offsetLeft,
			width : this.main.offsetWidth
		};
		this.ele_size = {
			height : this.ele.offsetHeight,
			width : this.ele.offsetWidth
		};
		Plane.plane_size = {
			width : this.ele.offsetWidth
		}
		// 绑定事件
		on(document, "mousemove" , this.planeMove.bind(this));
		// 返回实例是用于连缀的
		return this;
	}
	createPlane(){
		let ele = document.createElement("div");
		let cWidth = document.documentElement.clientWidth;
		ele.className = "plane";
		ele.style.cursor = "none";
		document.body.appendChild(ele);
		// 先页面中加入元素，之后再去设置ele的left
		ele.style.left = cWidth/2 - ele.offsetWidth/2 + "px";
		// 获取飞机的宽高
		Plane.x = ele.offsetLeft;
		Plane.y = ele.offsetTop;
		return ele;
	}
	planeMove(evt){
		let e = evt || window.event ;
		
		let { x, y } = this.boundary(e.clientX - this.ele_size.width/2,e.clientY - this.ele_size.height/2);
		//取得飞机的宽高
		Plane.x = x;
		Plane.y = y;
		this.ele.style.left = x + "px";
		this.ele.style.top  = y + "px";
	}
	boundary(x, y){
		let minX = this.main_size.left;
		let maxX = this.main_size.left + this.main_size.width - this.ele_size.width;
		x = x <= minX ? minX : x;
		x = x >= maxX ? maxX : x;
		y = y <= 0 ? 0 : y;
		return {
			x,
			y
		}
	}
	// Plan和Bullet的耦合关系
	fire(){
		let frameTime = 100 ;
		switch(Core.hardLevel){  
			case 0: frameTime = 500 ; break ; //frameTime越大，每秒创建的子弹数目越少
			case 1: frameTime = 300 ; break ;
			case 2: frameTime = 200 ; break ;
			case 3: frameTime = 100 ; break ;
		}
		setInterval( () => {
			new Bullet();	// 根据框架里的模式，与飞机运动的同时创建对应不同模式的子弹数量
		} , frameTime) ;
	}
	
	// Bullet 中用到的几个变量
	static x;
	static y;
	static plane_size;
}


// 单计时器子弹
class Bullet{
	constructor() {
		this.speed = 20;  // 速度
		// 确保只开启一个定时器
		if ( Bullet.bullet_timer === undefined ) {
			Bullet.bullet_timer = setInterval( () => {
				this.bulletMove();
			} , 50 )
		}
		// 确保只创建一个子弹列表
		if ( Bullet.bullet_list === undefined ) {
			Bullet.bullet_list = [] ;
		}
	    this.init();
	}
	init(){
		let ele = this.createBullet();
		//
		if ( Bullet.bullet_size === undefined ) {
			Bullet.bullet_size = {
				width : ele.offsetWidth,
				height : ele.offsetWidth
			}
		}
	}
	// 创造子弹
	createBullet(){
		let ele = document.createElement("div");
		ele.className = "bullet";
		document.body.appendChild(ele);
		// 子弹的left、top数值
		let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;
		// 存储每一个子弹的相关信息，并push其到子弹列表之中
		Bullet.bullet_list.push({
			ele,
			left,
			top,
			die : this.bulletDie.bind(this)  // 子弹消亡时可以对其操作
		})
		return ele;
	}
	// 子弹运动
	bulletMove(){	
		for (let single in Bullet.bullet_list) {
			let bullet = Bullet.bullet_list[single];
			// 判断子弹消亡时刻
			if ( bullet.top <= -20 ) {
				this.bulletDie(bullet);
				continue;
			}
			//
			bullet.ele.setAttribute( "data" , "move" ); // 
			bullet.top -= this.speed;
			bullet.ele.style.top = bullet.top + "px";
			bullet.ele.style.left = bullet.left + "px";
		}
	}
	// 子弹消亡
	bulletDie(bullet){
		let index = Bullet.bullet_list.indexOf(bullet);
		Bullet.bullet_list.splice(index,1);
		bullet.ele.className += "die"; // CSS中动画运行时间是0.5s
		// 等待(setTimeOut)动画完成后
		setTimeout( () => {
			bullet.ele.remove();
			bullet = false; 	// 清除引用
		} , 500)	// 500ms
	}
	
	// 几个变量
	static bullet_timer;
	static bullet_list;
	static bullet_size;
}

// 敌机
class Enemy{
	constructor(enemy_type) {	// 参数代表不同型号的敌机
		this.main = $(".main");
		this.main_size = {
			width : this.main.offsetWidth,
			height : this.main.offsetHeight,
			left : this.main.offsetLeft
		}
	    // 确保只开启一个定时器
		Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( () => {
			this.enemyMove();
			// 碰撞检测
			this.collisionDetection();
		} , 50) 
		// 确保只创建一个敌机列表
		Enemy.enemy_list ? "" :  Enemy.enemy_list = [] ;
		// 判断传入的参数类型是否为空，并设置默认参数
		enemy_type = enemy_type ? enemy_type : "small";
		// 对于不同的大、中、小敌机，它们的不同之处在于：
		// 1. className     不同;
		// 2. speed         不同;
		// 3. hp            不同;
		// 4. die className 不同;
		this.enemies = {
			"small" : {
				className : "enemy-small",
				speed : 10,
				hp : 1,
				dieClassName : "enemy-small-die"	//enemy-small.die
			} ,
			"middle" : {
				className : "enemy-middle",
				speed : 5,
				hp : 5,
				dieClassName : "enemy-middle-die"
			} ,
			"large" : {
				className : "enemy-large",
				speed : 3,
				hp : 20,
				dieClassName : "enemy-large-die"
			}
		}
		//
		this.enemy_data = this.enemies[enemy_type];
		this.init();
	}
	init(){
		this.createEnemy();
	}
	createEnemy(){
		let ele = document.createElement("div");
		ele.className =  this.enemy_data.className;
		document.body.appendChild(ele);
		
		Enemy.enemy_list.push({
			ele,
			hp : this.enemy_data.hp,
			left : Enemy.randomLeft(this.main_size.left , this.main_size.left + this.main_size.width - ele.offsetWidth ),
            top : 0 ,
			speed : this.enemy_data.speed,
			width : ele.offsetWidth ,
			height : ele.offsetHeight ,
			die : this.enemyDie.bind(this)
		})
	}
	static randomLeft(min, max){
		return min + Math.round(Math.random*(max-min));
	}
	enemyMove(){
		for (let single in Enemy.enemy_list) {
			let enemy = Enemy.enemy_list[single];
			enemy.top += enemy.speed;
			if ( enemy.top >= this.main_size.height - 50) {
				this.enemyDie(enemy);
				continue;
			}
			enemy.ele.style.top = enemy.top + "px";
			enemy.ele.style.left = enemy.left + "px";
		}
	}
	enemyDie(enemy){
		let index = Enemy.enemy_list.indexOf(enemy);
		Enemy.enemy_list.splice(index, 1);
		enemy.ele.className += " die";
		//等待敌机消亡的动画完成后，删除元素
		setTimeout( () => {
			enemy.ele.remove();
			//enemy = false; // 清除引用
		},1000)	
	}
	collisionDetection(){
		let bullets = Bullet.bullet_list ;
		let enemies = Enemy.enemy_list ;
		for (let i = 0 , bullet ; bullet = bullets[i] ; i ++ ) {
			for (let j = 0, enemy ; enemy = enemies[j] ; j++ ) {
				if ( this.collisionLeft( bullet ,enemy ) ) {
					if ( this.collisionTop( bullet, enemy) ) {
						bullet.die(bullet);
						enemy.hp--;
						if(enemy.hp <= 0){
							enemy.die(enemy);
						}
					}
				}
			}
		}
	}
	collisionLeft( bullet , enemy ){
		return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width ;
	}
	collisionTop( bullet , enemy ){
		return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
	}
	static enemyCreater() {
		let count = 0;
		setInterval( ()=> {
			count ++ ;
			Math.random() > 0.5 ? new Enemy() : "";
			count % 5 === 0 ?  ( Math.random() < 0.8  ? new Enemy("middle")  : "") : "";
			count % 10 === 0 ?  ( Math.random() < 0.9  ? new Enemy("large") : "") : "";
		}, 1000)
	}
	// 几个变量
	static enemy_timer;
	static enemy_list;
	static enemy_size;
}

new Core();
let plane = new Plane(); 








 
		
		
		
		
		
		
		
		
		
		
		// 
		// 		   // gameStart();	
		// 		   new Plan(){
		// 			   constructor(){
		// 				   
		// 			   }
		// 			   init(){
		// 				   //创建元素并放入页面
		// 				   on( document, )
		// 						// creatPlan
		// 			   }
		// 			   createPlan(){
		// 				   //  
		// 					// css中只设置bottom=0的关于位置的属性
		// 					// 渲染之后 JS定位 居中
		// 					return ele;
		// 			   }  //  
		// 			  planMove() 
		// 					//提取出 this.eleSize={ }
		// 					// createPlan 鼠标变为手型
		// 					// 给其加入边界检测  
		// 					= this.boundry;
		// 					
		// 			boundry(){
		// 					// 去选中主题元素 $(.main)
		// 					// 设置大小  mainSize={ }  不要用offset，耗性能
		// 					return {
		// 						x,	// ES6简写
		// 						y
		// 					}
		// 						
		// 			}
					
					// --------- 下一步打子弹，类似烟花效果
					
					
					
					
					

 
 