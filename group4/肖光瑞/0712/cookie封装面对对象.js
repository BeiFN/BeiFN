class Utils {
    constructor() {

    }
    static cookie(
        name, value,
        {
            expires,
            path,
            domain,
            secure
        } = {}
    ) {
        let d = null;
        //获取cookie
        if (arguments.length === 1) {
            // console.log(document.cookie)
            let [a, res] = [document.cookie.split("; "), ""];
            // console.log(a)
            // for (let i = 0, item, itemArr; item = a[i++];) {
            //     // itemArr = item.split("=");
            //     // console.log(itemArr)
            //     if ((itemArr = item.split("="))[0] === name) {
            //         // console.log(itemArr[1]);
            //         return itemArr[1];
            //     }
            // }
            res = a.filter(item => item.split("=")[0] === name);
            return res.length === 0 ? "" : res[0].split("=")[1];
        }
        return (document.cookie = [
            name + "=" + value,
            expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + expires) && d) : "",
            path ? ";path=" + path : "",
            domain ? ";domain=" + domain : "",
            secure ? ";secure=" + secure : ""
        ].join(""))
    }
    static removeCookie(name, path = "") {
        Utils.cookie(name, "", {
            path,
            expires: -1
        })
    }
}