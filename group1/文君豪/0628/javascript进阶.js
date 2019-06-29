//1.把插件放在匿名函数之中，确保不受其他插件影响

+function(window)
{

    // 策略列表;
	var strategyList = {
		"email": {
			reg: /^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i
		},
		"password": {
			reg: /^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i
		},
		// 可能是定制的;
		"username": {
			reg: /^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/
		}
    }
    

    ////主调用函数
    function validate(selector)
    {
        var parent = $(selector);
        var inputlist = parent.querySelectorAll("input[v-type]")
       // console.log(inputlist)

       for(var i=0, input ; input = inputlist[i++];)
        {
            
            input.addEventListener("blur" , validateText.bind(input,input.getAttribute("v-type")))
        
        }
    }




/////验证函数
    function validateText(type)
    {
      // console.log(this)
      //console.log(type)
      var value = this.value;
      
    }



    //////////选择器
    function $(selector)
    {
        var res = null;
        return (res = document.querySelectorAll(selector)).length==1 ? res[0] : res ;

    }


    ////匿名函数整体提升
    window.validate = validate;
}(window)//

