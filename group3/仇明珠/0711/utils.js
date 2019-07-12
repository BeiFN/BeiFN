class Utils {
    static ajax(
        url,
        {
            type = "GET",
            data = {},
            contentType = "application/x-www-form-urlencoded"
        } = {}
    ) {
        return new Promise(function (resolve, reject) {
            var data_str = "";
            for (var attr in data) {

                data_str += `${data_str.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
            }
            var xhr = new XMLHttpRequest();
            xhr.open(type, url + (type === "GET" ? (/\?/.test(url) ? "&" : "?") + data_str : ""));
            type === "POST" ? xhr.setRequestHeader("Content-type", contentType) : "";
            xhr.send(type === "POST" ? data_str : null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText);
                }
                setTimeout(function () {
                    reject();
                }, 8000)
            }
        })
    }
}
