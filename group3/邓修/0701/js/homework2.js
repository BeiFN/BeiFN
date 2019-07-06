let {getRandomColor,move}=Utils;

class Firework {
    constructor(selector) {
        this.container = document.querySelector(selector);
        if (this.container === null)
            return false;
        this.init();
    }
    // 1. 创造随机颜色的div的功能;
    // 2. 上升功能;
    // 3. 爆炸功能;
    init() {
        this.container.addEventListener("click", this.handerClick.bind(this)); //绑定点击事件
    }
    handerClick(evt) {
        var e = evt || window.event;
        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        var fire = this.createFirework(); //创建随机颜色的烟花
        fire.style.width = "1px";
        fire.style.height = "20px";
        fire = this.setFireworkPosition(fire, offsetX); //为烟花设置初始位置
        var moveArray = this.fireworkBoom(offsetX, offsetY); //获取烟花爆炸后移动目标点数组
        var fireworkArray = []; //创建烟花爆炸后溅射物的数组
        for (var i = 0; i < moveArray.length; i++) {
            var moveFire = this.createFirework();
            moveFire.style.left = offsetX + "px";
            moveFire.style.top = offsetY + "px";
            moveFire.style.display = "none";
            moveFire.style.transform = "rotate(" + moveArray[i].angle + "deg)"; //创建完直接改变角度
            this.container.appendChild(moveFire);
            fireworkArray.push(moveFire);
        }
        // console.log(moveArray, fireworkArray);
        this.fireworkMove(fire, offsetY, this.fireworkBoomMove.bind(this, moveArray, fireworkArray)); //烟花移动并爆炸
    }
    createFirework() {
        var fire = document.createElement("div");
        fire.className = "firework";
        fire.style.backgroundColor = getRandomColor();
        return fire;
    }
    setFireworkPosition(fire, offsetX) {
        fire.style.left = offsetX + "px";
        fire.style.bottom = 0;
        this.container.appendChild(fire);
        return fire;
    }
    fireworkMove(fire, offsetY, boomCallback) {
        move(fire, {
            top: offsetY
        }, function () {
            fire.remove();
            boomCallback();
        });
    }
    fireworkBoom(offsetX, offsetY) {
        var randomFireworkCount = 18 + Math.round(Math.random() * 18);
        var blank = Math.round(360 / randomFireworkCount);
        var r = 100 + Math.round(Math.random() * 100);
        var angle = 0;
        var moveArray = [];
        for (var i = 0; i < randomFireworkCount; i++) {
            var oneFireworkTarget = {};
            oneFireworkTarget.firework_targetX = Math.round(Math.cos(Math.PI / 180 * angle) * r + offsetX);
            oneFireworkTarget.firework_targetY = Math.round(Math.sin(Math.PI / 180 * angle) * r + offsetY);
            oneFireworkTarget.angle = angle; //记录角度
            // console.log(oneFireworkTarget.firework_targetX,oneFireworkTarget.firework_targetY);
            moveArray.push(oneFireworkTarget);
            angle += blank;
        }
        // console.log(moveArray);
        return moveArray;
    }
    fireworkBoomMove(moveArray, moveFire) {
        for (var i = 0; i < moveArray.length; i++) {
            moveFire[i].style.display = "block";
            move(moveFire[i], {
                left: moveArray[i].firework_targetX,
                top: moveArray[i].firework_targetY
            }, function (fire_boom) {
                fire_boom.remove();
            }.bind(false, moveFire[i]));
        }
    }
}

var fire=new Firework("#container");
setInterval(function(){
    var evt=new Event("click");
    evt.offsetX=Math.round(Math.random()*1536);
    evt.offsetY=Math.round(Math.random()*440);
    // console.log(evt);
    fire.container.dispatchEvent(evt);
},2000);