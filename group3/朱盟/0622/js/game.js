/**
 * 全局变量声明区
 */
var clientWidth = document.documentElement.clientWidth; //屏幕的宽度
var ele_pao = $("#pao"); //炮台
var ele_score = $("#score"); //炮台
var ele_paoofftop = ele_pao.offsetTop; //炮台上距离;
var ele_paofont = ele_pao.children[0]; //炮台文字
var letterFishPool = []; //字母鱼池
var gameStart_bt = $("#gameStart"); //gameStart_bt
var gameStop_bt = $("#gameStop"); //gameStop_bt
var gameRestart_bt = $("#gameRestart"); //gameRestart_bt
var gameSet_bt = $("#gameSet"); //gameSet_bt
var setHide_bt = $("#setHide"); //setHide_bt
var menu = $("#menu");
var gametime = $("#gtime");
// 游戏配置器
var name = prompt("请输入您的名字吧:");
name ? name : name = " ";
var Game = {
    gameExcute: null,
    gameScore: 0,
    gameName: name,
    gamemodel: 0,
    time: 0
}

// function  删除数组中对象的方法
function delEleArray(arry, key, val) {
    for (var i = 0, item; item = arry[i++];) {
        // console.log(item);
        if (item[key] === val) {
            return arry.splice(i - 1, 1);
        }
    }
}

// 1. 炮   2.鱼 

/****
 * 1.实现炮台  当输入字符时显示在炮台上文字
 */
document.onkeydown = keydownHandler;

/**值的更正 */
window.onresize = function () {
    clientWidth = document.documentElement.clientWidth;
    ele_paoofftop = ele_pao.offsetTop;
}
//键盘监听事件 改变炮台
function keydownHandler(ev) {
    /**
     * 函数变量声明
     * e. 事件对象
     * keyCode 键入码
     */
    var e = ev || window.event;
    var keyCode = e.keyCode || which;
    var key = String.fromCharCode(keyCode);
    if (keyCode === 13) {
        menu.show();
    }
    if (keyCode >= 65 && keyCode <= 90) {
        // console.log(key, keyCode);
        ele_paofont.text(Game.gameName + "炮");
        createBullet(key); //炮台创建子弹
        // console.log(ele_paofont.html());
    }
}


// 创建子弹
function createBullet(key) {

    for (var i = 0, fish; fish = letterFishPool[i++];) {

        //发射子弹动作
        if (fish.name === key) {

            // 创建子弹容器
            var e_bullet = createElement({
                tagName: "div",
                attr: {
                    class: "bullet",
                    style: "left:" + ((clientWidth) / 2 - 15) + "px;" +
                        "top:" + (ele_paoofftop - 5) + "px;"
                },
                html: key
            });

            document.body.appendChild(e_bullet);

            Game.gameScore++;

            //如果有这条鱼 让他停下 给我打
            clearInterval(fish.clock);
            //打鱼
            // console.log(letterFishPool);
            throwFish(fish.id);
            // console.log(letterFishPool);
            //让子弹飞
            var fishx = fish.x;
            var fishy = fish.y;
            setTimeout(function () {
                e_bullet.style.left = fishx + 35 + "px";
                e_bullet.style.top = fishy() + 50 + "px";
            }, 5)
            var efish = fish.efish;
            // 删除动画;
            setTimeout(function () {
                efish.remove();
                e_bullet.remove();
            }, 300)

            ele_score.text(Game.gameScore + "分");


            // 封装的Timer 局限
            // console.log(fish,fish.y());
            // Timer(function (count,interval,fish) {
            //     console.log(fish);
            //     fish.e.remove();
            //     e_bullet.remove();
            // },1,fish);
        }
    }
}



// 鱼

// 1.创建一条鱼
function createFish(key, id) {
    /***
     * 创建鱼的容器
     */
    var fish_poinx = randomNumber(clientWidth - 100);
    var fish_poiny = 0; //上偏移量
    var fish_clock = null; //动作计时器

    var e_fish = createElement({
        attr: {
            class: "fish",
            style: "top:0px;left:" + fish_poinx + "px;"
        },
        html: key
    });
    document.body.appendChild(e_fish);

    var fish_id = id; //fishID

    /***
     *创建鱼的动作计时器
     */

    //创建计时器 自动执行100 次自动回收停止,间隔为50 毫秒
    fish_clock = Timer(function (count) {
        fish_poiny += 5;
        e_fish.style.top = fish_poiny + "px";
        if (fish_poiny >= 500) {
            // 如果到了边界 销毁容器 
            e_fish.className += " die"; //添加类die
            throwFish(id);
            Game.gameScore--;
            ele_score.text(Game.gameScore + "分");
            // console.log(letterFishPool);
            Timer(function () {
                e_fish.remove(); //延迟执行一次 默认一秒 移除容器
            });
        }
    }, 100, 50);

    letterFishPool.push({
        id: fish_id,
        name: key,
        clock: fish_clock,
        efish: e_fish,
        x: fish_poinx,
        y: function () {
            return e_fish.offsetTop;
        }
    }); //在字母鱼池中放入鱼


    return fish_id;
}



// 2. 抛出鱼

function throwFish(id) {
    console.log(delEleArray(letterFishPool, "id", id)[0].name);
    // console.log(letterFishPool);
}


// 3 生成随机字母鱼池
function randomLetterFish(number, level) {
    var gameTimer = Timer(function (count) {
        Game.time = count;
        gametime.text("Time:" + count);
        var timeKey = Date.now();
        var randomChar = randomChars("A")
        createFish(randomChar, timeKey);
    }, number, level);
    return gameTimer;
}

// randomLetterFish(-1,800);



gameStart_bt.onclick = function () {
    var model = Game.gamemodel
    console.log("模式:"+model);
    switch (model) {
        case "-3":
            Game.gameExcute = randomLetterFish(-1, 100);

            break;
        case "-2":
            Game.gameExcute = randomLetterFish(-1, 400);
            break;
        case "-1":
            Game.gameExcute = randomLetterFish(-1, 600);
            break;
        case "0":
            Game.gameExcute = randomLetterFish(100, 800);
            break;
        case "1":
            Game.gameExcute = randomLetterFish(200, 600);
            break;
        case "2":
            Game.gameExcute = randomLetterFish(500, 200);
            break;
        default:
            Game.gameExcute = randomLetterFish(100, 800);
            break;
    }

}
gameStop_bt.onclick = function () {
    alert("游戏已暂停 继续请点击 【确定】！");
}

gameRestart_bt.onclick = function () {
    clearInterval(Game.gameExcute);
    location.reload();
    alert("游戏已经刷新 请重新开始玩吧");
}
setHide_bt.onclick = function () {
    menu.hide();
    alert("通过enter 键显示哦！");
}
gameSet_bt.onclick = function () {
    Game.gamemodel = prompt("-1,-2 无尽模式 0为 基础 1，2 速度加快");
}