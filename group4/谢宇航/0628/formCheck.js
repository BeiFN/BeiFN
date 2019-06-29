;+function (window) {
	//正则
	var strategyList = {
		"#usr" : {
			"reg" : /^[A-Za-z][A-Za-z0-9\_\-]{5,15}$/,
			"evt" : "blur",
			"warn" : "用户名不合法，请重新输入",
		},
		"#pwd" : {
			"reg" : /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,20}$/i,
			"evt" : "input",
			"warn" : "密码不能为纯数字或纯英文",
		},
		"#email" : {
			"reg" : /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i,
			"evt" : "blur",
			"warn" : "邮箱不合法，请重新输入",
		},
		"#names" : {
			"reg" : /^[A-Za-z\u4e00-\u9fa5]{2,15}$/,
			"evt" : "blur",
			"warn" : "名字不合法，请重新输入",
		},
		"#phone" : {
			"reg" : /^1[3-9]\d{9}$/,
			"evt" : "blur",
			"warn" : "手机号不合法，请重新输入",
		},
		"#pwd-rep" : {
			"evt" : "blur",
			"warn" : "密码不相同，请重新输入",
		},
		"#code" : {
			"reg" : new RegExp(codeWord, "i"),
			"evt" :"blur",
			"warn" : "验证码不正确，请重新输入",
		},
		"#test" : {
			"evt" : "click",
			"src" : "http://www.7xiwang.com/WebService/ImageValidateCode?code="
		},
		"window" : {
			"evt" : "load",
		}
	}

	//封装$获取元素方法
	function $(selector){
		var ele = null;
		return  (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
	} 

	//初始化验证函数
	function check() {   //options为程序可拓展接口
		for(var prop in strategyList){
			if($(prop).nodeType){    //如果为元素节点，则添加正常的监听事件，如果不是，则为window上的事件
				var ele = $(prop)
				ele.addEventListener(strategyList[prop].evt, handlerBlur.bind(ele));
			}
			else{
				window.addEventListener("load", loadHandler);
			}
		}
	}

	//事件处理函数
	function handlerBlur () {
		var value = this.value;
		if(this.id === "pwd-rep")     //确认密码验证
			checkpwdRep(this, value);
		else if(this.id === "pwd")    //密码验证
			checkpwd(this, value);
		else if(this.id === "test")    //图片点击
			clickHandler(this);
		else
			checkText(this, value);    //通用验证
	}

	//密码验证
	var pwdLevel = $("#pwd_level_tip").children;
	function checkpwd(ele, value) {
		strategyList["#pwd-rep"].pwd = value;     //将密码保存在确认密码的对象中
		var score = 0;
		if(/\d/.test(value)){
		score ++;
		}            
		if(/[a-z]/i.test(value)){
			score ++;
		}
		if(/[\!\@\#\$\%\^\&\*\(\)_\-]/.test(value)){
		    score ++;
		}
		switch(score){
			case 0 :
			    addStrengthState(0, "low");
			    break;
			case 1 : 
			    addStrengthState(0, "low");
			    break;
			case 2 : 
			    addStrengthState(1, "middle");
			    break;
			case 3 : 
			    addStrengthState(2, "high");
			    break;
			default :
			    addStrengthState(0, "low");
        }
        ele.addEventListener("blur", pwdLowWarning)
	}

	//密码强度太弱
	function pwdLowWarning() {
		if(pwdLevel[0].className === "low") {
			addValidateState("error", this);
		}
	}

	//密码强度实时显示
	function addStrengthState(level, state) {
		for(var i = 0; i < pwdLevel.length; i++){
			pwdLevel[i].removeAttribute("class");
		}
		pwdLevel[level].className = state;
	}

	//确认密码验证
	function checkpwdRep(ele, value) {
		if(value == (strategyList["#pwd-rep"].pwd))
			addValidateState("success",ele);
		else
			addValidateState("error",ele);
	}

	 //验证正则
	function checkText (ele, value) { 
		if(strategyList["#" + ele.id].reg.test(value))
			addValidateState("success",ele);
		else
			addValidateState("error",ele);
	}

	//添加警告框
	var warning = $("#warning");
	function addValidateState (type, ele) {
		if(/success|error/.test(ele.className)){
			ele.className = ele.className.replace(/success|error/g,type);
			warning.style.height = '0';
		}
		else{
			ele.className += " " + type;
			warning.textContent = strategyList["#" + ele.id].warn ? strategyList["#" + ele.id].warn : "";
            warning.style.height = "24px";
		}
	}

	//随机数
	var codeWord = "";
	function randomCode() {
        var arr = [];
        arr.length = 0;
        for(var i=0;i<123;i++){
            if(i<10){
                arr.push(i);
                continue;
            }
            if(i<65) continue;
            if(i<91){
                arr.push(String.fromCharCode(i));
                continue;
            }
            if(i<97) continue;
            arr.push(String.fromCharCode(i));
        }
        arr.sort(function () {
            return Math.random()-0.5;
        });
        arr.length=4;
        return arr.join("");
    }

    //图片初始化加载
	function loadHandler() {
        codeWord = randomCode();
        $("#test").src = "http://www.7xiwang.com/WebService/ImageValidateCode?code=" + codeWord;
    }

    //图片点击更换
    function clickHandler() {
        codeWord = randomCode();
        loadHandler();
    }

	window.check = check;

}(window)