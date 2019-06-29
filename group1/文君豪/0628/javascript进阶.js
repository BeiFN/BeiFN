//1.把插件放在匿名函数之中，确保不受其他插件影响

+function(window)
{
    function validate()
    {
        console.log("1")
    }
    function $(selector)
    {
        var res = null;
        return (res = document.querySelectorAll(selector)).length==1 ? res[0] : res ;

    }
    window.validate = validate;
}(window)//

