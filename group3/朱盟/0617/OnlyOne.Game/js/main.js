var player = {
    step: 0,
    bgstep: 0,
    hp: 100,
    name: "宝宝",
    money: 10,
    love: 0,
    speed: 2
};
var Gamer = {
    msList: [],
    gameMslist: [],
    activeList: ["前跑", "后跑"],
    eventList: [{
            eName: "吃零食",
            harm: -2,
            money: -2,
            love: 0,
            speed: -2,
            desc: "吃零食一时爽，一直吃零食一直爽 ",
        }, {
            eName: "玩游戏",
            harm: 0,
            money: 0,
            love: 1,
            speed: -1,
            desc: "我Carry ,你 发育！ ",
        }, {
            eName: "睡觉",
            harm: -3,
            money: 0,
            love: 2,
            speed: 10,
            desc: " 从现在起，做幸福的人，面朝被子，头枕枕头！ ",
        }, {
            eName: "敲代码",
            harm: 2,
            money: 5,
            love: 0,
            speed: -1,
            desc: "作为程序猿，头怎么能不秃顶？",
        },
        {
            eName: "改名字",
            harm: 0,
            money: -2,
            love: 2,
            speed: 5,
            desc: "这个名字好酷啊！",
        }
    ],
    PlayerActiveList: [],
    iniMs: "有一天," + player.name + ",走在路上,感觉世界就剩下他一个人了,然后他就很孤独啊,开始摇摆！,但是这还不够,那怎么办呐？,nmm...,为了更有意思,他写起了日记！,....",
    isStart: false
}
document.onkeypress = function (ev) {
    console.log(ev.keyCode);
    var personDo = objectRandom(Gamer.eventList);
    switch (ev.keyCode) {
        case 100:
            player.step += player.speed;
            addMs(player.name + "突然加速，往前瞅了瞅: 竟然->", true);

            playerDoRes(personDo);
            break;
        case 97:
            player.step -= player.speed;
            addMs(player.name + "跑后面看了看:", true);
            playerDoRes(personDo);
            break;
    }
}

function Start() {
    Gamer.isStart = true;
    var iniMss = Gamer.iniMs.split(",");
    for (const key in iniMss) {
        Gamer.msList.push(iniMss[key]);
    }
}
var personTimer = setInterval(function () {
    if (Gamer.isStart) {
        personHandler();
        gameBGhandler();
    }

}, 100);


var msTimer = setInterval(function () {
    if (Gamer.isStart) {
        msHandler();
    }
}, 500);



//随机数
function randomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
}
// 随机对象
function objectRandom(o) {
    var i = randomNumber(0, o.length - 1);
    var count = 0;
    for (const key in o) {
        if (count === i) return o[key];
        count++;
    }
}


function personHandler() {
    if (player.step !== 300) {
        // player.step+=1;
        person.style.left = player.step + "px";
    } else {
        player.step = 300;
    }
}

function gameBGhandler() {
    player.bgstep += 1;
    // console.log(player.step);
    if (box.style.backgroundPositionX == "-120px") {
        player.bgstep = 0;
    }

    box.style.backgroundPositionX = "-" + player.bgstep + "px";
    addMs("走着...");
    //   console.log(box.style.backgroundPositionX);
}

function printMs(str, o) {
    var s = msbox.innerHTML;
    if (o) msbox.innerHTML = s + str + "<br/>"
    else msbox.innerHTML = s + str
}

function addMs(str, o) {
    if (o) Gamer.gameMslist.push(str);
    Gamer.msList.push(str);
}

function addMsClear(str) {
    Gamer.msList = [];
    Gamer.gameMslist = [];
}

function msHandler() {
    if (Gamer.gameMslist.length > 0) {
        printMs(Gamer.gameMslist[0], true);
        Gamer.gameMslist.shift();
    } else {
        if (Gamer.msList.length > 0) {
            printMs(Gamer.msList[0], true);
            Gamer.msList.shift();
        } else {
            // msbox.innerHTML="";
        }
    }
}


function playerDoRes(o) {

    if (player.speed >= 0) {
        player.speed += o.speed;
    } else {
        player.speed = 0;
    }
    if (player.hp > 0) player.hp -= o.harm
    else {
        addMs("快shi了", true)
    }
    player.money += o.money;
    player.love += o.love;
    addMs(player.name + "开始" + o.eName + "  ,还得意的说:" + o.desc, true);

    if (o.eName === "改名字") {
        var cn = prompt("改个新名字吧？", player.name);
        player.name = cn;
        addMs("名字改变,名字修改成:" + player.name, true);
    }

    if (o.speed !== 0) {
        addMs("速度改变，当前速度:" + player.speed, true);
    }
    if (o.harm !== 0) {
        addMs("血量改变，当前血量:" + player.hp, true);
    }
    if (o.money !== 0) {
        addMs("金币改变，当前金币:" + player.money, true);
    }
    if (o.love !== 0) {
        addMs("爱心改变，当前爱心:" + player.love, true);
    }
}

// function ()


//消息动态滚动条显示
(function () {
    var parent = document.getElementById('msboxp');
    var child1 = document.getElementById('msbox');
    setInterval(function () {
        if (parent.scrollTop >= child1.scrollHeight) {
            parent.scrollTop = 0;
        } else {
            parent.scrollTop++;
        }
    }, 10);
})()


ok.onclick = function () {
    Start();
}
reok.onclick = function () {
    Start();
    player = {
        step: 0,
        bgstep: 0,
        hp: 100,
        name: "宝宝",
        money: 10,
        love: 0,
        speed: 2
    };
}