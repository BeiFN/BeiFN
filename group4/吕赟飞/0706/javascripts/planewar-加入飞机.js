/**
 * 1. 核心部分 => 难度选择，开场动画，计分，暂停...
 * 2. 飞机     => 跟随移动
 * 3. 子弹     => 飞行移动 , 和敌机的交互(击落)
 * 4. 敌机     => 分类 , 小中大。
 * 
 *  */ 

let { $ , on } = Utils;

 // 核心部分;
 // 1. logo入场 ;
 // 2. 飞机动画 ;
 // 3. 背景运动 ;

 class Core{
      constructor(){
            // 核心元素;
            this.option = $(".options");
            this.main   = $(".main");
            // 难度等级
            this.hardLevel = 0;
            // 初始化功能;
            this.init();
      }
      init(){
            // 绑定事件;
            on(this.option , "click" , this.hanlderClick.bind(this));
      }
      hanlderClick(evt){
            // 处理耦合关系;
            // 记录当前元素的下标;
            // 简单委托;
            let e = evt || window.event;
            let target = e.target || e.srcElement;
            if(target.nodeName !== "P") return false;
            // 获取下标;
            this.setHardLevel(target);
            // 清场;
            this.clearAll();
            // 显示logo;
            this.showAll();
            // 显示飞机动画;  
            this.animate();
            setTimeout( () => {
                  this.clearAll();
                  this.gameStart();
            } , 1000)
      }
      clearAll(){
            this.option ? this.option.remove() :"";
            clearInterval(this.loading);
            this.logo? this.logo.remove() : "";
            this.plane_loading? this.plane_loading.remove(): "";
      }
      setHardLevel(target){
            this.hardLevel = Array.from(target.parentNode.children).indexOf(target);
      }
      showAll(){
            this.logo = Core.createEle("logo");
            this.plane_loading = Core.createEle("plane-loading");
      }
      animate(){
            let index = 0;
            this.loading = setInterval( ()=>{
                  // console.log(this)  => 实例对象;
                  this.plane_loading.style.backgroundImage = `url(./images/loading${++index % 3 + 1}.png)`;
            } , 800)

            let positionY = 0;
            let speed     = 5;

            switch(this.hardLevel){
                  case 0 : speed = 20;break;
                  case 1 : speed = 8;break;
                  case 2 : speed = 5;break;
                  case 3 : speed = 20;break;
            }

            this.bg_moving = setInterval( ()=>{
                  positionY += speed;
                  this.main.style.backgroundPositionY = positionY + "px";
            } , 50)
      }
      gameStart(){
            // 游戏开始了;
            // console.log("let's start");
            plane.init();
      }

      static createEle(className){
            let   ele = document.createElement("div");
                  ele.className = className;
                  document.body.appendChild(ele);
                  return ele;
      }
 }

// 功能调用;
 class Plane{
       constructor(){

       }
       init(){
            this.ele = this.createPlane();
            this.main = $(".main");
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
       }
       planeMove(evt){  
            let e = evt || window.event;
           
            let { x , y } = this.boundary( e.clientX - this.eleSize.width / 2 , e.clientY - this.eleSize.height / 2);
            
            this.ele.style.left = x + "px";
            this.ele.style.top  = y + "px";
       }
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
       createPlane(){
            let ele = document.createElement("div");
            let cWidth = document.documentElement.clientWidth;
            ele.className = "plane";
            ele.style.cursor = "none";
            document.body.appendChild(ele);
            ele.style.left = cWidth/2 - ele.offsetWidth / 2 + "px";
            return ele;
       }
 }

 new Core();
 let plane =  new Plane();
