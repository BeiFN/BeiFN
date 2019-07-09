 // 计分    暂停

 let {
     $,
     on
 } = Public;

 class Core {
     constructor() {
         this.main = $(".main");
         Core.main_size = {
             left: this.main.offsetLeft,
             width: this.main.offsetWidth,
             height: this.main.offsetHeight
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
         this.clearFirst();
         this.showAll();
         this.animate();
         setTimeout(() => {
             this.clearSecond();
             this.gameStart();
         }, 1000);
     }

     setHardLevel(target) {
         Core.hard_level = Array.from(this.option.children).indexOf(target);
     }

     clearFirst() {
         this.option.remove();
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
         let position_y = 0;
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
         setInterval(() => {
             position_y += speed;
             this.main.style.backgroundPositionY = position_y + "px";
         }, 50);
     }

     clearSecond() {
         clearInterval(this.loading);
         this.logo.remove();
         this.plane_loading.remove();
     }

     gameStart() {
         new Plane();
         Enemy.enemyCreate();
     }

     static createEle(class_name) {
         let ele = document.createElement("div");
         ele.className = class_name;
         document.body.appendChild(ele);
         return ele;
     }

     static main_size;
     static hard_level;
 }

 class Plane {
     constructor() {
         this.plane_ele = this.createPlane();
         Plane.plane_attr = {
             width: this.plane_ele.offsetWidth,
             height: this.plane_ele.offsetHeight,
             left: this.plane_ele.offsetLeft,
             top: this.plane_ele.offsetTop
         }
         this.init();
     }

     init() {
         this.fire();
         on(document, "mousemove", this.planeMove.bind(this));
     }

     createPlane() {
         let plane_ele = Core.createEle("plane");
         let c_width = document.documentElement.clientWidth;
         plane_ele.style.left = (c_width - plane_ele.offsetWidth) / 2 + "px"; // 考虑一下是否可以直接获取到鼠标的点,好像没办法
         return plane_ele;
     }

     planeMove(evt) {
         let e = evt || event;
         let {
             x,
             y
         } = this.boundary(e.clientX - Plane.plane_attr.width / 2, e.clientY - Plane.plane_attr.height / 2);
         Plane.plane_attr.left = x;
         Plane.plane_attr.top = y;
         this.plane_ele.style.left = x + "px";
         this.plane_ele.style.top = y + "px";
     }

     boundary(x, y) {
         let min_x = Core.main_size.left;
         let max_x = Core.main_size.left + Core.main_size.width - Plane.plane_attr.width;
         x = x < min_x ? min_x : x;
         x = x > max_x ? max_x : x;
         y = y < 0 ? 0 : y;
         return {
             x,
             y
         };
     }

     fire() {
         let frequency = 100;
         switch (Core.hard_level) {
             case 0:
                 frequency = 1000;
                 break;
             case 1:
                 frequency = 300;
                 break;
             case 2:
                 frequency = 200;
                 break;
             case 3:
                 frequency = 100;
                 break;
         }
         setInterval(() => {
             new Bullet();
         }, frequency);
     }

     static plane_attr;
 }

 class Bullet {
     constructor() {
         Bullet.bullet_list ? "" : Bullet.bullet_list = [];
         let bullet_ele = this.createBullet();
         Bullet.bullet_size ? "" : Bullet.bullet_size = {
             width: bullet_ele.offsetWidth,
             height: bullet_ele.offsetHeight
         }
         this.speed = 20;
         this.init();
     }

     init() {
         Bullet.bullet_timer ? "" : Bullet.bullet_timer = setInterval(() => {
             this.bulletMove();
         }, 50);
     }

     createBullet() {
         let ele = Core.createEle("bullet");
         let left = Plane.plane_attr.left + (Plane.plane_attr.width - (Bullet.bullet_size ? Bullet.bullet_size.width : ele.offsetWidth)) / 2;
         ele.style.left = left + "px";
         let top = Plane.plane_attr.top;
         ele.style.top = top + "px";
         Bullet.bullet_list.push({
             ele,
             left,
             top,
             die: Bullet.eleDie
         });
         return ele;
     }

     bulletMove() {
         for (let attr in Bullet.bullet_list) {
             let bullet = Bullet.bullet_list[attr];
             if (bullet.top <= -40) {
                 Bullet.eleDie(Bullet.bullet_list, bullet);
                 continue;
             }
             bullet.top -= this.speed;
             bullet.ele.style.top = bullet.top + "px";
         }
     }

     static eleDie(ele_list, ele) {
         let index = ele_list.indexOf(ele);
         ele_list.splice(index, 1);
         ele.ele.className += " die";
         setTimeout(() => {
             ele.ele.remove();
             ele = false;
         }, 1000);
     }

     static bullet_size;
     static bullet_list;
     static bullet_timer;
 }

 class Enemy {
     constructor(enemy_type) {
         Enemy.enemy_list ? "" : Enemy.enemy_list = [];
         this.enemies = {
             "small": {
                 className: "enemy-small",
                 speed: 10,
                 hp: 2,
                 dieClassName: "enemy-small-die"
             },
             "middle": {
                 className: "enemy-middle",
                 speed: 5,
                 hp: 4,
                 dieClassName: "enemy-middle-die"
             },
             "large": {
                 className: "enemy-large",
                 speed: 1,
                 hp: 8,
                 dieClassName: "enemy-large-die"
             }
         }
         this.enemy_data = this.enemies[enemy_type];
         this.init();
     }

     init() {
         this.createEnemy();
         Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(() => {
             this.enemyMove();
             this.collisionDetection();
         }, 50);
     }

     createEnemy() {
         let ele = Core.createEle(this.enemy_data.className);
         let left = Enemy.randomLeft(Core.main_size.left, Core.main_size.left + Core.main_size.width - ele.offsetWidth);
         ele.style.left = left + "px";
         let top = 0;
         ele.style.top = top + "px";
         Enemy.enemy_list.push({
             ele,
             hp: this.enemy_data.hp,
             left,
             top,
             speed: this.enemy_data.speed,
             width: ele.offsetWidth,
             height: ele.offsetHeight,
             die: Bullet.eleDie
         })
     }

     enemyMove() {
         for (let attr in Enemy.enemy_list) {
             let enemy = Enemy.enemy_list[attr];
             enemy.top += enemy.speed;
             if (enemy.top >= Core.main_size.height - 50) {
                 Bullet.eleDie(Enemy.enemy_list, enemy);
                 continue;
             }
             enemy.ele.style.top = enemy.top + "px";
             enemy.ele.style.left = enemy.left + "px";
         }
     }

     collisionDetection() {
         for (let i = 0, bullet; bullet = Bullet.bullet_list[i++];) {
             for (let j = 0, enemy; enemy = Enemy.enemy_list[j++];) {
                 if (this.collisionLeft(enemy, bullet)) {
                     if (this.collisionTop(enemy, bullet)) {
                         bullet.die(Bullet.bullet_list, bullet);
                         enemy.hp--;
                         if (enemy.hp <= 0) {
                             bullet.die(Enemy.enemy_list, enemy);
                         }
                     }
                 }
             }
         }
     }

     collisionLeft(enemy, bullet) {
         return enemy.left < bullet.left + Bullet.bullet_size.width && enemy.left + enemy.width > bullet.left;
     }

     collisionTop(enemy, bullet) {
         return enemy.top < bullet.top + Bullet.bullet_size.height && enemy.top + enemy.height > bullet.top;
     }

     static randomLeft(min, max) {
         return min + parseInt(Math.random() * (max - min) + 1);
     }

     static enemyCreate() {
         let count = 0;
         setInterval(() => {
             count++;
             Math.random() > 0.5 ? new Enemy("small") : "";
             count % 5 === 0 ? (Math.random() < 0.5 ? new Enemy("middle") : "") : "";
             count % 10 === 0 ? (Math.random() < 0.5 ? new Enemy("large") : "") : "";
         }, 1000);
     }

     static enemy_list;
     static enemy_timer;
 }

 new Core();