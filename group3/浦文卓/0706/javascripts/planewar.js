

let {$ , createEle , level , getSize , getoffset} = Utils;

class Main{
    constructor(){
        this.option = $(".options");
        this.main = $(".main");
        
        this.init();
    }

//实例化，邦定事件
    init(){
        this.option.addEventListener("click" , this.handlerClick.bind(this));
    }

//处理鼠标点击事件
    handlerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P") return false;

        
        this.handlerLevel(target);
        this.clearAll();
        this.showAll();
        this.animate();
        setTimeout(() => {
            this.clearAll();
            this.getStart();
        },1000)
    }

//消失
    clearAll(){
        this.option ? this.option.remove() : "";
        this.logo ? this.logo.remove() : "";
        this.plane_loading ? this.plane_loading.remove() : "";
    }

//进入logo
    showAll(){
        this.logo = createEle("logo");
        this.plane_loading = createEle("plane-loading");
    }

//困难等级
    handlerLevel(target){
        level = Array.from(target.parentNode.children).indexOf(target);
    }


//loading飞机动画
    animate(){
        let index = 0;
        this.loading = setInterval(() => {
            ++index ;
            this.plane_loading.style.backgroundImage = `url(./images/loading${index % 3 + 1}.png)`;
        },250)

        

        //背景图移动
        var speed = 10;
        var positiony = 0;
        switch(level){
            case 0 :speed = 50;break;
            case 1 :speed = 30;break;
            case 2 :speed = 20;break;
            case 3 :speed = 10;break;
        }

        this.bg_moving = setInterval(() => {
            positiony += speed;
            this.main.style.backgroundPositionY = positiony +"px"; 
        },50)
        
    }

    getStart(){
        new Plane().fire();
    }

//创建元素
    
}

//飞机事件
class Plane{

//获取元素
    constructor(){
        this.main = $(".main");
        this.bullet = $(".bullet");
        

        this.init();
    }

//绑定事件
    init(){

        this.plane = createEle("plane");
        document.addEventListener("mousemove" , this.handlerMouseMove.bind(this));
    }

//处理耦合
    handlerMouseMove(evt){
        let e = evt || window.event;
        let planex = e.clientX; 
        let planey = e.clientY - getSize(this.plane).height / 2; 


        
        this.plane_position = this.boundray(planex,planey);
        this.planeMove(this.plane_position.x,this.plane_position.y);

        Plane.x = this.plane_position.x;
        Plane.y = this.plane_position.y; 
    }

//飞机移动
    planeMove(x,y){
        this.plane.style.left = x + "px";
        this.plane.style.top = y + "px";
    }

//边界检测
    boundray(x,y){
        let minx = getoffset(this.main).left + getSize(this.plane).width / 2;
        let maxx = getoffset(this.main).left + getSize(this.main).width - getSize(this.plane).width + getSize(this.plane).width / 2;

        let miny = 0;
        let maxy = getSize(this.main).height - getSize(this.plane).height;

        x = x <= minx ? minx : x;
        x = x >= maxx ? maxx : x;

        y = y <= miny ? miny : y;
        y = y >= maxy ? maxy : y;

        return {
            x,
            y
        }
    }
 
//子弹飞
    fire(){
        let frequency = 0;
        switch(level){
            case 0 : frequency = 1000; break;
            case 1 : frequency = 800; break;
            case 2 : frequency = 500; break;
            case 3 : frequency = 300; break;
        }
        this.play_fire = setInterval(() => {
            new Bullet();
        },frequency);
    }

    static x;
    static y;
    
}

//子弹
class Bullet{
    constructor(){

        this.plane = $(".plane");
        

        if(Bullet.bullet_create_timer === undefined){
            Bullet.bullet_create_timer = setInterval(() => {
                this.bulletMove();
            },50)
        }

        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }


        this.init();
    }

//你是干啥的啊
    init(){

        this.bullet = this.createBullet("bullet");

    }

//创建子弹
    createBullet(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);

        ele.style.left = Plane.x + "px";
        ele.style.top = Plane.y - 18 + "px";

        Bullet.bullet_list.push({
            ele,
            left : ele.offsetLeft,
            top : ele.offsetTop
        });

        return ele;
        
        

    }

//子弹运动
    bulletMove(){
        for(var attr in Bullet.bullet_list){
            let bullet = Bullet.bullet_list[attr];
            if(bullet.top <= 50){
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= 20;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
        }
    }

    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index,1);

        bullet.ele.className += " die";

        setTimeout(() => {
            bullet.ele.remove();
            bullet = false;
        }, 500);
        
    }

    
    static positiony;
    static bullet_create_timer;
    static bullet_list;
    
}

//敌机
class Enemy{
    constructor(enemy_type){
        if(Enemy.enemy_timer === undefined){
            Enemy.enemy_timer = setInterval(()=>{
                this.enemyMove();
            },50)
        }

        Enemy.enemy_list = {
            "small" : {
                className : "enemy-small",
                speed : 10,
                hp : 1,
                dieClassName : "enemy-small-die"
            },
            "middle" : {
                className : "enemy-middle",
                speed : 5,
                hp : 10,
                dieClassName : "enemy-middle-die"
            },
            "big" : {
                className : "enemy-big",
                speed : 1,
                hp : 50,
                dieClassName : "enemy-big-die"
            },
        }

        this.enemy = this.createEnemy(enemy_type);

        this.init();
    }

    init(){

    }

    createEnemy(enemy_type){
        let ele = document.createElement("div");
        ele.className = enemy_type.className;
        document.body.appendChild(ele);

        return ele;
    }

    static enemy_timer;
    static enemy_list;
}

new Main();


