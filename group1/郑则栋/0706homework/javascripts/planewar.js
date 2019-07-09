

class planeStart {
    constructor() {
        this.main = document.querySelector(".main");
        this.options = document.querySelector(".options");
        this.init();
        this.loading = null;
    }
    init() {
        this.options.addEventListener("click", this.clickSomeOptions.bind(this));
    }
    //选择难度
    clickSomeOptions(eve) {
        let e = eve || event;
        let target = e.target || e.srcElement;
        for (let index in this.options.children) {
            if (this.options.children[index] === target) {
                planeStart.difficult = (4-index)*100;
            }
        }
        if(target.nodeName!="P"){
            return false;
        }
        this.gameLogoPage();
    }
    //开始游戏界面logo及小飞机
    gameLogoPage() {
        let speed = 5;
        let positionY = 0;
        setInterval(() => {
            positionY += speed;
            this.main.style.backgroundPositionY = positionY + "px";
        }, 50);
        planeStart.myRemove(this.options);
        let logo = planeStart.myCreateEle("logo", 0);
        let planeloading = planeStart.myCreateEle("plane-loading", 1);
        setTimeout(() => {
            planeStart.myRemove(logo);
            planeStart.myRemove(planeloading);
            this.gameStart();
        }, 20);//2000
    }
    //删除元素
    static myRemove(ele) {
        ele.remove();
    }
    static myCreateEle(_class, bool) {
        // clearInterval(this.loading);
        let ele = document.createElement("div");
        ele.className = _class;
        document.body.appendChild(ele);
        if (bool) {
            let index = 0;
            this.loading = setInterval(() => {
                this.loading = ele.style.backgroundImage = `url(./images/loading${index % 3 + 1}.png)`;
                index++;
            }, 300);
        }
        return ele;
    }
    gameStart() {
        new planeAppear();
        new Bullet().fire();
        new Emery();
        console.log(planeStart.difficult);
    }
    static difficult;
}

//---------------------------------------------------------
class planeAppear {
    constructor() {
        this.timer;
        this.main = document.querySelector(".main");
        planeAppear.myPlaneSize ? "" : planeAppear.myPlaneSize = {};
        planeAppear.myplanePosiztion ? "" : planeAppear.myplanePosiztion = {};
        planeAppear.mainPosition ? "" : planeAppear.mainPosition = {
            x: this.main.offsetLeft,
            y: this.main.offsetTop
        };
        planeAppear.mainSize ? "" : planeAppear.mainSize = {
            x: this.main.offsetWidth,
            y: this.main.offsetHeight
        }
        planeAppear.bulletSize ? "" : planeAppear.bulletSize = {};


        this.init();
    }
    init() {
        this.createMyPlane();
    }
    //获取someymplane创建之后才又的信息
    getInformation() {
        planeAppear.myPlaneSize.x = this.myPlane.offsetWidth;
        planeAppear.myPlaneSize.y = this.myPlane.offsetHeight;
        planeAppear.myplanePosiztion.x = this.myPlane.offsetLeft;
        planeAppear.myplanePosiztion.y = this.myPlane.offsetTop;
    }
    createMyPlane() {
        this.myPlane = this.myCreateEle();
        this.getInformation();
        document.addEventListener("mousemove", this.planePosition.bind(this));
        return this;
    }
    planePosition(eve) {
        let e = eve || window.event;
        let x = e.clientX - planeAppear.myPlaneSize.x / 2;
        planeAppear.y = e.clientY - planeAppear.myPlaneSize.y / 2;
        planeAppear.x = this.boundary(x);
        this.myPlane.style.left = planeAppear.x + "px";
        this.myPlane.style.top = planeAppear.y + "px";
    }
    //创建myPlane
    myCreateEle() {
        let ele = document.createElement("div");
        let cWidth = document.documentElement.clientWidth;
        ele.className = "plane";
        ele.style.cursor = "none";
        document.body.appendChild(ele);
        ele.style.left = cWidth / 2 - ele.offsetWidth / 2 + "px";
        return ele;
    }
    //myPlane的x边界（上下可出界）
    boundary(x) {
        let minLetf = planeAppear.mainPosition.x;
        let maxLeft = planeAppear.mainPosition.x + planeAppear.mainSize.x - planeAppear.myPlaneSize.x;
        x < minLetf ? x = minLetf : x = x;
        x > maxLeft ? x = maxLeft : x = x;
        return x;

    }


    /** 
     * size：本身大小
     * position： 初始边距offset
    */
    // 我的飞机
    static myPlaneSize;
    static myplanePosiztion;
    //游戏边框
    static mainSize;
    static mainPosition;
    //子弹
    static bulletSize;
    //飞机边框xy
    static x;
    static y;

}

