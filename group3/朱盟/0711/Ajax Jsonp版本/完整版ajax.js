function ajax(url, {
    type = "get",
    dataType = null,
    async = true,
    contentType = "application/x-www-form-urlencoded",
    jsonp = null,
    jsonpCallback = null,
    data = null,
    timeout = false,
    error = error => console.log("Request Error:" + error),
    success = data => console.log("Request Success ", data)
} = {}) {
    return new Promise(function (resolve, reject) {
        type = type.toUpperCase();
        let isGet = Boolean(type === "GET"); // 获取请求类型
        let isJsonP = Boolean(jsonp && jsonp.length > 0) //是否JSONP
        let sendOBJ = null; //初始化发送字符串
        //生成数据提交字符串 和 URL;
        if (data && typeof data === "object" && Object.keys(data).length > 0) {
            let dataStr = "";
            for (const key in data) {
                dataStr.length > 0 ? dataStr += `&${key}=${data[key]}` : dataStr +=
                    `${key}=${data[key]}`;
            }
            isGet || (isJsonP) ? (url += "?" + dataStr) : sendOBJ = dataStr;
        }
        // 如果是Jsonp
        if (isJsonP) {
            let script = document.createElement("script");
            script.onload = function () {
                this.remove();
            }
            let jsonpCallbackName = (jsonpCallback ? jsonpCallback : "jsonpCallback" + Date.now());
            url += (/\?/.test(url) ? "&" : "?") + jsonp + "=" + jsonpCallbackName;
            window[jsonpCallbackName] = function (res) {
                switch (dataType) {
                    case "json":
                        typeof res === "string" ? res = JSON.parse(res) : "";
                        break;
                    case "text":
                        typeof res === "string" ? "" : res = JSON.stringify(res);
                    default:
                        break;
                }
                resolve(res);
            }
            script.src = url;
            document.body.appendChild(script);
        } else { // 正常的AJAX  请求
            let xhr = new XMLHttpRequest();
            xhr.open(type, url, async);
            xhr.setRequestHeader("Content-type", contentType);
            xhr.send(sendOBJ);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let res = xhr.responseText;
                    switch (dataType) {
                        case "json":
                            typeof res === "string" ? res = JSON.parse(res) : "";
                            break;
                        case "text":
                            typeof res === "string" ? "" : res = JSON.stringify(res);
                        default:
                            break;
                    }
                    resolve(res);
                    typeof success === "function" ? success(res) : "";

                } else if (xhr.status != 200) {
                    typeof error === "function" ? error(xhr.responseText) : "";
                    reject(xhr.responseText);
                }
            }
        }
        if (Number(timeout) === 0 || isNaN(Number(timeout))) {} else {
            setTimeout(() => reject("The Request Timeout"), timeout);
        }
    });
}