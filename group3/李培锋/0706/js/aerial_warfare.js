//工具函数
class Common{
    static $(ele){
        return (ele =  document.querySelectorAll(ele)).length ===1? ele[0] : ele;
    }
    static on(dom, eventType, handleEvent){
        dom.addEventListener(eventType,handleEvent);
    }
}
let{$,on} = Common;
//核心部分：
/**
 * 1.logo入场
 * 2.飞机动画
 * 3.背景运动
 */
class Core{
    //获取核心元素：main，option
    constructor(){
        this.main = $(".main");
        this.option = $(".option");
        this.init();
    }
    //在选择相应的游戏模式：点击后，绑定之后的事件，触发函数HanderClick
    init(){
        on(this.option,"click",this.handerClick.bind(this));
    }
    handerClick(evt){
        //获取事件；事件源
        let e = evt||event;
        let target = e.target||e.srcElement;
        //事件源不是P，之后不执行
        if(target.nodeName !== "P") return false;
        //根据电机的P标签，获取下标
        this.setHardLevel(target);
        //鼠标点击后，选择难度页面消失
        this.clearAll();
        //显示logo
        this.showAll();
        //飞机动画
        this.animate();
        //动画结束；游戏开始;清除logo，清除飞机动画
        setTimeout( ()=>{
            this.clearAll();
            this.gameStart();
        },2000)
    }
    //判断是否存在对应元素
    clearAll(){
        this.option ? this.option.remove() : "";
        clearInterval(this.loading); //删除前先清除定时器
        this.logo? this.logo.remove() : "";
        this.plane_loading? this.plane_loading.remove() : "";
    }
    setHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);//通过target的父元素，利用indexof（）找到target在option中的下标
    }
    showAll(){
        this.logo = Core.createEle("logo");//利用自己定义的方法插入logo，元素盒子，类名，以及放入
        this.plane_loading = Core.createEle("plane-loading");
    }
    animate(){
        let index = 0;
        this.loading = setInterval(() => {
            //es6，定时器this指向实例对象
            this.plane_loading.style.backgroundImage = `url(./images/loading${++index%3+1}.png)`;//定时器开启，利用图片位置的关系，完成动画，每执行一次，切换一次图片
        }, 800);
        
        //main 背景位置，y的初始位置，以及移动的速度
        let positionY = 0;
        let speed     = 5;
        switch(this.hardLevel){
            case 0 : speed = 5;break;
            case 1 : speed = 8 ;break;
            case 2 : speed = 20 ;break;
            case 3 : speed = 20;break;
        }
        this.bg_moving = setInterval(()=>{
            positionY += speed ;
            this.main.style.backgroundePositionY = positionY + "px";
        },50)


    }
    gameStart(){
        //游戏开始，飞机/敌军创建
        plane.init().fire();
        // Enemy.enemyCreater();
    }
    //添加logo，飞机入场
    static createEle(className){
        let ele = document.createElement("div");
            ele.className = className;
            document.body.appendChild(ele);
            return ele;
    }
    static hardLevel;
}
//飞机
class Plane{
    constructor(){

    }
    init(){
        //创建元素，函数返回创建的元素，
        this.ele = this.createPlane();
        //获取主要的元素
        this.main = $(".main");
        //获取飞机的宽度
        Plane.plan_size = {
            width:this.ele.offsetWidth
        }
        this.mainSize = {
            left : this.main.offsetLeft,
            width: this.main.offsetWidth
        }
        this.eleSize = {
            width :this.ele.offsetWidth,
            height: this.ele.offsetHeight
        }
        on(document,"mousemove",this.planeMove.bind(this));
        return this;

        
    }
    createPlane(){
        console.log(1);
        let ele =document.createElement("div");
        //可视窗口宽度
        let cWidth = document.documentElement.clientWidth;
        //给飞机设置样式
        ele.className = "plane";
        ele.style.cursor = "none";
        //移入
        //进入时飞机位于main下部中间位置
        ele.style.left = (cWidth - ele.offsetWidth)/2 + "px";
        // 飞机左边在main中的位置
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }
    planeMove(evt){
        let e = evt || event;
        // 有鼠标位置确定飞机的的位置,并确定边界，用到边界函数boundry
        let { x , y } = this.boundry( e.clientX-this.eleSize.width/2,e.clientY-this.eleSize.height/2); 
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x+"px";
        this.ele.style.top = y +"px";
    }
    boundry(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        //飞机x方向边界
        x = x > minX? minX : x;
        x = x < maxX? maxX : x;
        // 飞机y方向边界
        y = y < 0 ? 0 : y;
        return{
            x,
            y
        } 
    }
    fire(){
        let frequency = 100;
        //根据不同难度，决定子弹速度
        switch(Core.hardLevel){
            case 0 : 
                frequency = 200;
                break;
            case 1 :
                frequency = 300 ;
                break;
            case 2 :
                frequency = 500;
                break;
            case 3 :
                frequency = 100;
                break;
        }
        setInterval(()=>{
            new Bullet();  //生成子弹
        })
    }
    //飞机左边在main中位置
    static x;
    static y;
    static plane_size;
}
//子弹创建
class Bullet{
    constructor(){
        this.speed = 20;  //每次调用移动距离
        //创建一个定时器，统一的子弹列表
        if(Bullet.bullet_timer === undefined){ 
            Bullet.bullet_timer = setInterval(()=>{
                this.bulletMove();
            },50)
        }
        //之创建一个子弹列表
        if(Bullet.bullet_list === undefined){
            Bullet.bullet_list = [];
        }
        this.init();
    }
    init(){
        let ele =this.createBullet();
        //子弹占位
        if(Bullet.bullet_size === undefined){
            Bullet.bullet_size = {
                width : ele.offsetTop,
                height : ele.offsetHeight
            }
        }
    }
    createBullet(){
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
        let left = Plane.x + Plane.plane_size.width/2 -(Bullet.bullet_size? Bullet.bullet_size.width/2 :ele.offsetWidth/2 );//第一次生成子弹的情况
        let top = Plane.y;
        Bullet.bullet_list.push({
            ele,
            left,
            top,
            die : this.bulletDie.bind(this)
        })
        return ele;
    };
    bulletMove(bullet){
       for(let attr in bullet_list){
           let bullet = bullet.bullet_list[attr];
           if(bullet.top <= -20 ){  //当移动到-20以上使自动清除
               this.bulletDie(bullet);
               continue;
           }
           bullet.ele.setAttrbute("date","move");
           //子弹运动规律：x，y方向
           bullet.top -= this.speed;
           bullet.ele.style.top = bullet.top + "px";
           bullet.ele.style.left = bullet.left + "px";
       }
    }
    bulletDie(bullet){
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index,1); //获取子弹下标，删除
        bullet.ele.className += "die";
        //动画完成，清除，利用延时器
        setTimeout(()=>{
            bullet.ele.remove();
            bullet = false;//清除引用
        },500)
    }
    static bullet_timer;
    static bullet_list;
    static bullet_size;
}
class Enemy{
    constructor( ememy_type){
        this.main = $(".main");
        this.mainSize = {
            width: this.main.offsetWidth,
            height : this.offsetHeight,
            left: this.main.offsetLeft
        }
        Enemy.enemy_timer? "":Enemy.enemy_timer = setInterval(()=>{
            this.enemyMove();
            this.collisionDetection();
        },50);//敌机飞行，碰撞
        Enemy.enemy_list? "":Enemy.enemy_list = [];
        //不同敌机的calssName,speed,hp,dieClassName不同
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
        this.enemy.data = this.enemies[enemy_type];
        this.init();
    }
    init(){
        this.createEnemy();
        }
    createEnemy(){
        let ele = document.createElement("div");
        ele.clssName = this.enemy_date.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp: this.enemy_date.hp,
            //敌机随机出生位置
            left: Enemy.randomLeft(this.mainSize.left,this.mainSize.left+this.mainSize.offsetWidth-ele.offsetWidth),
            top : 0,
            speed : this.enemy_date.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die : this.enemyDie.bind(this)
        })
    
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            //敌机边界及运动机制
            if(enemy.top >= this.mainSize.height - 50){
                this.enemyDie(enemy);
                continue;
            }
            enemy.ele.style.top = enemy.top + "px";
            enemy.ele.style.left = enemy.left + "px";
        }
    }
    enemyDie(enemy){
        //获取下标，在列表内延时删除
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index,1);
        enemy.ele.className = " die";
        setTimeout(()=>{
            enemy.ele.remove();
        },1000)
    }
    collisionDetection(){
        let bullets =Bullet.bullet_list;
        let enemys = Enemy.enemy_list;
        //双层循环，碰撞消除机制，子弹，敌机消失
        for(let i = 0,bullet; bullet = bullets[i];i++){
            for(let k=0,enemy;enemy = enemys[k];k++){
                if(this.collisionLeft(enemy,bullet)){
                    if(this.collisionTop(enemy,bullet)){
                        bullet.die(bullet);
                        enemy.hp --;
                        if(enemy.hp <= 0)[
                            enemy.die(enemy);
                        ]
                    }
                }
            }
        }
    }
    //水平区域检测
    collisionLeft(enemy,bullet){
        return bullet.left > enemy.left - Bullet.bullet_size.width&& bullet.left < enemy.left + enemy.width
    }
    //垂直区域检测？？
    collisionTop(enemy,bullet){
        return bullet.top > enemy.top - Bullet.bullet_size.height&& enemy.top + enemy.height;
    }
    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min,max){
        return min+Math.round(Math.random()*(max-min));
        
    }
    static enemyCreater(){
        let count = 0;
        setInterval(()=>{
            count ++;
            Math.random()>0.5? new Enemy() : "";
            count%5 ===0?(Math.random()<0.8?new Enemy("middle"):""):"";
            count%10 ===0? (Math.random()<0.9? new Enemy("large"):""):"";
        },1000)
    }
}


/**
 * 实例
 */
new Core();
let plane = new Plane();