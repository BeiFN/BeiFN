// xhr发送GET/POST请求  参数：路径 [数据] ["POST"]  默认GET
function ajax(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest(),
            lastArg = arguments[arguments.length - 1],
            str = "";
        // 是否传入数据,拼接数据
        if (data && typeof data === "object") {
            for (let key in data) {
                str += `&${key}=${data[key]}`;
            }
            str = str.slice(1); // 删去字符串开头
        }
        // 是否为POST
        if (typeof lastArg === "string" && lastArg.toLowerCase() === "post") {
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(str);
        } else {
            // 地址中是否有数据,拼接入地址
            xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + str);
            xhr.send(null);
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.status);
            }
        }
    })
}