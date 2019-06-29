;+function (window){
	
	var regList = {
		"uName" : {
			reg : /^[\u4e00-\u9fa5a-z0-9_\-]{6,20}$/i
		},
		"passwd" : {
			reg : /^[\!\@\#\$\%\^\&\*\(\)\-a-z0-9_]{6,20}$/i
		},
		"email" : {
			reg : /^[0-9a-z][0-9a-z_]{5,17}@[0-9a-z]{2,10}(.com|.net)$/i
		},
		"realName" : {
			reg : /^[\u4e00-\u9fa5]{2,4}$/
		},
		"number" : {
			reg : /^\d+$/
		}
		
	}
	
	function validate(seletor,option){
		//用户自定义属性
		option ? Object.assign(regList,option) : "";
		var parent = $(seletor);

		var inputList = parent.querySelectorAll("input[v-type]");
		console.log(inputList);
		for(var i=0 , input; input = inputList[i++];  ){
			input.addEventListener("blur" , validateText.bind(input,input.getAttribute("v-type")));
		}
	}
	
	//正则验证
	function validateText(attrValue){
		// console.log(attrValue);
		//待优化
		if(regList[attrValue].reg.test(this.value)){
			if(/succ|erro/.test(this.className)){
				this.className = this.className.replace(/succ|erro/ , "succ")
			}else{
				this.className += (this.className)? " succ" : "succ";			
			}
			var hidDiv = document.createElement("div");
			hidDiv.id = "notice";
			hidDiv.innerText = "验证成功";
			this.parentNode.insertBefore(hidDiv,this);
			
		}else{
			if(/succ|erro/.test(this.className)){
				this.className = this.className.replace(/succ|erro/ , "erro")
			}else{
				this.className += (this.className)? " erro" : "erro";			
			}
			var hidDivv = this.parentNode.querySelector("#notice")
			hidDivv === "null" ? " " : hidDivv.innerText = "验证失败";
			
		}		
		
		if(this.getAttribute("v-level") && attrValue === "passwd"){
			validateLevel(this,this.value);
		}
		
		validateNumber(this , this.value);
	}
	
	//强度验证
	function validateLevel(ele , value){
		var lspan = document.getElementById("lspan");
		var level = 0;
		for(var i in value){
		    var asc = value.charCodeAt(i);
		    if( (asc>=65&&asc<=90) || (asc>=97&&asc<=122)){
		        level += 2;
		    }else if(asc>=48&&asc<=57){
		        level += 1;
		    }else if(asc>=35&&asc<=47){
		        level += 3;
		    }
		}	
		if(level <=8){
		    lspan.style.background = "#e00";
		    lspan.innerHTML = "弱";
		}else if(level >8 && level <17){
		    lspan.style.background = "#ee0";
		    lspan.innerHTML = "中";
		}else if(level >= 17){
		    lspan.style.background = "#0e0";
		    lspan.innerHTML = "强";
		}
	}
	
	//纯数字验证
	function validateNumber(ele , value){
		var bool = regList["number"].reg.test(value);
		console.log(bool);
		console.log(ele.getAttribute("v-number"));
		if(bool){
			if(ele.getAttribute("v-number") === "true"){
				console.log("成功");
			}else{
				console.log("失败");
			}
		}else{
			if(ele.getAttribute("v-number") === "true"){
				console.log("失败");
			}else{
				console.log("成功");
			}
		}
	}
	
	function $(seletor){
		var res = null;
		return (res = document.querySelectorAll(seletor)).length === 1 ? res[0] : res;
	}
	
	//局部变量validate赋值给window，让validate全局可访问
	window.validate = validate ;
}(window)