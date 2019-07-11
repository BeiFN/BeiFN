//游戏处理器,处理游戏的核心业务
class GameProcess {
    constructor() {
        this.Center = new Center();
        this.domin = Center.domin;
        this.menu = Center.menu;
        this.ini();
    }
    ini() {
        this.menu.on("click", this.setGameMode.bind(this), "p");
    }
    setGameMode(ev) {
        let e = ev || window.event;
        let captureE = e.target || e.srcElement;
        let parent = captureE.parentNode;
        let childs = parent.children;
        Array.from(childs).forEach((element, index) => {
            if (element === captureE) {
                Center.GameMode = index;
                this.gameStart();
            }
        });
    }

    gameStart() {
        this.Center.GameStart();
        this.loadingAnimation(
            function () {
                this.bgMove();
                EnemyAircraft.enemyCreater();
                new Aircraft().fire();
            }.bind(this)
        );

    }

    loadingAnimation(callBack) {
        this.menu.remove();
        this.logo = createElement({
            tagName: "div",
            class: "logo"
        }).appendTo(document.body);
        this.planeLoading = createElement({
            tagName: "div",
            class: "plane-loading"
        }).appendTo(document.body);
        let index = 0;
        this.loading = setInterval(() => {
            this.planeLoading.style.backgroundImage = `url(${loadList[++index%3]+1})`;
            if (index >= 5) {
                clearInterval(this.loading);
                this.loading = null;
                this.logo.remove();
                this.planeLoading.remove();
                callBack ? callBack() : "";
            }
        }, 800)

    }

    bgMove() {
        let positionY = 0;
        let speed = 5;
        switch (Center.GameMode) {
            case 0:
                speed = 5;
                break;
            case 1:
                speed = 8;
                break;
            case 2:
                speed = 20;
                break;
            case 3:
                speed = 20;
                break;
        }
        this.bgMovingTimer = setInterval(() => {
            positionY += speed;
            this.domin.style.backgroundPositionY = positionY + "px";
        }, 50);
    }


}



new GameProcess();