/**
 * 全局使用的数据，可以放在静态类之中
 * 1、核心部分   =》 难度选择、开场动画，计分、暂停
 * 2、飞机     =》 随着鼠标移动
 * 3、子弹     =》飞行移动、与敌机交互(击落飞机)
 * 4、敌机     =》 分类，大中小 ( 血量、下落时间、概率 )
 */
let { $, on} = Utils;
//1、游戏界面和开场动画
class Core{
    constructor(){
        this.main    = $(".main");
        this.options = $(".options");
        this.init();
    }
    init(){//事件委托
        on(this.options,"click",this.handerClick.bind(this));
        
    }
    handerClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target.nodeName !== "P"){
            return false;
        }
        this.SetHardLevel(target);//获取下标，也就是难度等级
        this.cleanAll();
        this.showAll();
        setTimeout(() => {
            this.cleanAll();
            this.gameBegining();
        },3000)
        this.bgMove();//开始动画
    }
    SetHardLevel(target){
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target); //难度等级全局可用，用static静态类定义
        // console.log(Core.hardLevel);
    }
    //清除开始页面上的元素
    cleanAll(){
        this.options ? this.options.remove() : "";
        clearTimeout(this.loading);
        this.logo ? this.logo.remove() : "";
        this.loading ? this.loading.remove() : "";

    }
    //展示选择难度后的页面,包括logo、loading
    showAll(){
        this.logo = Core.CreateElement("logo");
        this.loading = Core.CreateElement("loading");
        this.openAnimation();
    }
    openAnimation(){
        let index = 0 ;
        setInterval(()=>{
            this.loading.style.backgroundImage = `url(./images/loading${++index % 3 +1}.png)`;// ..不能用，找不到图片
        },450)
    }
    //背景动画
    bgMove(){
        let speed = 5;
        let positionY = 0;
        setInterval(()=>{
            positionY += speed ;
            this.main.style.backgroundPositionY = positionY + "px";
        },50)
    }
    gameBegining(){
        plane.init().fire(); 
        Enemy.enemyCreate_2();
    }
    //动态创建元素
    static CreateElement(className){
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
    static hardLevel;
}
//2、飞机的创建，移动
class Plane{
    constructor(){
        // this.init();
    }
    init(){
        this.ele = this.PlaneCreate();
        this.main = $(".main");
        Plane.plane_size = {
            width   : this.ele.offsetWidth,
        }
        this.mainSize = {
            left  : this.main.offsetLeft ,  //main 的offsetLeft值
            width : this.main.offsetWidth,//main 的自身宽度
            height: this.main.offsetHeight
        }
        this.eleSize = {//创建的飞机的自身宽高
            width : this.ele.offsetWidth,
            height : this.ele.offsetHeight
        }
        on(document, "mousemove" ,this.planeMove.bind(this));//添加事件处理函数
        return this ;
    }
    //创建飞机
    PlaneCreate(){
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "PlaneCreate";
        // ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth/2 - ele.offsetWidth/2 + "px";//让飞机居中
        Plane.x = ele.offsetLeft;
        Plane.y = ele.offsetTop;
        return ele;
    }
    //飞机移动
    planeMove(evt){
        let e = evt || window.event;
        let { x , y } = this.boundary(e.clientX - this.eleSize.width/2 , e.clientY - this.eleSize.height/2)
        Plane.x = x;
        Plane.y = y;
        this.ele.style.left = x + "px";
        this.ele.style.top  = y + "px";
    }
    boundary(x,y){
        let minX = this.mainSize.left;
        let maxX = this.mainSize.left + this.mainSize.width - this.eleSize.width;
        let maxY = this.mainSize.height - this.eleSize.height;
        x = x < minX ? minX : x ;
        x = x > maxX ? maxX : x ;
        y = y < 0 ? 0 : y ;
        y = y > maxY ? maxY : y ;
        return {
            x ,
            y
        }
    }
    fire(){//根据选择的难度，来设置定时器的时间(子弹创建的快慢)
        let frequency = 100 ;
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
        setInterval(()=>{
            new Shell();
        },frequency);
    }
    static x;//所创建的飞机的 offsetLeft 值
    static y;//所创建的飞机的 offsetTop 值
    static plane_size;//所创建的飞机的 offsetWidth 值
}
//3、子弹的创建
class Shell{
    constructor(){
        this.speed = 20 ;
        //保证无论多少次实例，都只创建一个定时器，创建一个统一的子弹列表
        if(Shell.shell_timer === undefined ){
            Shell.shell_timer = setInterval( ()=>{
                this.shellMove();
            },50);
        }
        //确保只创建一个子弹列表
        // console.log(Shell.shell_list);//undefiend
        if(Shell.shell_list == undefined ){
            Shell.shell_list = [];
        }
        this.init();
    }
    init(){
        let ele = this.shellCreate();
        
        if(Shell.shell_size == undefined ){
            Shell.shell_size ={
                width  : ele.offsetWidth ,
                height : ele.offsetHeight
            }
        }
    }
    shellCreate(){
        let ele = document.createElement("div");
        ele.className = "shell" ;
        document.body.appendChild(ele);//插入，执行了;
        // console.log(ele.offsetWidth);//没有offsetWidth值
        let left = Plane.x + Plane.plane_size.width /2 -(Shell.shell_size ? Shell.shell_size.width/2 : ele.offsetWidth/2);
        let top  = Plane.y ;
        Shell.shell_list.push({
            ele,
            left,
            top,
            die : this.ShellDie.bind(this)
        });
        // console.log(Shell.shell_list.ele);//没有东西，里面
        return ele ;
    }
    shellMove(){
        for(var attr in Shell.shell_list){
            // console.log(Shell.shell_list[attr])
            let shell = Shell.shell_list[attr];
            if(shell.top <= -60){
                this.ShellDie(shell);
                continue;
            }
            shell.top -= this.speed;
            shell.ele.style.left = shell.left + "px";
            shell.ele.style.top  = shell.top  + "px";
        }
        // shell.ele.setAttribute("data","move");
    }
    ShellDie(shell){
        let index = Shell.shell_list.indexOf(shell);
        Shell.shell_list.splice(index , 1);
        shell.ele.className += " die";
        setTimeout(()=>{
            shell.ele.remove();
            shell = false;
        },400);
    }

