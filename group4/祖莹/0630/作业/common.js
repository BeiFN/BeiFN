/**
 * 
 * 实现功能 : 打印空心菱形;
 * 返回值   : undefined;
 *
 * by : huaizhiY;
 * date : 2019-3-20
 * 
 */

// 实现具体的某一个功能 => 底层;
function hollowDiamond() {
      for (var i = 0; i < 10; i++) {
            for (var k = 0; k < 2 * i + 1; k++) {
                  if (k === 0 || k === 2 * i) {
                        document.write("*");
                  } else {
                        document.write("&nbsp;&nbsp;")
                  }
            }
            document.write("</br>");
      }
      for (var i = 0; i < 10; i++) {
            for (var k = 0; k < (9 - i) * 2 + 1; k++) {
                  if (k === 0 || k === (9 - i) * 2) {
                        document.write("*");
                  } else {
                        document.write("&nbsp;&nbsp;")
                  }
            }
            document.write("</br>");
      }
}
/**
 * 
 * @param {年份} year 
 * @param {月份} month 
 * @param {日期} date 
 * @param {小时} hour 
 * @param {分钟} minute 
 * @param {秒} second 
 * 
 * @return [hour,minute,second] 
 * 
 * countDown 计算输入时间和倒计时关系的方法;
 * 2019,3,26 
 * by huaizhi
 * 
 */

function countDown(year, month, date, hour, minute, second) {
      // 1. 用户传递了 三个参数还是六个参数;
      var end = null;
      if (arguments.length > 3) {
            // 精确时间;
            end = new Date(year, month - 1, date, hour, minute, second);
      } else {
            end = new Date(year, month - 1, date);
      }
      // 2. 获取当前时间;
      var now = Date.now();
      // 3. 获取时间差并且返回计算结果;
      var reduce = end.getTime() - now;
      var hours = parseInt(reduce / 1000 / 3600);
      var minutes = parseInt(reduce / 1000 / 60 % 60);
      var seconds = parseInt(reduce / 1000 % 60);
      return [hours, minutes, seconds]
}

/**
 * 
 * 事件委托的封装
 * 
 */

function delegate(callback, selector, parentNode) {
      return function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;

            if (target.nodeName.toLowerCase() === selector) {
                  callback();
            } else {
                  for (var i = 0; i < e.path.length; i++) {
                        if (e.path[i].nodeName.toLowerCase() === selector) {
                              callback();
                              break;
                        }
                        if (target === (parentNode ? parentNode : document.body)) {
                              break;
                        }
                  }
            }
      }
}

/**
 * 
 *    运动框架 
 *    move(eleNode,targe,attr)
 * 
 */
// function move(eleNode,target,attr){
//       var g = getComputedStyle;
//       clearInterval(eleNode.timer);
//       eleNode.timer = setInterval(function(){
//             var iNow = attr === "opacity" ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
//             var speed = (target - iNow) / 8;
//             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//             iNow += speed;
//             eleNode.style[attr] = attr === "opacity" ?  iNow / 100 : iNow + "px";
//             // 单if 不带 return的这样的情况都可以简写成三目运算符;
//             iNow === target ? clearInterval(eleNode.timer) : "";
//       },50)
// }

function move(eleNode, endPoint, attr) {//运动函数  元素，终点值，'属性值'
      var g = getComputedStyle;//获取元素css样式
      clearInterval(eleNode.timer);//格式化
      eleNode.timer = setInterval(function () {//运动函数    下：不同属性的当前位置数据处理
            var iNow = attr === 'opacity' ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
            var speed = (endPoint - iNow) / 5;//速度取值     
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            iNow += speed;//上：速度 + 和 - 情况下的取整处理  下：不同属性的赋值处理
            eleNode.style[attr] = attr === 'opacity' ? iNow / 100 : iNow + 'px';
            iNow === endPoint ? clearInterval(eleNode.timer) : '';
      }, 50)
}//判断终止






/**
 * @function xhrGet 
 *  
 * 利用xhr发送get请求;
 * 
 * xhrGet(url[,data],callback)  
 * 
 * url : 必选
 * data : 可选  => object 
 * callback : 必选
 * 
 */

function xhrGet(url, data) {
      return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            if (typeof data !== "function" && data instanceof Object) {
                  // 拼接字符串; 
                  var _arr = [];
                  for (var key in data) {
                        _arr.push(`${key}=${data[key]}`)
                  }
                  var _symbol = /\?/.test(url) ? "&" : "?";
                  url += _symbol + _arr.join("&")
            }
            xhr.open("GET", url);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4 && xhr.status === 200)
                        resolve(xhr.responseText);
            }
      })
}
/**
 * @function xhrPost
 */

