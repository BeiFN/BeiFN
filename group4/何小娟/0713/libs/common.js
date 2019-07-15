/**
 *  commonjs 函数库 
 *  v 0.1.0  
 *  by. huaizhiY
 *  date : 2019/7/5 
 * 
 *  */

class Utils {
      // 随机颜色
      static randomColor(type) {
            switch (type) {
                  case "rgba":
                        var str = "rgba(";
                        for (var i = 0; i < 3; i++) {
                              str += Math.floor(Math.random() * 256) + ","
                        }
                        str += Math.random().toFixed(2) + ")";
                        return str;
                        break;
                  case "16":
                        return "#" + Math.round(Math.random() * parseInt("ffffff", 16)).toString(16).padStart(6, "0");
                        break;
                  default:
                        return "black";
                        break;
            }
      }

      /**倒计时;
       * getCountDown(year,month,date[,hour,minute,second])
       * 返回值结构 :
       *           [hour,minute,second]
       */
      static getCountDown() {
            var
                  hour = 0,
                  minute = 0,
                  second = 0;

            var targetDate = new Date();
            targetDate.setFullYear(arguments[0]); // 2019 6 18 
            targetDate.setMonth(arguments[1] - 1); // 2019 7 18 
            targetDate.setDate(arguments[2]); // 2019 7 10 

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
                              handlerClick.call(ele, e, ele);
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

      // 获取元素宽高
      static getSize(dom) {
            return {
                  width: parseInt(getComputedStyle(dom)["width"]),
                  height: parseInt(getComputedStyle(dom)["height"])
            }
      }

      // 选择器;
      static $(selector) {
            let ele = null;
            return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
      }

      // 删除类名
      static removeClassName(dom, className) {
            return dom.className = dom.className.replace(new RegExp("\\s\?" + className), "");
      }

      // AJAX封装
      static ajax(url, {
            data,
            type,
            dataType,
            callback
      } = {
            type: "GET",
            data: {},
            dataType: "text",
            callback: "callback"
      }) {

            if (dataType === "jsonp") {
                  return Utils.jsonp(url, data, callback)
            }
            return new Promise(function (resolve, reject) {
                  var xhr = null;
                  if (XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                  } else {
                        xhr = new ActiveXObject("Mricosoft.XMLHTTP");
                  }
                  if (xhr === null) throw "浏览器不支持ajax";

                  var dataStr = "";
                  for (var attr in data) {
                        dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" + data[attr];
                  }

                  type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + dataStr : "";
                  xhr.open(type ? type : "GET", url);
                  type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded") : "";
                  xhr.send(type === "POST" ? dataStr : null);
                  xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                              let res = xhr.responseText;
                              switch (dataType) {
                                    case "text":
                                          res = typeof res === "string" ? res : JSON.stringify(res);
                                          break;
                                    case "json":
                                          res = typeof res === "string" ? JSON.parse(res) : "";
                                          break;
                              }
                              resolve(res);
                        }
                  }

                  // 设置超时;
                  setTimeout(function () {
                        reject(xhr, "timeout");
                  }, 8000)
            })
      }
      // jsonp封装
      static jsonp(url, data, cb_fild = "callback") {
            return new Promise((resolve, reject) => {
                  let GLOBAL_CB = "_" + Date.now();
                  window[GLOBAL_CB] = function (res) {
                        resolve(res);
                        delete window[GLOBAL_CB];
                        GLOBAL_CB = false;
                  }
                  url += (/\?/.test(url) ? "&" : "?") + cb_fild + "=" + GLOBAL_CB

                  let dataStr = "";
                  for (let attr in data) {
                        dataStr += "&" + attr + "=" + data[attr];
                  }

                  let script = document.createElement("script");
                  script.src = url + dataStr;
                  script.onload = function () {
                        this.remove();
                  }
                  document.body.appendChild(script);
            })
      }

      // Cookie封装
      static cookie(
            name, value, {
                  expires,
                  path,
                  domain,
                  secure
            } = {}
      ) {
            // 获取cookie;
            if (arguments.length === 1) {
                  let [a, res] = [document.cookie.split("; "), ""];
                  res = a.filter(item => item.split("=")[0] === name);
                  return res.length === 0 ? "" : res[0].split("=")[1];
            }
            var d;
            // 设置cookie;
            return (document.cookie = [
                  name + "=" + value,
                  expires ? ";expires=" + ((d = new Date()).setDate(d.getDate() + expires) && d) : "",
                  path ? ";path=" + path : "",
                  domain ? ";domain=" + domain : "",
                  secure ? ";secure=" + secure : ""
            ].join(""))
      }
      // 删除cookie;
      static removeCookie(name, path = "") {
            Utils.cookie(name, "", {
                  path,
                  expires: -1
            })
      }
}