//1.把插件放在匿名函数之中，确保不受其他插件影响

+function(window)
{
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
      console.log(type)
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

