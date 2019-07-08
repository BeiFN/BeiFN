
let {$, on} = Utils;
class Loading{
    constructor(){
        this.main = $(".main");
        this.options = $(".options");
        this.init();
    }
    init(){
        on(this.options,"click", this.handlerClick.bind(this));
    }
    handlerClick(evt){
        let e = evt || event ;
        let target = e.target ||e.srcElement;
        if(target.nodeName !== "P") return false;
        this.setLeveal(target);
        this.clearAll();
        this.showAll();
        this.animation();
        setTimeout(() => {
            this.clearAll();
            this.starGame();
        },2000);
    }
    setLeveal(target){
        Loading.leveal = Array.from(target.parentNode.children).indexOf(target);
    }
    clearAll(){
        this.options.remove();
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }
    showAll(){
        this.logo = Loading.createElement("logo");
        this.plane_loading = Loading.createElement("plane_loading");
    }
    animation(){
        let count = 0;
        let arr =["4483375ae7043942","c53b48a9025ef930","ecb7640ccd9e7b77"];
        setInterval(() => {
            count++;
            this.plane_loading.style.backgroundImage = "url(https://upload-images.jianshu.io/upload_images/2845301-"+arr[count] +".png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)";
        },700);
        let positionY = 0 ;
        let speed = 5;
        switch(Loading.leveal){
            case 0 : speed = 20; break;
            case 1 : speed = 15; break;
            case 2 : speed = 10; break;
            case 3 : speed = 5; break;
        }
        this.bg_move = setInterval(() => {
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        },50);
    }
    starGame(){
        plane.init();
        plane.fire();
        Enemy.enemyCreater();
    }

    static createElement(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele ;
    }
    static leveal;
    
}

class Plane{
    constructor(){

    }
    init(){
        this.plane = this.createPlane("plane");
        this.main = $(".main");
        Plane.plane_size = {
            width: this.plane.offsetWidth
        }
        this.mainSize = {
            left: this.main.offsetLeft,
            width: this.main.offsetWidth
        }
        this.planeSize = {
            width: this.plane.offsetWidth,
            height: this.plane.offsetHeight
        }
        on(document, "mousemove",this.planeMove.bind(this));
    }
    planeMove(evt){
        let e = evt || event;
        
        let{x,y} = this.boundary(e.clientX - this.planeSize.width/2, e.clientY - this.planeSize.height/2);
        Plane.x = x;
        Plane.y = y;
        this.plane.style.left = x + "px";
        this.plane.style.top = y + "px";
    }
    boundary(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.planeSize.width;
        x = x >minX ? x : minX;
        x = x <maxX ? x : maxX;
        y = y < 0 ?  0 : y ;
        return{
            x,y
        }
    }
    fire(){
        let frequency = 100;
        switch(Loading.leveal){
            case 0 : frequency = 500; break ;
            case 1 : frequency = 300; break ;
            case 2 : frequency = 100; break ;
            case 3 : frequency = 50; break ;
        }
        setInterval(()=>{
            new Bullet();
        },frequency);
    }

    createPlane() {
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth / 2 - ele.offsetWidth / 2 + "px";
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }

    static plane_size;
    static x;
    static y;
}
class Bullet{
    constructor(){
        this.speed = 10;
        if(Bullet.bullet_timer === undefined){
            Bullet.bullet_timer = setInterval(() =>{
                this.bulletMove();
            },50);
        }
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init() {
        let ele = this.createBullet();

        if (Bullet.bullet_size === undefined) {
            Bullet.bullet_size = {
                width: ele.offsetWidth,
                height: ele.offsetHeight
            }
        }

    }
    createBullet() {

        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);


        let left = Plane.x + Plane.plane_size.width / 2 - (Bullet.bullet_size ? Bullet.bullet_size.width / 2 : ele.offsetWidth / 2);
        let top = Plane.y;

        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die : this.bulletDie.bind(this)
        })

        return ele;
    }

    bulletMove() {
        for (let attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr];
            bullet.top -= this.speed;
            if(bullet.top < 20){
                this.bulletDie(bullet);
                continue;
            }
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
            bullet = false;
        },500);
    }
    
    static bullet_timer;
    static bullet_list;
    static bullet_size;
}

class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
        this.mainSize = {
            left:this.main.offsetLeft,
            height:this.main.offsetHeight,
            width:this.main.offsetWidth,
        }

        Enemy.enemy_timer ? "" : Enemy.enemy_timer = setInterval(()=>{
            this.enemyMove();

            this.collisionDetection()
        },50);
        Enemy.enemy_list ? "" : Enemy.enemy_list = [];
        this.enemies = {
            "small":{
                className   :"small",
                speed       : 10,
                hp          : 2,
                dieclassName:"small-die"
            },
            "middle":{
                className   :"middle",
                speed       : 6,
                hp          : 5,
                dieclassName:"middle-die"
            },
            "large":{
                className   :"large",
                speed       : 3,
                hp          : 10,
                dieclassName:"large-die"
            }
        };
        enemy_type = enemy_type ? enemy_type : "small";
        this.enemy_date = this.enemies[enemy_type]; 

        
        
        this.init();

    }
    init(){
        this.createEnemy();

    }
    createEnemy(){
        let ele  = document.createElement("div");
        ele.className = this.enemy_date.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            left:Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth),
            top:0,
            hp:this.enemy_date.hp,
            speed:this.enemy_date.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die:this.enemyDie.bind(this),
        });

        return ele;
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];

            enemy.top += enemy.speed;

            if(enemy.top >= this.mainSize.height - 50){
                this.enemyDie(enemy)
                continue;
            }
            enemy.ele.style.left = enemy.left + "px";
            enemy.ele.style.top = enemy.top + "px";
        }
    }
    enemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index,1);
        enemy.ele.className += " die";
            
        setTimeout(()=>{
            enemy.ele.remove();
        },1000);

    }
    collisionDetection() {
        // 碰撞检测;
        let bullets = Bullet.bullet_list;
        let enemys = Enemy.enemy_list;

        // 双层循环比对;
        // console.log(bullets,enemys);
        for (let i = 0, bullet; bullet = bullets[i]; i++) {
            for (let k = 0, enemy; enemy = enemys[k]; k++) {
                if (this.collisionLeft(enemy, bullet)) {
                    if (this.collisionTop(enemy, bullet)) {
                        bullet.die(bullet);
                        enemy.hp--
                        if (enemy.hp <= 0) {
                            enemy.die(enemy);
                        }
                    }
                };
            }
        }
    }
    collisionLeft(enemy, bullet) {
        return bullet.left > enemy.left - Bullet.bullet_size.width && bullet.left < enemy.left + enemy.width
    }
    collisionTop(enemy, bullet) {
        return bullet.top > enemy.top - Bullet.bullet_size.height && bullet.top < enemy.top + enemy.height;
    }

    static randomLeft(min,max){
        return min + Math.round(Math.random()* (max - min));
    }
    static enemyCreater(){
        let count = 0;
        setInterval( ()=>{
             count ++ ;
             Math.random() > 0.5 ? new Enemy() : "";
             count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
             count % 10 === 0 ? (Math.random() < 0.5? new Enemy("large") : "") : "";
            
        } , 1000)
  }
    static enemy_list;
    static enemy_timer;
    static enemy_size;
}
let plane = new Plane();
new Loading();
// new Enemy();