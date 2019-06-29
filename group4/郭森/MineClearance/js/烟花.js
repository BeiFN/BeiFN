function Firework() { };
Object.assign(Firework.prototype, {
    init: function (box) {// 初始化
        this.box = box;
        this.boxWid = box.offsetWidth;
        this.boxHei = box.offsetHeight;
        this.timer=null;
        this.bindEvent();
        this.autoFire(400);
    },
    bindEvent: function () {// 事件监听
        this.bind1=this.createFire.bind(this);
        this.bind2=this.upFire.bind(this)
        this.box.addEventListener('click', this.bind1);
        this.box.addEventListener('click', this.bind2);
    },
    createFire: function (evt) {//创造
        let e = evt || window.event,
            fire = document.createElement('div');
        this.box.appendChild(fire);
        fire.className = 'fire_work';
        fire.style.left = e.offsetX + 'px';
        fire.style.background = randomColor();
        let fireTop = parseInt(gs(this.box)['height']) - parseInt(gs(fire)['height']) + 'px';
        fire.style.top = fireTop;
        this.fire = fire;
        return fire;
    },
    upFire: function (evt) {//上升
        let e = evt || window.event,
            fire = this.fire;
        move(this.fire, { top: e.offsetY }, this.boomFire.bind(this, fire, e.offsetX, e.offsetY));
    },
    // boomFire:function(fire,fireLeft,fireTop){//爆炸
    //     fire.remove();
    //     let count=200,
    //         angle=0,
    //         boomTime=(5 + Math.round(Math.random() * 10)) / 10,
    //         r=0;
    //     for(let i=0;i++<count;){
    //         let fire=this.createFire({fireLeft});
    //         fire.style.top=fireTop+'px';
    //         fire.style.left=fireLeft+'px';
    //         setTimeout(() => {
    //             r=(80000/i-1600)/2;
    //             angle = Math.round(360/ count * i*90);
    //             let fireX = r * Math.cos(Math.PI / 180 * angle),//横坐标终点      半径*cos（角度*π/180）
    //                 fireY = r * Math.sin(Math.PI / 180 * angle);//纵坐标终点
    //             fire.style.transition=`all ${boomTime}s`;
    //             fire.style.left = fireX + fireLeft + "px";
    //             fire.style.top = fireY + fireTop + "px";
    //         }, 50);
    //         setTimeout(()=>{
    //             fire.remove();
    //         },boomTime*1000);
    //     }   
    // },
    boomFire: function (fire, fireLeft, fireTop) {//爆炸
        fire.remove();
        let count = 20 * Math.PI,
            boomTime = (5 + Math.round(Math.random() * 10)) / 10;
        for (let i = -20 * Math.PI; i <= count; i += 1.5) {
            let fire = this.createFire({ fireLeft });
            fire.style.top = fireTop + 'px';
            fire.style.left = fireLeft + 'px';
            setTimeout(() => {
                let fireY = -60 * (2 * Math.cos(i) - Math.cos(2 * i)),//横坐标终点      半径*cos（角度*π/180）
                    fireX = 60 * (2 * Math.sin(i) - Math.sin(2 * i));//纵坐标终点
                fire.style.transition = `all ${boomTime}s`;
                fire.style.left = fireX + fireLeft + "px";
                fire.style.top = fireY + fireTop + "px";
            }, 50);
            setTimeout(() => {
                fire.remove();
            }, boomTime * 1000);
        }
    },
    // boomFire:function(fire,fireLeft,fireTop){//爆炸
    //     fire.remove();
    //     let count=100,
    //         angle=0,
    //         boomTime=(5 + Math.round(Math.random() * 10)) / 10,
    //         r=50;
    //     for(let i=0;i<count;i++){
    //         let fire=this.createFire({fireLeft});
    //         fire.style.top=fireTop+'px';
    //         fire.style.left=fireLeft+'px';
    //         setTimeout(() => {
    //             angle = Math.round(360/ count * i)*Math.PI/180;
    //             r=Math.sqrt(225/(17-16*Math.sin(angle)*Math.sqrt((Math.cos(angle))^2)))
    //             let fireY = r*Math.sin(angle),//横坐标终点      半径*cos（角度*π/180）
    //                 fireX = r*Math.cos(angle);//纵坐标终点

    //             fire.style.transition=`all ${boomTime}s`;
    //             fire.style.left = fireX + fireLeft + "px";
    //             fire.style.top = fireY + fireTop + "px";
    //         }, 50);
    //         setTimeout(()=>{
    //             fire.remove();
    //         },boomTime*1000);
    //     }   
    // },
    autoFire: function (delay) {//自动
        this.timer = setInterval(() => {
            let position = {
                offsetX: 50 + Math.round(Math.random() * (this.boxWid - 100)),
                offsetY: 50 + Math.round(Math.random() * (this.boxHei - 250))
            };
            this.createFire(position);
            this.upFire(position);
        }, delay);
    },
    end: function () {
        clearInterval(this.timer)
        this.box.removeEventListener("click",this.bind1);
        this.box.removeEventListener("click",this.bind2);        
    }
})