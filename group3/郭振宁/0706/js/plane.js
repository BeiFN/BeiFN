/*
*   哈哈
*   呵呵
*   咚咚
*   咔咔
*/

class Utils {
    static $(selector) {
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }
}

let { $ } = Utils;

class Core {
    constructor() {
        this.main = $(".main");
        this.option = $(".options");
        
        this.init();
    }
    init() {
        this.option.addEventListener("click" , this.handlerClick.bind(this));
    }
    handlerClick(evt) {
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;
        this.setHardLever(target);
        this.clearAll();
        this.show();
        this.planLoading();
        setTimeout(() => {
            this.clearAll();
            new Plane();
        }, 1000)
    }
    setHardLever(target) {
        Core.hardlevel = Array.from(target.parentNode.children).indexOf(target);
        console.log(Core.hardlevel);
    }
    clearAll() {
        this.option.remove();
        this.logo ? this.logo.remove() : "";
        this.logo_loading ? this.logo_loading.remove() : "";
    }
    show() {
        this.logo = Core.createElement("logo");
        this.logo_loading = Core.createElement("logo-loading");
    }
    static createElement(className) {
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    planLoading() {
        let n = 1;
        this.loading_timer = setInterval(() => {
            this.logo_loading.style.backgroundImage = `url(./images/loading${n++ % 3 + 1}.png)`;
        },500)

        let positionY = 0;
        let speed = 0;
        switch(Core.hardlevel) {
            case 0 : {
                speed = 20;
            };break;
            case 1 : {
                speed = 15;
            };break;
            case 2 : {
                speed = 10;
            };break;
            case 3 : {
                speed = 5;
            };break;
        }

        this.bgmove = setInterval( () => {
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        } , 50)
    }
    static hardlevel;
}

//飞机
class Plane {
    constructor() {
        this.main = $(".main");
        this.init();
    }
    init() {
        this.creatPlane();
        //飞机宽高
        Plane.plane_width = this.plane.offsetWidth;
        Plane.plane_height = this.plane.offsetHeight;
        //外面画布宽高
        this.main_width = this.main.offsetWidth;
        this.main_height = this.main.offsetHeight;
        this.main_left = this.main.offsetLeft;
        //屏幕宽高
        this.cWidth = document.documentElement.clientWidth;
        //飞机初始位置
        this.plane.style.left = (this.cWidth - Plane.plane_width) / 2 + "px";

        Plane.x = this.plane.offsetLeft;
        Plane.y = this.plane.offsetTop;
        document.addEventListener("mousemove" , this.handlermove.bind(this));

        this.fire();
    }
    handlermove(evt) {
        let e = evt || window.event;
        let x = e.clientX;
        let y = e.clientY;
        
        this.planeMove(x , y);
    }
    creatPlane() {
        this.plane = Core.createElement("plane");
        this.plane.style.cursor = "none";
        
    }
    planeMove(clientX , clientY) {
        //边界限制
        let left = Math.min(Math.max(clientX - Plane.plane_width / 2 , this.main_left) , this.main_left + this.main_width - Plane.plane_width);
        let top = Math.min(Math.max(clientY - Plane.plane_height / 2 , 0) , this.main_height - Plane.plane_height)
        

        this.plane.style.left = left + "px";
        this.plane.style.top = top + "px";
        Plane.x = this.plane.offsetLeft;
        Plane.y = this.plane.offsetTop;
    }
    fire() {
        let firespeed = 100;
        switch(Core.hardlevel) {
            case 0 : firespeed = 500;break;
            case 1 : firespeed = 300;break;
            case 2 : firespeed = 200;break;
            case 3 : firespeed = 100;break;
        }

        setInterval( () => {
            console.log("发射");
            new Bullet();
        } , firespeed);
    }
    static x;
    static y;
    static plane_width;
    static plane_height;
}

//子弹
class Bullet {
    constructor() {
        this.speed = 20;
        //判断是否是第一颗子弹，只创建一个定时器
        if(Bullet.bullet_timer === undefined) {
            Bullet.bullet_timer = setInterval( () => {
                this.bulletMove();
            },50)
        }
        if(Bullet.bullet_list === undefined) {
            Bullet.bullet_list = [];
        }
        
        this.init();
    }
    init() {
        let ele = this.creatBullet();
        if(Bullet.bullet_size === undefined) {
            Bullet.bullet_size = {
                width  : ele.offsetWidth,
                height : ele.offsetHeight
          }
        }
    }
    creatBullet() {
        let bullet = Core.createElement("bullet");
        console.log(Plane.x ,Plane.plane_width, bullet.offsetWidth);
        Bullet.bullet_list.push({
            bullet,
            left : Plane.x + Plane.plane_width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : bullet.offsetWidth / 2),
            top : Plane.y
        });
        return bullet;
    }
    bulletMove() {
        for(let attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr];

            if(bullet.top <= 50) {
                this.bulletDie(bullet);
                continue;
            }
            // console.log(bullet);
            bullet.top -= this.speed;
            bullet.bullet.style.left = bullet.left + "px";
            bullet.bullet.style.top = bullet.top + "px";
        }
    }
    bulletDie(bullet) {
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index , 1);
        // bullet.bullet.remove();
        bullet.bullet.className += " die";
        
        setTimeout( () => {
            bullet.bullet.remove();
            bullet = false; 
        },500)
        
    }
    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

//敌机
class Enemy {
    constructor() {
        this.main = $(".main");
        this.mainSize = {
                width  : this.main.offsetWidth,
                height : this.main.offsetHeight,
                left   : this.main.offsetLeft
        }
        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval( () => {
            this.enemyMove();
        }, 50)

        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        this.enemies = {
            small : {
                className : "enemy-small",
                speed     : 10,
                hp        : 1,
                dieClassName : "enemy-small-die"
            },
            middle : {
                className : "enemy-middle",
                speed     : 5,
                hp        : 10,
                dieClassName : "enemy-middle-die"
            },
            large : {
                className : "enemy-large",
                speed     : 1,
                hp        : 20,
                dieClassName : "enemy-large-die"
            }
        }
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_data = this.enemies[enemy_type];
        this.init();
    }
    init() {
        this.createEnemy();
    }
    creatEnemy() {
        let enemy = document.createElement("div");
        enemy.className = this.enemy_data.className;
        document.body.appendChild(enemy);

        Enemy.enemy_list.push({
            enemy,
            hp : this.enemy_date.hp,
            top : 0,
            left : Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - enemy.offsetWidth ),
            speed : this.enemy_data.speed,
            width : enemy.offsetWidth,
            height : enemy.offsetHeight,
            die : this.enemyDie.bind(this)
        })
    }
    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min , max){
        return  min + Math.round(Math.random() * (max - min));
    }
}




new Core();
