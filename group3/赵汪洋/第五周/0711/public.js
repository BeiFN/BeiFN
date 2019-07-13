class Public {
    static myPromiseAjax(url, type, data) {
        return new Promise((resolve, reject) => {
            var xhr = null;
            if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
            else if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
            else throw "浏览器不支持ajax";
            var data_str = "";
            for (var attr in data) {
                data_str += (data_str.length > 0 ? "&" : "") + attr + "=" + data[attr];
            }
            type === "POST" ? "" : (url += data_str === "" ? "" : (/\?/.test(url) ? "&" : "?") + data_str);
            xhr.open(type ? type : "GET", url);
            type === "POST" ? xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded") : "";
            xhr.send(type === "POST" ? data_str : null);
            xhr.onreadystatechange = a => {
                if (xhr.readyState === 4 && xhr.status === 200) resolve(xhr.responseText);
            }
            setTimeout(() => {
                reject(xhr, "timeout");
            }, 8000);
        });
    }
}