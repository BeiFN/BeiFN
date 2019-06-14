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
function hollowDiamond(){
      for(var i = 0 ; i < 10 ; i ++){
            for(var k = 0 ; k < 2 * i + 1 ; k ++){
                  if(k === 0 || k === 2*i){
                        document.write("*");
                  }else{
                        document.write("&nbsp;&nbsp;")
                  }
                  
            }
            document.write("</br>");
      }
      for(var i = 0 ; i < 10 ; i ++){
            for(var k = 0 ; k <  ( 9 - i) * 2 + 1; k ++){
                  if(k === 0 || k === ( 9 - i) * 2){
                        document.write("*");
                  }else{
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

function countDown(year,month,date,hour,minute,second){
      // 1. 用户传递了 三个参数还是六个参数;
      var end = null;
      if(arguments.length > 3){
            // 精确时间;
            end = new Date(year,month - 1,date,hour,minute,second);
      }else{
            end = new Date(year,month - 1,date);
      }

      // 2. 获取当前时间;
      var now = Date.now();
      // 3. 获取时间差并且返回计算结果;
      var reduce = end.getTime() - now;
      
      var hours = parseInt(reduce / 1000 / 3600);
      var minutes = parseInt(reduce / 1000 / 60 % 60);
      var seconds = parseInt(reduce / 1000 % 60);
       
      return [hours,minutes,seconds]
}

/**
 * 
 * 事件委托的封装
 * 
 */

function delegate(callback , selector, parentNode){
      return function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            
            if(target.nodeName.toLowerCase() === selector){
                  callback();
            }else{
                  for(var i = 0 ; i <e.path.length ; i ++){
                        if(e.path[i].nodeName.toLowerCase() === selector){
                              callback();
                              break;
                        }
                        if(target === (parentNode ? parentNode : document.body)){
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
function move(eleNode,target,attr){
      var g = getComputedStyle;
      clearInterval(eleNode.timer);
      eleNode.timer = setInterval(function(){
            var iNow = attr === "opacity" ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
            var speed = (target - iNow) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            iNow += speed;
            eleNode.style[attr] = attr === "opacity" ?  iNow / 100 : iNow + "px";
            // 单if 不带 return的这样的情况都可以简写成三目运算符;
            iNow === target ? clearInterval(eleNode.timer) : "";
      },50)
}

function move(eleNode, endPoint, attr) {//运动函数  元素，终点值，'属性值'
    var g = getComputedStyle;//获取元素css样式
    clearInterval(eleNode.timer);//格式化
    eleNode.timer = setInterval(function () {//运动函数    下：不同属性的当前位置数据处理
        var iNow = attr === 'opacity' ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
        var speed = (endPoint - iNow) / 5;//速度取值     
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        iNow += speed;//上：速度 + 和 - 情况下的取整处理  下：不同属性的赋值处理
        eleNode.style[attr] = attr === 'opacity' ? iNow / 100 : iNow + 'px';
        iNow === endPoint ? clearInterval(eleNode.timer) : '';}, 50)}//判断终止
    