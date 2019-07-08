 // 计分    暂停

 let {
     $,
     on
 } = Public;

 class Core {
     constructor() {
         this.main = $(".main");
         Core.main_size = {
             //  width: this.main.offsetWidth
             //  left: this.main.offsetLeft,
         }
         this.option = $(".options");
         this.init();
     }

     init() {
         on(this.option, "click", this.handlerClick.bind(this));
     }

     handlerClick(evt) {
         let e = evt || event;
         let target = e.target || e.srcElement;
         if (target.nodeName !== "P") return false;
         this.setHardLevel(target);
         this.clearAll();
         this.showAll();
         this.animate();
         setTimeout(() => {
             this.clearAll();
             this.gameStart();
         }, 1000);
     }

     setHardLevel(target) {
         Core.hard_level = Array.from(this.option.children).indexOf(target);
     }

     clearAll() {
         this.option ? this.option.remove() : "";
         clearInterval(this.loading);
         this.logo ? this.logo.remove() : "";
         this.plane_loading ? this.plane_loading.remove() : "";
     }

     showAll() {
         this.logo = Core.createEle("logo");
         this.plane_loading = Core.createEle("plane-loading");
     }

     animate() {
         let index = 1;
         this.loading = setInterval(() => {
             this.plane_loading.style.backgroundImage = `url(../课件/images/loading${index++ % 3 + 1}.png)`;
         }, 500); // 计时器也需要在页面加载完成后等这个时间以后才执行第一次。
         let position_y = 0; // 考虑一下游戏在这里是否需要背景加速移动
         let speed = 5;
         switch (Core.hard_level) {
             case 0:
                 speed = 20;
                 break;
             case 1:
                 speed = 8;
                 break;
             case 2:
                 speed = 5;
                 break;
             case 3:
                 speed = 20;
                 break;
         }
         this.bg_moving = setInterval(() => {
             position_y += speed;
             this.main.style.backgroundPositionY = position_y + "px";
         }, 50);
     }

     gameStart() {
         new Plane();
         //  Enemy.enemyCreater();
     }

     static createEle(className) {
         let ele = document.createElement("div");
         ele.className = className;
         document.body.appendChild(ele);
         return ele;
     }

     static hard_level;
     static main_size;
 }

 class Plane {
     constructor() {
         this.ele = Core.createEle("plane");
         let c_width = document.documentElement.clientWidth;
         Plane.ele_size = {
             width: this.ele.offsetWidth,
             height: this.ele.offsetHeight, // 都有用吗？
             x: "",
             y: ""
         }
         this.init();
     }
     init() {
         this.ele.style.left = (c_width - this.ele.offsetWidth) / 2 + "px"; // 考虑一下是否可以直接获取到鼠标的点
         on(document, "mousemove", this.planeMove.bind(this));


     }

     planeMove(evt) {
         let e = evt || event;
         let {x, y} = this.boundary(e.clientX - Plane.ele_size.width / 2, e.clientY - Plane.ele_size.height / 2);
         Plane.ele_size.x = x;
         Plane.ele_size.y = y;
         this.ele.style.left = x + "px";
         this.ele.style.top = y + "px";
     }

     boundary(x, y) {
        let min_x = this.mainSize.left;
        let mai_y = this.mainsi
     }

     static ele_size; // 别的地方能用到吗？
 }

 new Core();
 //  let plane = new Plane();