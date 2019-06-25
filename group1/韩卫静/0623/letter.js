/**
 * 
 * 打字游戏
 * ele_bow 弓箭发射器
 * clientWid 可视窗口宽度
 * clientHei 可视窗口高度
 * letterList 存储随机字母的信息，用于按键时字母的匹配
 */
var ele_bow = document.getElementById("bow");
var clientWid = document.documentElement.clientWidth;
var clientHei = document.documentElement.clientHeight;
var restartBtn = document.getElementById("restart");
var stopBtn = document.getElementById("stopgame");
var levelList = document.getElementsByName("level");
var misscount = 0;
var rightCount = 0;
var letterList = [];

console.log(levelList);

//弓箭的文字显示功能
function enterLetter(evt){
    var e = evt || window.event;
    e = e.keyCode || e.which;
    if(e >=65 && e <= 90){
        var letter = String.fromCharCode(e);
        var sp = ele_bow.children[0];
        sp.innerHTML = letter;
    }
    // console.log(letter)
}

//创建随机位置的字母容器
function createRandomLetter(){
    var letter = String.fromCharCode(65 + Math.round(Math.random()*25));
    var newDiv = document.createElement("div");
    newDiv.className = "heart";
    newDiv.innerText = letter;
    var leftW = Math.round(Math.random()*(clientWid-80));
    newDiv.style.left = leftW + "px";
    document.body.appendChild(newDiv);
    var timer_letter = eleMove(newDiv);
    letterList.push({
        timer : timer_letter,
        element : newDiv,
        value: letter,
        left :leftW
    });
}

//清除数组相关元素数据
function removeEle(ele){
    for(var i in letterList){
        if(letterList[i].element === ele){
            letterList.splice(i,1);
            break;
        }
    }
}

//设置字母容器按时间向下移动
function eleMove(ele){
    var hei = 0;
    var timer = null;
    ele.style.top = hei + "px";
    timer = setInterval(function(){
        hei += 5;
        ele.style.top = hei + "px";
        if(hei >= 530){
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            ele.innerHTML = "";
            misscount ++;
            countPrint();
            setTimeout(function(){
                //清除数组该项元素
                removeEle(ele);
                //删除元素
                ele.remove();
            },500);
        }
    },50);
    return timer;
}

//创建箭,判断是否击中，并删除击中的元素
function createArrow(evt){
    var e = evt || window.event;
    e = e.keyCode || e.which;
    var letter = String.fromCharCode(e);
    
    // var newArrow = document.createElement("div");
    // newArrow.className = "arrow";
    // newArrow.style.top = clientHei - ele_bow.offsetTop + "px";
    // newArrow.style.left = clientWid/2 - 75 + "px";
    // document.body.appendChild(newArrow);

    for(var i= 0 ,rec ; rec = letterList[i++] ;){
        if(rec.value === letter){
            clearInterval(rec.timer);
            rightCount++;
            rec.element.className += " die";
            rec.element.innerHTML = "";

            setTimeout(function(){              
                removeEle(rec.element);
                rec.element.remove(); 
            },500);
            break;
        }
    }
}

//记录击中的数量
function countPrint(){
    right_count.innerHTML = rightCount;
    miss_count.innerHTML = misscount;
}

//重新开始游戏，判断游戏难度;
function reStartGame(){
    var level = "1";
    for(var ipt = 0; ipt < levelList.length; ipt++){
        if( levelList[ipt].checked){
            level =  levelList[ipt].value;
        }
    }

    switch(level){
        case "1" :
            return 1000;
            break;
        case "2" :
            return 500;
            break; 
        case "3" :
            return 300;
            break;
        default :
            return 1000;
    }
}

//键盘按下触发一系列on事件
document.onkeydown = function(evt){
    enterLetter(evt);
    createArrow(evt);
    countPrint();
};
//窗口大小改变触发事件
window.onresize = function(){
    clientWid = document.documentElement.clientWidth;
    clientHei = document.documentElement.clientHeight;
}

//重新开始按钮点击事件
restartBtn.onclick = function(){
    clearInterval(mytimer);
    
    location.reload(true);
}
stopBtn.onclick = function(){
    clearInterval(mytimer);
    var bools =  confirm("正确："+rightCount+"个，漏掉"+misscount + "个" +"\n 是否继续游戏？ ");
    if(bools){
        location.reload(true);
    }else{
        window.close();
    }
}

//按时间创建包含随机字母的容器
var mytimer =  setInterval(createRandomLetter,1000);

for(var ipt = 0; ipt < levelList.length; ipt++){
    levelList[ipt].onchange = function(){
        var interval = reStartGame();
        clearInterval(mytimer);
        mytimer = setInterval(createRandomLetter,interval);   
    }
}
