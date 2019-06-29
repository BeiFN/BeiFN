; + function(window) {
	//reg
	var strategyList = {
		"email": {
			reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
		},
		"password": {
			reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
		},
		"username": {
			reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
		}
	}
	//judge

	function validate(selector, obj) {
		obj?insertPbject(obj):"";
		var element1 = document.querySelectorAll(selector + " input[v-type]");
		for (var i = 0, input; input = element1[i++];) {
			input.addEventListener("blur", judgeSomething.bind(input));
			// console.log(input.getAttribute("v-strong"),input);
		}
	}
	//判断是否符合规定
	function judgeSomething() {
		var v_type = this.getAttribute("v-type");
		var value = this.value;
		// console.log(strategyList[v_type])
		if (strategyList[v_type].reg.test(value)) {
			// this.style = "background:green";
			judgeSuccess(this, "success");
		} else {
			// this.style = "background:red";
			judgeSuccess(this, "error");

		}
		this.getAttribute("v-strong") ? judgeStrong(this) : "";
		this.getAttribute("allnumber") ? judgeture(this) : "";
	}

	function judgeSuccess(ele, bool) {
		if (/error|success/.test(ele.className)) {
			ele.className = ele.className.replace("/error|success/", bool)
		} else {
			ele.className += " " + bool;
		}
	}

	function judgeStrong(ele) {
		var count = 0;
		if (/\d/.test(ele.value)) {
			count++;
		}
		if (/[a-z]/i.test(ele.value)) {
			count++;
		}
		if (/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(ele.value)) {
			count++;
		}
		switch (count) {
			case 0:
				addClass(ele, "middle");
				break;
			case 1:
				addClass(ele, "middle");
				break;
			case 2:
				addClass(ele, "middle");
				break;
			case 3:
				addClass(ele, "high");
				break;
			default:
				addClass(ele, "low");
		}
	}

	function addClass(ele, grade) {
		if (/v-strength\-(low|middle|high)/.test(ele.className)) {
			ele.className = ele.className.replace("/v-strength\-(low|middle|high)/", "/v-strength\-/" + grade);
		} else {
			ele.className += " v-strength-" + grade;
		}
	}
		var cp=document.createElement("span");
	function judgeture(ele) {
		if (ele.getAttribute("allnumber")?/^\d+$/.test(ele.value):(!(/^\d+$/.test(ele.value)))) {
			cp.innerText="成功";
			ele.parentNode.insertBefore(cp,ele);
		}
		else{
			cp.innerText="失败";
			ele.parentNode.insertBefore(cp,ele);
		}

	}
//传入obj插入数组
	function insertPbject(obj){
		for(var obj1 in obj){
			strategyList[obj1]=obj[obj1];
		}
		console.log(strategyList);
	}




	window.validate = validate;
}(window)
