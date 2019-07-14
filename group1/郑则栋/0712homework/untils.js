class untils {
    /**
     * 
     * @param {*} url 
     * @param {*} param1 { }
     */
    static ajax(url, {
        data = {},
        type = 'get',
        dataType = 'text',
        callback = 'callback'
    }) {
        if (dataType === 'jsonp') {
            return untils.jsonp(url, data, callback);
        }
        return new Promise((resolve, reject) => {
            let xhr = null;
            XMLHttpRequest ? xhr = new XMLHttpRequest() : xht = new ActiveXObject("Mricosoft.XMLHTTP");
            let data_attr = '';
            console.log(xhr.readyState);
            for (let element in data) {
                data_attr += (data_attr.length > 0 ? '&' : '') + element + '=' + data[element];
            }
            type === 'get' ? (url += /\?/.test(url) ? '&' : '?' + data_attr + '&') : url;
            console.log(url);

            xhr.open(type, url);
            type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded") : "";
            xhr.send(type === 'get' ? '' : data_attr);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let res = xhr.responseText;
                    switch (dataType) {
                        case 'text': { res = typeof res === 'string' ? res : JSON.stringify(res); break; }
                        case 'json': { res = typeof res === 'string' ? JSON.parse(res) : res; break; }
                    }
                    // console.log(1);
                    resolve(res);
                }
                setTimeout(() => {
                    reject('time out');
                }, 8000);
            }
        });
    }
    /**
     * 可被ajax函数调用
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     */
    static jsonp(url, data, callback = 'callback') {
        return new Promise((resolve, seject) => {
            let GROBLE_FN = 'foo';
            window[GROBLE_FN] = function (res) {
                resolve(res);
            }
            let data_attr = '';
            for (let element in data) {
                data_attr += (data_attr.length > 0 ? '&' : '') + element + '=' + data[element];

            }
            url += /\?/.test(url) ? '&' : '?' + data_attr + '&' + callback + '=' + GROBLE_FN;
            console.log(url);

            let script = document.createElement('script');
            script.src = url;
            script.onload = function () {
                this.remove();
            }
            document.body.appendChild(script);
        })

    }

    /**
     * cookie 各种
     * @param {*} name 
     * @param {*} value 
     * @param {*} param2 
     */
    static cookie( 
        name , value ,
        { 
              expires,
              path ,
              domain,
              secure
        } = { }
  ){    
        // 获取cookie;
        if( arguments.length === 1){
              let a = document.cookie.split("; ");
              let res='';
              res = a.filter( item => item.split("=")[0] === name);
              return res.length === 0 ? "404NOT FOUND" : res[0].split("=")[1];
        }
        // 设置cookie;
        return (document.cookie = [
              name + "=" + value,
              expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + expires) && d ): "",
              path    ? ";path="    +  path   : "",
              domain  ? ";domain="  +  domain : "",
              secure  ? ";secure="  +  secure : ""
        ].join(""))
  }
  static reomvecookie(name,path=''){
        cookie(name,"",{
              path,
              expires:-1
        });
  }




}