class Bullet {
    constructor() {

        this.init();

        return this;
    }
    init() {
        Bullet.bulletList ? "" : Bullet.bulletList = [];
       
        this.bulletFly();
        // this.fire();
    }
    //开火seinterval
    fire() {
        //bulletcoming
        
       Bullet.timer?"":Bullet.timer = setInterval(() => {
            // this.bulletFly(speed);
            this.createBullet();
        }, planeStart.difficult);
        //emerycoming
    }
    //创建子弹
    createBullet() {
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);
        this.getBulletPositon(ele);
        return ele;
    }
    //找到bullet的初始位置
    getBulletPositon(ele) {
        planeAppear.bulletSize.x = ele.offsetWidth;
        planeAppear.bulletSize.y = ele.offsetHeight;
        let left = planeAppear.x + planeAppear.myPlaneSize.x / 2 - ele.offsetWidth / 2;
        let top = planeAppear.y - ele.offsetHeight;
        ele.style.left = left + "px";
        ele.style.top = top + "px";
        Bullet.bulletList.push({
            ele,
            top,
            left
        });
    }
    bulletFly() {
        let speed = 15;
        for (let attr in Bullet.bulletList) {
            Bullet.bulletList[attr].top -= speed;
            Bullet.bulletList[attr].ele.style.top = Bullet.bulletList[attr].top + "px"
            if (Bullet.bulletList[attr].top < 40) {
                Bullet.bulletDie(attr);
            }
        }
    }
    static bulletDie(index) {
        let bullet_die = this.bulletList[index].ele;
        bullet_die.className += " die";
        this.bulletList.splice(index, 1);
        setTimeout(() => {
            bullet_die.remove();
            bullet_die = false;
        }, 500);

    }
    //bullet元素列表
    static bulletList;
    static timer;
}
class Emery {
    constructor() {
        Emery.emeries ? "" : Emery.emeries = {
            "small": {
                className: "enemy-small",
                speed: 10,
                hp: 1,
                dieClassName: "enemy-small-die",
                size_x:59,
                size_y:36

            },
            "middle": {
                className: "enemy-middle",
                speed: 5,
                hp: 10,
                dieClassName: "enemy-middle-die",
                size_x:70,
                size_y:92
            },
            "large": {
                className: "enemy-large",
                speed: 1,
                hp: 50,
                dieClassName: "enemy-large-die",
                size_x:165,
                size_y:256
            }
        };
        Emery.emery_list ? "" : Emery.emery_list = [];
        Emery.emerySize ? "" : Emery.emerySize = [];
        setInterval(() => {
            this.EmeryComing();
        }, 1000);
        setInterval(() => {
            this.emeryMove();
            this.crash();
            new Bullet();
        }, 50);
        this.init();
    }
    init() {
        this.EmeryComing();
        this.emeryMove();
    }
    EmeryComing() {
        let ele = document.createElement("div");
        let emerySize = this.choosePlaneSize();

        ele.className = ("enemy-" + emerySize);
        let width = Emery.randomLeft(planeAppear.mainPosition.x, planeAppear.mainPosition.x + planeAppear.mainSize.x-Emery.emeries[emerySize].size_x);
        ele.style.left = width + "px";
        ele.style.top = 0 + "px";
        document.body.appendChild(ele);
        Emery.emery_list.push({
            ele,
            hp: Emery.emeries[emerySize].hp,
            speed: Emery.emeries[emerySize].speed,
            dieClassName: Emery.emeries[emerySize].dieClassName,
            className: Emery.emeries[emerySize].className,
            top: 0,
            left: width,
            x: ele.offsetWidth,
            y: ele.offsetHeight
        });


    }
    emeryMove() {
        for (let index in Emery.emery_list) {

            Emery.emery_list[index].top += Emery.emery_list[index].speed;
            let ele = Emery.emery_list[index].ele;
            ele.style.left = Emery.emery_list[index].left + "px";
            ele.style.top = Emery.emery_list[index].top + "px";
            if (Emery.emery_list[index].top > planeAppear.mainSize.y - 60) {
                this.emeryRemove(index);
            }

        }
    }

    emeryRemove(index) {
        let emery_die = Emery.emery_list[index].ele;
        emery_die.className += " die";
        Emery.emery_list.splice(index, 1);
        setTimeout(() => {
            emery_die.remove();
            emery_die = false;
        }, 500);

    }
    choosePlaneSize() {
        let size = Math.random() * 3;
        if (size >= 0 && size < 2.2) {
            return "small";
        }
        else if (size >= 2.2 && size < 2.8) {
            return "middle";
        }
        else {
            return "large";
        }

    }
    crash() {
        for (let i = 0, bullet; bullet = Bullet.bulletList[i++];) {
            for (let j = 0, emery; emery = Emery.emery_list[j++];) {
                if (bullet.left > emery.left && bullet.left < emery.left + emery.x) {
                    if (emery.top > bullet.top && emery.top - emery.y < bullet.top) {
                        Bullet.bulletDie(i - 1);

                        emery.hp--;
                        if (emery.hp <= 0) {
                            this.emeryRemove(j - 1);
                        }
                    }

                }
            }
        }
    }




    static randomLeft(min, max) {
        return min + Math.round(Math.random() * (max - min));
    }


    static emeries;
    static emery_list;
    static emerySize;


}


new planeStart();