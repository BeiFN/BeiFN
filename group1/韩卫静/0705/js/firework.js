let {randomColor} = Utils;
				
class displayFirework{
	constructor() {
		this.skyPart = document.getElementById("sky");
		if(this.skyPart === null){ return false};
		this.init();
	}				
	init(){
		var callbackBoom = null;
		//添加点击事件,并将爆炸函数用参数的形式传入,改变爆炸函数的this指向,便于后续调用
		this.skyPart.addEventListener("click" , this.fireworkClickStart.bind(this) );
	}
	fireworkClickStart(evt){
		var e = evt || window.event ;
		var offsetx = e.offsetX;
		var offsety = e.offsetY;
		
		var fw = this.fireworkInit(offsetx);
		this.fireworkMove( fw ,offsety , this.fireworkBoom.bind(this , offsetx, offsety))
	}
	
	fireworkInit(offsetx){
		var fw = this.createFirework();
		fw.style.left = offsetx + "px";
		fw.style.bottom = 0;
		this.skyPart.appendChild(fw);
		return fw;
	}
	
	createFirework(){
		var fw = document.createElement("div");
		fw.className = "firework";
		fw.style.background = randomColor();
		
		return fw;
	}
	fireworkMove( fw , offsety ,callbackBoom ){	
		displayFirework.move(fw,{
			top : offsety
		},function(){
			fw.remove();
			callbackBoom();
		})
	}
	
	fireworkBoom( offsetx, offsety){					
		var fwCount = 15;
		var blank = Math.round(360 / fwCount);
		var r = 100 + Math.round(Math.random()*100);
		var angel = 0 ;
		
		for(var i = 0; i < fwCount ; i++){
			angel += blank;
			var targetX = Math.round( Math.cos( Math.PI / 180 * angel) * r ) + offsetx;
			var targetY = Math.round( Math.sin( Math.PI / 180 * angel) * r ) + offsety;
	
			var fw = this.createFirework();
			fw.style.left = offsetx + "px";
			fw.style.top = offsety + "px";
			this.skyPart.appendChild(fw);
			displayFirework.move(fw , {
				"left" : targetX,
				"top" : targetY,
				"opacity" : 20
			}, function(fw){
				fw.remove();
			}.bind(false , fw))
			//如果直接用fw,会出错,因为运动是异步的,运动时循环已经执行完毕,将fw绑定给move的回调函数,可使每个fw都独立在回调函数中;
		}
	}
	
	static move(dom, options , callBack){
		clearInterval(dom.timer);
		dom.timer = setInterval(function(){				
			for(var attr in options){
				// console.log(attr , options[attr])
				var inow = attr === "opacity"? parseInt(getComputedStyle(dom)[attr]*100) :parseInt(getComputedStyle(dom)[attr]);
				var speed = (options[attr] - inow) / 10;
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
				
				if(options[attr] === inow){
					delete options[attr];
					if(Object.keys(options).length === 0){
						clearInterval(dom.timer);
						callBack();
					}							
				}else{
					if(attr === "opacity"){
						dom.style[attr] = (inow + speed) /100 ;
					}else{
						dom.style[attr] = (inow + speed) + "px" ;
					}
				}
			}
		}, 50)
	}
}

new displayFirework();