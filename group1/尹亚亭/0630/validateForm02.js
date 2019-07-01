; + function(window) {
	// 策略列表;
	var strategyList = {
		"email": {
			reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
		},
		"password": {
			reg: /^[\!\@\#\$\%\^\&\*\(\)\?\\\~0-9a-z_\-]{6,}$/i
		},
		"username": {
			reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
		}
	}

	// 给用户一个高级选项;
	function validate(selector, options) {
		options ? Object.assign(strategyList, options) : "";
		var parent = $(selector);
		var inputList = parent.querySelectorAll("input[v-type]");
		for (var i = 0, input; input = inputList[i++];) {
			input.addEventListener("blur", handlerBlur.bind(input, input.getAttribute("v-type")));
		}
	}

	// 验证函数;
	function handlerBlur(type) {
		
		if (!strategyList[type]) {
			return false;
		}
		// 取值
		var value = this.value;	
		// 正则判断并给予一定的反馈
		validateText(type,value,this);
		//密码的强度验证
		type === "password" && this.getAttribute("v-strength") ? validateStrength(value, this) : "";
		// 是否为纯数字的验证
		if (type==="username") {
			validatePurenumbers(value, this, this.getAttribute("v-purenumbers") === "true" ? true : false);
		}
		
	}
	
	var span=document.createElement("span");
	// 去重
	function validateText(type,value,ele){
	// 	// (规则=>正则)  反馈=>正确还是错误
		if( strategyList[type].reg.test(value) )
		{	
			addValidateState(" success",ele);
			// 创建成功时的span样式
			span.style.cssText="display:block;width:80px;background:lightpink";
			span.innerText="成功啦！";
		}else{
			addValidateState("error",ele);
			// 创建失败时的span样式
			span.style.cssText="display:block; width:80px;background:lightblue";
			span.innerText="不对呦！";
		}
		ele.parentNode.insertBefore(span,ele);
	}
	span.remove();

	// 验证状态的添加;
	function addValidateState(type, ele) {
		if (/success|error/.test(ele.className)) {
			ele.className = ele.className.replace(/success|error/g, type);
		} else {
			ele.className += " " + type;
		}
	}

	// 密码强度的验证
	function validateStrength(value, ele) {
		var score = 0;
		if (/\d/.test(value)) {
			score++;
		}
		if (/[a-z]/i.test(value)) {
			score++;
		}
		if (/[\!\@\#\$\%\^\&\*\(\)\?\\\~\-_]/.test(value)) {
			score++;
		}

		switch (score) {
			case 0:
				addStrengthState("low", ele);
				break;
			case 1:
				addStrengthState("low", ele);
				break;
			case 2:
				addStrengthState("middle", ele);
				break;
			case 3:
				addStrengthState("high", ele);
				break;
			default:
				addStrengthState("low", ele);
		}
	}

	//去重
	function addStrengthState(level, ele) {
		if (/v-strength-(low|middle|high)/.test(ele.className)) {
			ele.className = ele.className.replace(/v-strength-(low|middle|high)/, "v-strength-" + level);
		} else {
			ele.className += " v-strength-" + level;
		}
	}

	// 验证用户名是否可以选择为纯数字
	function validatePurenumbers(value, ele, bool) {
		  if(bool){
		      if(/^\d+$/.test(value)){
		            console.log("成功");
		      }else{
		            console.log("失败");
					addValidateState(" error",ele);
		      }
		}else{
		      if(/^\d+$/.test(value)){
		            console.log("失败");
					addValidateState(" error",ele);
		      }else{
		            console.log("成功");
		      }
		}
	}


	// 封装元素选择器
	function $(selector) {
		var res = null;
		return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
	}
	
	// 验证信息填写是否完整
	btn.onclick=function(){
		var inputList = $("input");
		for (var i = 0, input; input = inputList[i++];) {
			// console.log(input.value);
			if(input.value===""){
				alert(input.getAttribute("v-type")+"是必选项，请填写完整！");
			}
		}
	}
	
	
	window.validate = validate;
}(window)