function xhrPost(url, data) {
      return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var _data = [];
            for (let key in data) {
                  _data.push(`${key}=${data[key]}`);
            }
            xhr.send(_data.join("&"));
            xhr.onload = function () {
                  xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.status);
            }
      })
}
/**
 * @function cookie 设置cookie功能;
 * 
 * 
 * @param {*} key 
 * @param {*} value 
 * @param {*} options 
 * 
 */

function cookie(key, value, options) {
      var res = "";
      res += key + "=" + encodeURI(value);
      // 有没有过期时间;
      if (typeof options.expires === "number") {
            var d = new Date()
            d.setDate(d.getDate() + options.expires);
            res += ";expires=" + d;
      }
      res += options.path ? ";path=" + options.path : "";
      res += options.domain ? ";domain=" + options.domain : "";

      document.cookie = res;
}
// path不同也代表两条不同的cookie;
function removeCookie(key, options) {
      // 确保options一定是对象类型,同时可以配置默认参数;
      var default_options = {
            expires: -1
      };
      options = typeof options == "object" ? Object.assign(default_options, options) : default_options;
      cookie(key, null, options)
}




function getCookie(key) {
      var _cookie = document.cookie;
      // "key=value; key2=value; key3=value";
      var _cookie_item = _cookie.split("; ");
      var _key = [];
      var _value = _cookie_item.map(item => {
            var _temp = item.split("=");
            _key.push(_temp[0]);
            return _temp[1];
      })
      var index = _key.indexOf(key);
      if (index !== -1) {
            return _value[index];
      }
      return "";
}





/**
 * 
 */


 /**
 * 拖拽插件
 * 
 * @param selector 选择符;
 * @param options {
 * 
 * }
 */
;;+function($){
      // console.log($);
      function Drag( selector , options ){
            //变量声明;
            this.init.apply(this,arguments);
      }
      // jquery 提供了一个方法 对象合并的; 兼容 $.extend();
      //
      // var obj = {};
      // var obj2 = {a:1,b:{}};
      // var obj3 = $.extend(true,obj,obj2);
      // console.log(obj3,obj3.b == obj2.b);
      $.extend(Drag.prototype,{
            init : function(selector,options){
                  // 1. 是否是符合规则的参数; 参数判断;
                  // 一个插件的自我修养 => 不能用就别浪费人家性能;
                  this.ele = null;
                  if(typeof selector !== "string" || (this.ele = $(selector)).length === 0 ){
                        return console.warn("请输入正确的选择符");
                  }
                  //鼠标按下时相对于元素的X轴值和Y轴值;
                  this.offsetX = null;
                  this.offsetY = null;

                  // 默认参数;
                  var default_options = {
                        startCb : [],
                        moveCb : [],
                        endCb : []
                  };
                  // 参数合并;
                  this.options = $.extend(default_options,options);


                  // 定义好发布者;
                  this.startPub = $.Callbacks();
                  this.movePub = $.Callbacks();
                  this.endPub = $.Callbacks();

                  this.sub();

                  this.bindEvent();
            },
            sub : function(){
                  // 订阅三部分内容;
                  this.options["startCb"].forEach( item => {
                        this.startPub.add(item)
                  })
                  this.options["moveCb"].forEach( item => {
                        this.movePub.add(item)
                  })
                  this.options["endCb"].forEach( item => {
                        this.endPub.add(item)
                  })
            },
            bindEvent : function(){
                  // $.proxy() === bind ;
                  this.ele.on("mousedown",$.proxy(this.startDrag,this))
                  this.ele.on("mouseup",$.proxy(this.endDrag,this))
            },
            startDrag : function(evt){
                  var e = evt || window.event;
                  this.offsetX = e.offsetX;
                  this.offsetY = e.offsetY;

                  $(document).on("mousemove",$.proxy(this.moveDrag,this))

                  this.startPub.fire();
                  return false; 
            },    
            moveDrag : function(evt){
                  var e = evt || window.event;
                  this.ele.css({
                        left : e.clientX - this.offsetX,
                        top : e.clientY - this.offsetY
                  })
                  this.movePub.fire();
            },
            endDrag : function(){
                  $(document).off("mousemove",$.proxy(this.moveDrag,this));
                  this.endPub.fire();
            }
      })


      window.Drag = Drag;
}(jQuery);