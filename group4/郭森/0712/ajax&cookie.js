function ajax(url, {
    type = "GET",
    data = {},
    dataType = "text",
    cb_key = "cb"
} = {}) {
    return new Promise((resolve, reject) => {
        var [dataStr, urlAdd] = ["", /\?/.test(url) ? "&" : "?"];
        if (typeof data === "object") {
            for (let key in data) {
                dataStr += `&${key}=${data[key]}`;
            }
            dataStr = dataStr.slice(1);
        } else {
            dataStr = data;
        }// jsonp执行
        if (dataType === "jsonp") {
            let [cb_value, script] = [
                "gs" + Date.now(),
                document.createElement("script")
            ];
            window[cb_value] = function (res) {
                resolve(changeType(res));
                delete window[cb_value];
                cb_value = false;
            };
            script.onload = function () {
                this.remove();
            }
            script.src = url + urlAdd + cb_key + "=" + cb_value + "&" + dataStr;
            document.appendChild(script);
        } else {// xhr执行
            let xhr = new XMLHttpRequest();
            // POST执行
            if (type.toLowerCase() === "post") {
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(dataStr);
            } else {// GET执行
                xhr.open("GET", url + urlAdd + dataStr);
                xhr.send(null);
            }// 请求状态
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    xhr.status === 200 ? resolve(changeType(xhr.responseText)) : reject(xhr.status);
                }
            }// 改变返回数据类型
            function changeType(res) {
                switch (dataType) {
                    case "text": typeof res === "object" && (res = JSON.stringify(res));
                        break;
                    case "json": typeof res === "string" && (res = JSON.parse(res));
                        break;
                }
            }
        }
        setTimeout(() => {
            reject("timeout")
        }, 8000);
    })
}
function cookie(name, value, options) {
    var d, s, a;
    if (arguments.length === 1) {
        s = document.cookie;
        a = s.split("; ");
        for (var i = 0, item, itemA; item = a[i]; i++) {
            if ((itemA = item.split("="))[0] === name) {
                return itemA[1];
            }
        }
        return "";
    }
    cookie.remove = function (name, path) {
        return cookie(name) === "undefined" && cookie(name, "", { expires: -1, path: path ? path : "" });
    }
    typeof options === "object" ? "" : options = {};
    return (document.cookie = [
        name + "=" + value,
        options.expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + options.expires) && d) : "",
        options.path ? ";path=" + options.path : "",
        options.domain ? ";domain=" + options.domain : "",
        options.secure ? ";secure=" + options.secure : "",
    ].join(""));
}