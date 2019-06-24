var ele_pao = $("#pao");
var ele_pao_text=ele_pao.children[0];
var clientWidth=document.documentElement.clientWidth;
var letterArray=[];


function $(selector){
	var ele=null;				   
	return (ele=document.querySelectorAll(selector)).length===1 ? ele[0] : ele;
}


function handlerEnterLetter(evt){
	var e= evt||window.event;
	var keyCode=e.keyCode || e.which;
	
	if(keyCode>=65 && keyCode<=90){
		keyCode=String.fromCharCode(keyCode);
		ele_pao_text.innerHTML=keyCode;		
	}
}



function createRandomLetter(){
	
	var randomLetter=String.fromCharCode(65+Math.round(Math.random()*25));
	var randomLeft=Math.round(Math.random()*(clientWidth-100));	
	
	var ele=document.createElement("div");
	ele.className="fish";
	ele.innerHTML=randomLetter;
	ele.style.top=0;
	ele.style.left=randomLeft+"px";
	document.body.appendChild(ele);		

	var timer=eleMove(ele);	
	
	letterArray.push({	
		timer:timer,	
		letter:randomLetter,	
		left:randomLeft,	
		ele:ele	 
	})	
}

//
var count=0,count1=0;
var rightValue = document.getElementById("right");
var wrongValue = document.getElementById("wrong");
var scoresValue = document.getElementById("scores");

function createBullet(evt){
	var e = evt || window.event;
	var key=String.fromCharCode(e.keyCode || e.which);
	
	var ele=document.createElement("div");		
	ele.className="bullet";
	ele.style.left=clientWidth/2-15+"px";
	ele.style.top=ele_pao.offsetTop-30+"px";
	
	document.body.appendChild(ele);
	
	for (var i=0,rec; rec=letterArray[i++];) {
		// 总数
		count++;
		if(rec.letter === key){	
			// 正确的数
			count1++; 
			rightValue.setAttribute("value",count1);
			scoresValue.setAttribute("value",count1);
			 
			clearInterval(rec.timer);		
			removeRecord(rec.ele);
			
			setTimeout(function(){		
				ele.style.left=rec.left+35+"px";
				ele.style.top=rec.ele.offsetTop+50+"px";
			},5)
			
			setTimeout(function(){
				rec.ele.remove();	
				ele.remove();		
			}, 800)

			break;	
		}
		else{	// 错失的个数
			wrongValue.setAttribute("value",count-count1);
		}
		
		
	}

}


function removeRecord(ele){
	for (var i=0,rec; rec=letterArray[i++];) {
		if(ele === rec.ele)
		{
			letterArray.splice(i-1,1);
			break;	
		}
	}
}


function eleMove(ele){
	var numTop=0;
	var timer=null;
	timer=setInterval(function(){
		numTop+=5;
		ele.style.top=numTop+"px";
	
		if(numTop >= 400){
			clearInterval(timer);
			timer=null;
			ele.className += " die"; 
			setTimeout(function(){
				removeRecord(ele);	
				ele.remove();
			},1000)
		}
	},50)
	
	return timer;	
}



window.onresize=function () {
	clientWidth=document.documentElement.clientWidth;
}

document.onkeydown=function(evt){	
	handlerEnterLetter(evt);
	createBullet(evt);
}

var timerLetter=null;
timerLetter=setInterval(createRandomLetter,1000);

// 重新开始
restart.onclick=function(){
	location.reload(true);
}

//  倒计时:3分钟
countdown.onclick=handlerCountDown;
function handlerCountDown(){
	var now=new Date().getTime();
	var target=now+3*60*1000;
	
	timercount=setInterval(function (){getCount(target)},1000);
	
}
var timercount=null;
function getCount(target){
	var now=new Date().getTime();
	var difference=target-now;
	
	var minute= Math.floor(difference/1000/60%60);
	var second= Math.floor(difference/1000%60);
	var timeStr="00:"+(minute<10?"0"+minute:+""+minute)+":"+(second<10?"0"+second:+""+second);
	
	// 倒计时完毕，终止游戏
	if(timeStr==="00:00:00"){
		clearInterval(timerLetter);
		timerLetter=null;
		timeStr="00:00:00";
		clearInterval(timercount);
		timercount=null;
	} 
	
	var timeoutValue=document.getElementById("timecount");
	timeoutValue.value=timeStr;
}

stopplay.onclick=function(){
	clearInterval(timerLetter);
}

// 难度级别选择
var radios = document.getElementsByName("level");
for ( var i = 0; i < radios.length; i++) {
	radios[i].onchange = function(){
		if(easy.checked){
			clearInterval(timerLetter);
			timerLetter=setInterval(createRandomLetter,2000);
		}
		if(middle.checked){
			clearInterval(timerLetter);
			timerLetter=setInterval(createRandomLetter,1500);
		}
		if(hard.checked){
			clearInterval(timerLetter);
			timerLetter=setInterval(createRandomLetter,800);
		}	
	}

}

