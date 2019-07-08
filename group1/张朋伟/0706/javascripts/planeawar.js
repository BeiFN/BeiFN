let {
    $,
    on
} = Utils;

//核心
class Core {
    constructor() {
        this.option = $(".options");
        Core.main = $(".main");
        this.images_loading =[
            "https://upload-images.jianshu.io/upload_images/12728563-b6848300e2570f2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/12728563-688ef39e5dd8b5fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "https://upload-images.jianshu.io/upload_images/12728563-e696f9e5d8635d42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"

        ]

        // console.log(this.main)
        this.init();
    }
    //对象初始化
    init() {
        // this.main.backgroundImage =`url(../images/bg.jpg)`
        // 绑定事件;
        this.option.addEventListener("click", this.handlerClick.bind(this));
    }

    // 事件耦合函数
    handlerClick(evt) {
        let e = evt || window.event;
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


    //展示
    showAll() {
        this.logo = Core.createEle("logo");
        this.loading = Core.createEle("plane-loading");
    }

    //清场
    clearAll() {
        this.option ? this.option.remove() : "";
        this.logo ? this.logo.remove() : "";
        this.loading ? this.loading.remove() : "";
    }
    //设置等级
    setHardLevel(target) {
        Core.hardLevel = Array.from(target.parentNode.children).indexOf(target);
        //  return index;
    }
    //动画设置
    animate() {
        let i = 0;
        this.animate_timer = setInterval(
            () => {
                this.loading.style.backgroundImage = "this.images_loading[i++]";
                console.log(this.images_loading[i++])
            }, 300);

        let speed = 15;
        let t_op = 0;
        switch (Core.hardLevel) {
            case 0:
                speed = 15;
                break;
            case 1:
                speed = 10;
                break;
            case 2:
                speed = 8;
                break;
            case 3:
                speed = 5;
                break;
        }
        this.bg_timer = setInterval(
            () => {
                t_op -= speed;
                // console.log(t_op);
                Core.main.style.backgroundPositionY = t_op + "px";
            }, 50)
    }
    gameStart() {
        //游戏开始
        plane.init();

    }

    //创建元素
    static createEle(class_Name) {
        let ele = document.createElement("div");
        document.body.appendChild(ele);
        ele.className = class_Name;
        return ele;
    }

    //删除元素

}
//创建实例



class Plane {
    constructor() {
        // this.main = $(".main");

    }
    //飞机数据初始化
    init() {
        this.plane = this.createPlane();
        //   console.log(this.plane);
        //屏幕宽度
        this.cWidth = document.documentElement.clientWidth;

        //我的飞机尺寸
        this.plane_size = {
            width: this.plane.offsetWidth,
            height: this.plane.offsetHeight,
            left: this.plane.offsetLeft
        }

        //战斗区域
        this.main_size = {
            width: Core.main.offsetWidth,
            height: Core.main.offsetHeight,
            left: Core.main.offsetLeft
        }
        //飞机初始位置
        this.plane.style.left = this.cWidth / 2 - this.plane_size.width / 2 + "px";
        this.plane.style.bottom = 0 + "px";
        //飞机移动
        document.addEventListener("mousemove", this.plane_move.bind(this));

    }

    //创建飞机
    createPlane() {
        let ele = document.createElement("div");
        document.body.appendChild(ele);
        ele.className = "plane";
        return ele;
    }

    plane_move(evt) {
        let e = evt || window.event;
        // let target = e.target ||e.srcElement;
        //边界检测
        // this.plane.style.left =  + "px";
        // this.plane.style.top = + "px";
        let {
            left,
            top
        } = this.boundary(e.clientX - this.plane_size.width / 2, e.clientY - this.plane_size.height / 2);
        // console.log(left, top);
        Plane.left = left + this.plane_size.width / 2; 
        Plane.top = top;
        this.plane.style.left = left + "px";
        this.plane.style.top = top + "px";


    }
    //边界检测
    boundary(left, top) {
        // console.log(left, top);

        let min_x = this.main_size.left;
        let max_x = this.main_size.left - this.plane_size.width + this.main_size.width;
        left = left < min_x ? min_x : left;
        left = left > max_x ? max_x : left;

        let min_y = 0;
        let max_y = this.main_size.height - this.plane_size.height;
        top = top < min_y ? min_y : top;
        top = top > max_y ? max_y : top;

        console.log(left, top);

        return {
            left,
            top
        };

    }
    static left;
    static top;
}

//创建子弹
class Bullet {

    //用于传值，用于判断
    constructor() {
        this.speed = 10;
        //只能存在一个子弹定时器
        if (Bullet.bullet_timer === undefined) {
            Bullet.bullet_timer = setInterval(
                () => {
                    this.bullet_move();
                }, 50
            )
        }

        //只能存在一个子弹列表
        if (Bullet.bullet_list === undefined) {
            Bullet.bullet_list = [];
        }
        this.init();
    }

    //初始化
    init() {
        let bullet = this.createBullet();
        let bullet_size = {
        width: bullet.offsetWidth,
        height: bullet.offsetHeight
    }
    }
    
    //创建子弹
    createBullet() {
        let ele = document.createElement("div");
        ele.className = "bullet";
        document.body.appendChild(ele);

        let left = Plane.left - ele.offsetWidth /2;
        let top = Plane.top;
        Bullet.bullet_list.push({
                ele,
                // left: ele.offsetLeft,
                // top: ele.offsetTop
                left,
                top
            }

        )
        // let left = this.main_size.left + this.plane_size.left + this.plane.width/2 - this.bullet.offsetWidth / 2 +"px";
        // let top = 
        return ele;
    }

    //子弹运动       
    bullet_move() {
        // let ele = $(".bullet");
        // console.log(ele);
        for (let attr in Bullet.bullet_list) {
            let bullet = Bullet.bullet_list[attr];
            if (bullet.top < 50) {
                this.bulletDie(bullet);
                continue;
            }
            bullet.top -= this.speed;
            bullet.ele.style.top = bullet.top + "px";
            bullet.ele.style.left = bullet.left + "px";
        }
    }
    bulletDie(bullet) {
        let index = Bullet.bullet_list.indexOf(bullet);
        Bullet.bullet_list.splice(index, 1);
        bullet.ele.className += " die";
        setTimeout(() => {
            bullet.ele.remove();
            bullet = false;
        }, 1500);


    }
    static bullet_timer;
    static bullet_list;
}

new Core();
let plane = new Plane();
new Bullet();