/**
 *  commonjs 函数库 
 *  v 0.1.0 
 *  by. huaizhiY
 *  date : 2019/7/5
 * 
 *  */


class Utils {
      /**
       * @function randomRGBAColor 
       * 作用 : 返回 rgba()字符串，随机颜色。
       */
      static getRandomColor(type) {
            if (type === "rgba") {
                  var r = Math.round(Math.random() * 255);
                  var g = Math.round(Math.random() * 255);
                  var b = Math.round(Math.random() * 255);
                  var a = Math.random().toFixed(2);
                  return "rgba(" + r + "," + g + "," + b + " ," + a + ")";
            } else {
                  return "#" + Math.round(Math.random() * parseInt("ffffff", 16)).toString(16).padStart(6, "0");
            }
      }
      /**
       * getCountDown(year,month,date[,hour,minute,second])
       * 
       * 返回值结构 :
       *           [hour,minute,second]
       * 
       */
      // 倒计时;
      static getCountDown() {
            var
                  hour = 0,
                  minute = 0,
                  second = 0;

            var targetDate = new Date();
            targetDate.setFullYear(arguments[0]); // 2019 6 18 
            targetDate.setMonth(arguments[1] - 1);       // 2019 7 18 
            targetDate.setDate(arguments[2]);       // 2019 7 10 

            // 根据参数不同,我们会进行不同的计算;
            if (arguments.length > 3) {
                  hour = arguments[3];
                  minute = arguments[4];
                  second = arguments[5];
            }
            targetDate.setHours(hour);
            targetDate.setMinutes(minute);
            var targetTime = targetDate.setSeconds(second);

            var reduce = targetTime - Date.now();

            var second = parseInt(reduce / 1000 % 60);
            var minute = parseInt(reduce / 1000 / 60 % 60);
            var hour = parseInt(reduce / 1000 / 3600);
            var days = hour > 24 ? parseInt(hour / 24) : 0;
            hour = hour > 24 ? hour % 24 : hour;

            console.log(hour);
            return [
                  hour < 10 ? "0" + hour : "" + hour,
                  minute < 10 ? "0" + minute : "" + minute,
                  second < 10 ? "0" + second : "" + second,
                  days ? days : ""
            ];
      }

      // 事件绑定;
      static on(dom, evetType, callback, selector) {
            if (dom.addEventListener) {
                  if (arguments.length === 4 && typeof arguments[3] === "string") {
                        dom.addEventListener(evetType, Utils.delegation(callback, selector));
                  } else {
                        dom.addEventListener(evetType, callback);
                  }
            } else if (dom.attachEvent) {
                  dom.attachEvent("on" + eventType, callback);
            } else {
                  dom["on" + eventType] = callback;
            }
      }

      // 事件委托;
      static delegation(handlerClick, selector) {
            return function (evt) {
                  var e = evt || window.event;
                  var target = e.target || e.srcElement;
                  var eleList = this.querySelectorAll(selector);
                  var targetFamily = [];
                  var _tempTarget = target;
                  var count = 0;
                  while (true && count++ < 100) {
                        if (_tempTarget === this || _tempTarget === null) {
                              break;
                        }
                        targetFamily.push(_tempTarget);
                        _tempTarget = _tempTarget.parentNode;
                  }
                  for (var i = 0, ele; ele = eleList[i++];) {
                        if (targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1) {
                              e.target.index = function () {
                                    // console.log(e.target);
                                    return Array.from(e.target.parentNode.children).indexOf(e.target);
                              }
                              handlerClick.call(ele, e);
                              break;
                        }
                  }
            }
      }

      // 获取元素绝对位置;