    static shell_timer;//定时器，每次创建子弹都只有一个定时器
    static shell_list;//子弹列表
    static shell_size;//数组表示 储存着：1、子弹的position:left值  2、子弹的positiion:top值
}
class Enemy{
    constructor(enemy_type){
        this.main = $(".main");
        this.mainSize = {
            left  : this.main.offsetLeft ,  //main 的offsetLeft值
            width : this.main.offsetWidth,//main 的自身宽度
            height: this.main.offsetHeight
        }
        Enemy.enemy_timer ? ""  : Enemy.enemy_timer = setInterval( ()=>{
            this.enemyMove();
            //碰撞检测
            this.collisionDetection()
        },50 );
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
        this.enemyCreate_1();
    }
    enemyCreate_1(){
        let ele = document.createElement("div");
        ele.className = this.enemy_data.className;
        document.body.appendChild(ele);
        Enemy.enemy_list.push({
            ele,
            hp : this.enemy_data.up ,
            left : Enemy.randomLeft(this.mainSize.left , this.mainSize.left + this.mainSize.width - ele.offsetWidth),
            top : 0,
            speed : this.enemy_data.speed,
            width : ele.offsetWidth,
            height : ele.offsetHeight,
            die : this.EnemyDie.bind(this)
        })
    }
    enemyMove(){
        for(let attr in Enemy.enemy_list){
            let enemy = Enemy.enemy_list[attr];
            enemy.top += enemy.speed;
            if(enemy.top >= this.mainSize.height - 50){
                this.EnemyDie(enemy);
                continue;
            }
            enemy.ele.style.left = enemy.left + "px" ;
            enemy.ele.style.top  = enemy.top  + "px" ;
        }
    }
    EnemyDie(enemy){
        let index = Enemy.enemy_list.indexOf(enemy);
        Enemy.enemy_list.splice(index , 1 );
        enemy.ele.className += " die";
        setTimeout( ()=>{
            enemy.ele.remove();
        },1000)
    }
    collisionDetection(){
        let shells   = Shell.shell_list;
        // console.log(shells);
        let enemies  = Enemy.enemy_list;
        for(let i = 0 ,shell ; shell = shells[i] ; i++){
            for(let k = 0 , enemy ; enemy = enemies[k] ; k++){
                if(this.collisionLeft(enemy,shell)){
                    if(this.collisionTop(enemy,shell)){
                        console.log(shell.die(shell));
                        shell.die(shell);
                        enemy.hp --;
                        if(enemy.hp <= 0){
                            enemy.die(enemy);
                        }
                    }
                }
            }
        }
    }
    collisionLeft(enemy , shell){
        return shell.left > enemy.left - Shell.shell_size.width && shell.left < enemy.left + enemy.width;
    }
    collisionTop(enemy , shell){
        return shell.top > enemy.top - Shell.shell_list.height && shell.top < enemy.top + enemy.height;
    }
    static enemy_timer;
    static enemy_list;
    static enemy_size;
    static randomLeft(min , max){
        return min + Math.round(Math.random() * (max - min));
    }
    static enemyCreate_2(){//创建敌人
        let count = 0;
        setInterval( ()=>{
             count ++ ;
             //根据概率设定小、中、大敌机的出现
             Math.random() > 0.5 ? new Enemy() : "";
             count % 5 === 0 ? (Math.random() < 0.8 ? new Enemy("middle") : "") : "";
             count % 10 === 0 ? (Math.random() < 0.9 ? new Enemy("large") : "") : "";
        } , 1000)
    }
}
new Core();
let plane = new Plane();

