class PlaneWar {
    constructor() {
        this.option = $(".hardLevel");
        this.bg = $(".bg");

        this.init();
    }

    init() {
        this.option.addEventListener("click", this.handlerClick.bind(this))
    }

    handlerClick(evt) {
        let e = evt || event;
        let target = e.target || e.srcElement;

        if (target.nodeName !== "P") {
            return false;
        }

        this.setLevel(target);
        this.clearAll();

        this.showAll();
        this.animate();
        setTimeout(() => {
            this.clearAll();
            this.gameStart();
        }, 1000)
    }
    setLevel(target) {
        this.nowLevel = Array.from(this.option.children).indexOf(target);
    }
    clearAll() {
        this.option ? this.option.remove() : "";
        this.logo ? this.logo.remove() : "";
        this.loading_move ? clearInterval(this.loading_move) : "";
        this.loading ? this.loading.remove() : ""
    }
    showAll() {
        this.logo = creatEle("logo");
        this.loading = creatEle("loading");
    }
    animate() {
        let i = 0;
        this.loading_move = setInterval(() => {
            this.loading.style.backgroundImage = `url(./images/loading${++i % 3 + 1}.png)`
        }, 500)

        let speed = 0;
        switch (this.nowLevel) {
            case 0:
                speed = 20;
                break;
            case 1:
                speed = 15;
                break;
            case 2:
                speed = 10;
                break;
            case 3:
                speed = 5;
                break;
        }
        let positionY = 0;
        this.bg_move = setInterval(() => {
            positionY += speed;
            this.bg.style.backgroundPositionY = positionY + "px";
        }, 50)

    }

    gameStart() {
        plane.init()
        plane.fire();
    }

    static $(selector) {
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
    }
    static creatEle(className) {
        let ele = document.createElement("div");
        ele.className = className;
        document.body.appendChild(ele);
        return ele;
    }
}

class Plane {
    constructor() {

    }
    init() {
        this.myPlane = creatEle("myplane");
        this.myPlane.style.cursor = "none";
        this.bg = $(".bg");
        document.addEventListener("mousemove", this.handlerMove.bind(this));
        this.myPlanSize = {
            width: this.myPlane.offsetWidth,
            height: this.myPlane.offsetHeight,
        }
        this.bgSize = {
            width: this.bg.offsetWidth,
            height: this.bg.offsetHeight
        }
        this.bgPosition = {
            left: this.bg.offsetLeft,
        }
    }

    handlerMove(evt) {
        let e = evt || event
        this.myPlanePosition = {
            X: 0,
            Y: 0,
        }
        let {
            X,
            Y
        } = {
            X: e.pageX,
            Y: e.pageY - this.myPlanSize.height / 2
        }
        this.myPlanePosition = this.boundary({
            X,
            Y
        });
        this.myPlaneMove();
    }
    boundary({
        X,
        Y
    }) {
        let positionLeft = X - this.bgPosition.left;
        let positionTop = Y;
        positionLeft = positionLeft < 0 ? 0 : positionLeft;
        positionLeft = positionLeft > this.bgSize.width - this.myPlanSize.width ? this.bgSize.width - this.myPlanSize.width : positionLeft;
        let top = positionTop < 0 ? 0 : positionTop;
        return {
            X: positionLeft + this.bgPosition.left + this.myPlanSize.width / 2,
            Y: top,
        }
    }

    myPlaneMove() {
        this.myPlane.style.left = this.myPlanePosition.X + "px";
        this.myPlane.style.top = this.myPlanePosition.Y + "px";
    }

    fire(){
        console.log(this.nowLevel);
        switch(this.nowLevel){
        }
    }

}