      static getAbsPosition(dom) {
            var position = {
                  left: dom.offsetLeft,
                  top: dom.offsetTop
            }
            if (dom.offsetParent === document.body) {
                  return position;
            } else {
                  var pos = getAbsPosition(dom.offsetParent)
                  return {
                        left: dom.offsetLeft + pos.left,
                        top: dom.offsetTop + pos.top
                  }
            }
      }
      //选择器;
      static $(selector) {
            if (selector === "") return false;
            let ele = null;
            return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
      }
      // 删除类名
      static removeClassName(dom, className) {
            return dom.className = dom.className.replace(new RegExp("\\s\?" + className), "");
      }
      //获取元素尺寸
      static getSize(dom) {
            return {
                  width: parseInt(getComputedStyle(dom)["width"]),
                  height: parseInt(getComputedStyle(dom)["height"])
            };
      }
      //运动框架
      static move(dom, options, callback) {     //移动框架
            clearInterval(dom.timer);
            dom.timer = setInterval(function () {
                  for (var attr in options) {
                        if (attr === "opacity") {
                              var iNow = parseInt(getComputedStyle(dom)[attr] * 100)
                        } else {
                              var iNow = parseInt(getComputedStyle(dom)[attr])
                        }
                        var speed = (options[attr] - iNow) / 3;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                        if (options[attr] === iNow) {
                              // 所有属性运动结束之后再去关闭定时器;
                              delete options[attr];
                              if (Object.keys(options).length === 0) {
                                    clearInterval(dom.timer);
                                    typeof callback === "function" ? callback() : "";
                              }
                        } else {
                              if (attr === "opacity") {
                                    dom.style[attr] = (iNow + speed) / 100;
                              } else {
                                    dom.style[attr] = iNow + speed + "px";
                              }
                        }
                  }
            }, 50)
      }
      //封装的AJAX
      static myAJAX(
            url,
            {
                  type = "GET",
                  data = {},
                  data_type = "text",
                  content_type = "application/x-www-form-urlencoded"
            } = {}
      ) {
            return new Promise(function (resolve, reject) {
                  let xhr = null;
                  if (XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                  }
                  else {
                        xhr = new ActiveXObject("Mricosoft.XMLHTTP")
                  }
                  if (xhr === null) throw "浏览器不支持ajax";
                  let data_str = "";
                  for (let attr in data) {
                        data_str += `${data_str.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
                  }
                  type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + data_str : "";
                  xhr.open(type, url);
                  type === "POST" ? xhr.setRequestHeader("Content-type", content_type) : "";
                  xhr.send(type === "POST" ? data_str : null);
                  xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                              let res = xhr.responseText;
                              switch (data_type) {
                                    case "text": res = typeof res === "string" ? res : JSON.stringify(res);
                                          break;
                                    case "json": res = typeof res === "string" ? JSON.parse(res) : "";
                                          break;
                              }
                              resolve(res);
                        }
                  }
                  setTimeout(function () {
                        reject(xhr, "timeout");
                  }, 5000);
            });
      }
      //封装的jsonp
      static jsonp(url, data, cb_name = "cb") {
            return new Promise(function (resolve, reject) {
                  let global_cb = "_" + Date.now();
                  window[global_cb] = function (res) {
                        resolve(res);
                        delete window[global_cb];
                        global_cb = false;
                  }
                  //字段名和回调函数名拼接
                  url += `${/\?/.test(url) ? "&" : "?"}${cb_name}=${global_cb}`;
                  if (typeof data === "object") {
                        let data_str = "";
                        for (let attr in data) {
                              data_str += `${data_str.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
                        }
                        url += `"&"${data_str}`;
                  }
                  let script = document.createElement("script");
                  script.src = url;
                  script.onload = function () {
                        this.remove();
                  }
                  document.body.appendChild(script);
                  setTimeout(function () {//超时失败
                        reject("failed to get resources");
                  }, 5000);
            });
      }
      //整合了xhr请求方式和jsonp请求方式的ajax
      static ajax(
            {
                  url = "",
                  data = null,
                  jsonp = false,
                  cb_name = "cb",
                  type = "GET",
                  data_type = "text",
                  content_type = "application/x-www-form-urlencoded"
            } = {}
      ) {
            return new Promise(function (resolve, reject) {
                  let data_str = "";
                  if (url === "") {
                        throw "url is null";
                  }
                  if (typeof data === "object") {
                        for (let attr in data) {
                              data_str += `${data_str.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
                        }
                  }
                  if (jsonp) {//使用jsonp请求数据
                        let global_cb = "_" + Date.now();
                        url += `${/\?/.test(url) ? "&" : "?"}${cb_name}=${global_cb}`;
                        url += `"&"${data_str}`;
                        window[global_cb] = function (res) {
                              resolve(res);
                              delete window[global_cb];
                              global_cb = false;
                        };
                        let script = document.createElement("script");
                        script.src = url;
                        script.onload = function () {
                              this.remove();
                        }
                        document.body.appendChild(script);
                  }
                  else {//使用xhr请求数据
                        let xhr = null;
                        if (XMLHttpRequest) {
                              xhr = new XMLHttpRequest();
                        }
                        else {
                              xhr = new ActiveXObject("Mricosoft.XMLHTTP")
                        }
                        if (xhr === null) throw "浏览器不支持ajax";
                        data_str !== "" ? (type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + data_str : "") : "";
                        // console.log(url);
                        // console.log(0,type);
                        xhr.open(type, url);
                        type === "POST" ? xhr.setRequestHeader("Content-type", content_type) : "";
                        xhr.send(type === "POST" ? data_str : null);
                        xhr.onreadystatechange = function () {
                              if (xhr.readyState === 4 && xhr.status === 200) {
                                    let res = xhr.responseText;
                                    switch (data_type) {
                                          case "text": res = typeof res === "string" ? res : JSON.stringify(res);
                                                break;
                                          case "json": res = typeof res === "string" ? JSON.parse(res) : "";
                                                break;
                                    }
                                    resolve(res);
                              }
                        }
                  }
                  setTimeout(function () {//超时失败
                        reject("failed to get resources");
                  }, 5000);
            });
      }
      //封装cookie,实现了获取和设置cookie的功能
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
                  let [a, res] = [document.cookie.split("; "), ""];
                  res = a.filter(item => item.split("=")[0] === name);
                  return res.length === 0 ? "" : res[0].split("=")[1];
            }
            return (document.cookie = [
                  name + "=" + value,
                  expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + expires) && d) : "",
                  path ? ";path=" + path : "",
                  domain ? ";path=" + domain : "",
                  secure ? ";path=" + secure : ""
            ].join(""));
      }
      //删除cookie
      static removeCookie(name, path = "") {
            Utils.cookie(name, "", {
                  path,
                  expires: -1
            });
      }
}