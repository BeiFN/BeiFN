;;
(function($){
    
    var cookie = $.cookie = function (name, value, options) {
        // 获取cookie;
        if (arguments.length === 1) {
            var a = document.cookie.split("; ");
            var res = "";
            //let [a, res] = [document.cookie.split("; "), ""];
            //res = a.filter(item => item.split("=")[0] === name);
            //return res.length === 0 ? "" : res[0].split("=")[1];
            $.each(a, function (index, item) {
                if (item.split("=")[0] === name) {
                    res = item.split("=")[1];
                }
            })
            return res;
        }

        // 判断options
        options === undefined ? options = {} : "";

        // 设置cookie;
        return (document.cookie = [
            name + "=" + value,
            options.expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + options.expires) && d) : "",
            options.path ? ";path=" + options.path : "",
            options.domain ? ";domain=" + options.domain : "",
            options.secure ? ";secure=" + options.secure : ""
        ].join(""));
    }
    // 删除cookie;
    $.removeCookie = function (name, path) {
        $.cookie(name, "", {
            path: path ? path : "",
            expires: -1
        });
    }

})(jQuery)