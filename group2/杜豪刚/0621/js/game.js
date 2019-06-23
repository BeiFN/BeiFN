//获取大炮的ID
var ele_pao=$("#pao");
//获取大炮里span的ID
var ele_text=ele_pao.children[0];
//获取屏幕的宽度
var clientWidth=document.documentElement.clientWidth;
//获取一个随机存储字母的数组
var letterArray=[];
//获取分数
var score=$("#score");
//获取倒计时时间
var ipt=prompt("请输入游戏时间,如果不设置，默认为60s");
// 倒计时
var time=$("#time");
// 重新开始
var isrepeat=$("repe"); 
//分数初始值0              
var count=0;

//用户点击重新开始时，刷新页面
// isrepeat.onclick=function(){
//     history.go(0) 
// }

//用户得分
ipt === null ? ipt=60 : ipt;                 //判断用户输入的时间
time.innerHTML=ipt;                           //显示到time里
    function getTime(){
        ipt-=1;
       time.innerHTML=ipt;
       if(ipt <= 0){                          //时间结束时
            clearInterval(setTime);                 //关闭定时器
            clearInterval(play);                    //关闭继续出现的鱼
            repeat();
       }
   }
var setTime=setInterval(getTime,1000);

//创建一个$函数，获取ID
function $(select){
    var ele=null;
    return (ele=document.querySelectorAll(select)).length ===1 ?ele[0]:ele;
}

document.onkeydown=function(evt){
    handEnter(evt);
    createBullet(evt);
};

//1.向炮台输入内容
function handEnter(evt){
    var e = evt || event;
    var eleCode = e.keyCode || e.which;                  //获取Code码
    if(eleCode >=65 && eleCode<=90){
        eleCode = String.fromCharCode(eleCode);         //获取字符
        ele_text.innerHTML=eleCode;
    }
}

//2.随机出现的鱼
function createRandomLetter(){
    var randomCode = Math.round(Math.random()*25)+65;               //获取a-z的Code码
    var randomLetter = String.fromCharCode(randomCode);             //随机获取a-z字符
    var randomLeft = Math.round(Math.random()*(clientWidth-100));   //获取随机距左的宽度
    var ele=document.createElement("div");                          //创建div
    ele.className = "fish";                                         //添加css样式
    ele.style.left = randomLeft+"px";
    ele.style.top = 0;
    ele.innerHTML = randomLetter;                                   //获取随机字符
    document.body.appendChild(ele); 
    var timer = eleMove(ele);                                       //调用移动的鱼
    //timer     用来关闭定时器终止鱼的运动
    //ele       用来删除元素  
    //letter    用来判定
    //left      用来给炮弹制造目标
    letterArray.push({
        timer:timer,
        ele:ele,
        letter:randomLetter,
        left:randomLeft,
    });
}
var play=setInterval(createRandomLetter,1200);

// 3.从天而降的鱼
function eleMove(ele){
    var numTop=0;
    var timer=null;
    timer = setInterval(function(){
        numTop+=5;
        ele.style.top=numTop + "px";
        if(numTop >= 580){
            //当鱼下降的高度到达点时，清除定时器
            clearInterval(timer);
            timer=null;
            ele.className+="die";
            //动画执行0.1s后删除鱼
            setInterval(function(){
                removeCount(ele);
                ele.remove();
            },100);
        }
    },100);
    return timer;
}

// 4.创建飞行的子弹
function createBullet(evt){
    var e = evt || event;
    var key = e.keyCode || e.which;                     //获取Code码
    if(key >=65 && key<=90){
        key = String.fromCharCode(key);                 //创建输入的子弹的字符
        var ele=document.createElement("div");
        var scoreText=score.innerHTML;                  //分数初始值0
        ele.className="bullet";
        ele.style.left=clientWidth/2-15+"px";
        ele.style.top=ele_pao.offsetTop-30+"px";
        document.body.appendChild(ele);
        //判断是否存在相应的字符
        for(var i = 0 ,rec ; rec = letterArray[i++]; ){
            // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
            if(rec.letter === key){
                clearInterval(rec.timer);
                removeCount(rec.ele);
                // 给子弹设置一个位置;
                setTimeout(function(){
                    ele.style.left = rec.left + 35 + "px";
                    ele.style.top  = rec.ele.offsetTop + 50 + "px";
                },10)
                // 删除动画;
                setTimeout(function(){
                    rec.ele.remove();
                    ele.remove();
                    count=count+10;
                    console.log(count);
                    score.innerHTML=Number(scoreText)+Number(10);     //答对每次增加10分
                },600)
                break;
            }else{
                console.log(count);
                score.innerHTML=Number(scoreText)-Number(10);         //答错每次减去10分
            }   
        }
    }
}

// 5.删除记录
function removeCount(ele){
    for(var i = 0 , rec ; rec = letterArray[i ++] ;){
        if(rec.ele === ele){
             letterArray.splice(i-1,1);
             break;
        }
   }
}

// 6.是否再来一局
function repeat(){
    var bool=confirm("游戏结束，你最后的得分为："+ count +"分\n"+"你还想要再来一局Game吗 ? ");
    if(bool){
        location.reload();
    }
}