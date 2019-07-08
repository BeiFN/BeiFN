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
		this.hardLevel =0; 
		this.init();
	 }
	init(){
		 // 绑定事件: 给选项“按钮”绑定事件
		on(this.option,"click",this.hanlderClick.bind(this));
	}
	// 点击处理函数:处理耦合关系;记录当前元素的下标;简单委托;
	hanlderClick(evt){
		let e      = evt || window.event;
		let target = e.target || e.srcElement;
		// 参数判断：如果没选择选项，返回false
		if (target.nodeName !== "P" ) {
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
		},1000)
	}
	// 获取难度选择的下标
	setHardLevel(target){
		this.hardLevel = Array.from(target.parentNode.children).indexOf(target); this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
	}	
	// 清场
    clearAll(){
		clearInterval(this.loading);
		this.option ? this.option.remove() : "" ;
		this.logo ? this.logo.remove() : "" ;
		this.plane_loading ? this.plane_loading.remove() : "";
	}  
	// 显示
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
			positionY = positionY + speed ;
			this.main.style.backgroundPositionY = positionY + "px" ;  // 性能优化
		},50)
	}
	// 游戏开始
	gameStart(){
		plane.init();
	}
	// 创建元素
	static createEle(className){
		let ele       = document.createElement("div");
		ele.className = className;
		document.body.appendChild(ele);
		return ele;
	}
}

// 游戏者的飞机
class Plane{
       constructor(){
		   
       }
	   // 初始化函数
       init(){
            this.ele = this.createPlane();
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
            // 1. 创建元素并放入页面之中;
            on(document , "mousemove" , this.planeMove.bind(this));
            // 返回实例对象操作，实际上是用于连缀的;
            return this;
       }
	   // 飞机移动的函数
       planeMove(evt){  
            let e = evt || window.event;
           
            let { x , y } = this.boundary( e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
            Plane.x = x;
            Plane.y = y;
            this.ele.style.left = x + "px";
            this.ele.style.top  = y + "px";
       }
	   // 飞机移动位置的边界检测函数
       boundary(x,y){
            let minX =  this.mainSize.left;
            let maxX =  this.mainSize.left + this.mainSize.width - this.eleSize.width ;
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;

            y = y < 0 ? 0 : y;
            return {
                  x ,
                  y 
            }
       }
	   // 创建飞机
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
		// 开火
       fire(){
			// 根据不同的选项模式，确定不同的子弹发射频率
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
			// 设置定时器，创建子弹
             setInterval( ()=>{
                   new Bullet();
             } , frequency)
       }
		// 一些公用变量
       static x ;
       static y ;
       static plane_size;
 }
 
 // 子弹
 class Bullet{    
      constructor(){
            this.speed = 20;
            // 确保只创建一个子弹运动定时器;
            if(Bullet.bullet_timer === undefined){
                  Bullet.bullet_timer = setInterval( ()=> {
                       this.bulletMove();
                  },50)
            }
            // 确保只创建一个子弹列表;
            if(Bullet.bullet_list === undefined){
                  Bullet.bullet_list = [];
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
	  // 创建子弹
      createBullet(){
		    // 创建子弹
            let ele = document.createElement("div");
            ele.className = "bullet";
            document.body.appendChild(ele);
			// 设置子弹的位置
            let left =  Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
            let top = Plane.y;
			// 把子弹加入子弹列表并呈现在界面中
            Bullet.bullet_list.push({
                  ele ,
                  left,
                  top , 
                  die : this.bulletDie.bind(this)
            })
            return ele;
      }
		// 子弹移动
      bulletMove(){
            // console.log("让所有的子弹运动");
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
	  // 子弹消失
      bulletDie(bullet){
            let index = Bullet.bullet_list.indexOf(bullet);
            Bullet.bullet_list.splice(index,1);
			// 设置子弹消失的动画效果
            bullet.ele.className += " die";
            // 等待动画完成;
            setTimeout( ()=>{
                  bullet.ele.remove();
                  bullet = false;// 清除引用;
            },500)    
      }
		// 一些公用变量
      static bullet_timer;
      static bullet_list;
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
                  // 敌机移动
				  this.enemyMove();
                  //碰撞检测;
                  this.collisionDetection()
            },50);
			// 策略模式
            Enemy.enemy_list ? "" : Enemy.enemy_list = [];
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
	   // 创建敌机
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
	   // 敌机移动
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
	   // 敌机消亡
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
					
					
					
					
					

 
 