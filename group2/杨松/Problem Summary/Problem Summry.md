## **0611 问题**

问题1 ：为什么空心菱形，当网页翻译成中文时，右边的腰会偏向左边

> ​          结论 ：当浏览器翻译成中文时，会给每一个字符加上一个font标签，导致原始布局失效

## 0614 问题
问题1 ：通过循环生成顺序为一个5×5的二维数组a 赋1到25的自然数，然后输出该数组的左下半三角。试编程。
```
var flag = false;
var arr = [];
for(var i = 0 ; i ++ < 5; ){
      var tempArr = []; // i ;
      if(flag){
            for(var k = 5*(i - 1); k ++ < 5 * i ; ){
                  // console.log(k)
                  tempArr.push(k);
            }
      }else{
            for(var k = 0 ; k ++ < 5; ){
                  tempArr.push(Math.round(Math.random() * 24) + 1);
            }
      }
      // 根据 i 去计算想要的结果;
      console.log("--------"+i+"--------")
      for(var k = 5*(i - 1); k ++ < 5 * i ; ){
            // console.log(k)
            tempArr.push(k);
      }
      arr.push(tempArr);
}
console.log(arr);

```
问题2：如何求不确定位数的数，每个位数的值;
```
var num = 123456789;
// count => 第n位;
for(var count = 0,temp=num; temp >= 1; (temp = temp / 10 ) && count ++){
      // console.log(count);
      // num % 10 / 1
      // num % 100 / 10
      // num % 1000 / 100
      var _no = parseInt(num % Math.pow(10,count + 1) / Math.pow(10 , count));
      console.log(_no);
}


```
问题3： 上面有button点击按钮， 但是这样写点击时 不能执行函数 在页面每次加载时会执行函数是为什么呢？
```
function foo(){ 
     console.log("a");
 }
btn.onclick = foo();


```
**## 0616 问题**

```
var a = null; console.log(a instanceof Object) console.log(typeof a);

```
 为什么typeof null 是 Object 而 null instansof Object 为false？

> ​        1.语言本身的bug，null是表示空的独立类型
> ​        2.null属于object类型
> ​        3.null不肯被object构造函数构建

问题：构造函数和普通函数有啥区别 ;

> ​        构造函数是new调用的，普通函数直接调用。

**## 0617 问题**

问题 ：案例字符串过滤、用户名密码格式要求、三角函数曲线图不会做。
```
<!DOCTYPE html>
<html>
     <head>
          <meta charset="UTF-8">
          <title></title>
     </head>
     <style type="text/css">
          *{
              padding: 0; margin: 0;
          }
          #edit {
              margin: 0 auto;
              width: 1000px;
              text-align: center;
              overflow: hidden;
          }
          #commentlist {
              margin: 0 auto;
              width: 1000px;
          }
          #commentlist .comment{
              width: 800px;
              min-height: 80px;
              margin: 20px auto;
              background: darkkhaki;
              border-radius: 3px;
              position: relative;
              overflow: hidden;
          }
          #commentlist .comment p{
              margin: 10px 10px;
          }
          #sendBtn {
              display: block;
              margin: 10px auto;
              width: 100px;
              height : 30px;
              line-height: 30px;
              background: linear-gradient(to bottom, #faa, #f40);
              box-shadow: 0 0 2px #000;
              border-radius: 4px;
          }
          #sendBtn:hover{
              cursor: pointer;
              background: linear-gradient(to bottom, #fee, #f40);
          }
     </style>
     <body>
          <div id="edit">
              <p>请输入你的发言:</p>
              <p>
                   <textarea id="text" rows="5" cols="60"></textarea>
              </p>
              <p><a class="send" id="sendBtn">发送</a></p>
          </div>
          <div id="commentlist">
              <div class="comment">
                   <p>张三疯:</p>
                   <p style="word-break: break-all;">
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                   </p>
                   <p style="text-align: right;">2016/9/4 16:06</p>
              </div>
              <div class="comment">
                   <p>张三疯:</p>
                   <p style="word-break: break-all;">
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                   </p>
                   <p style="text-align: right;">2016/9/4 16:06</p>
              </div>
              <div class="comment">
                   <p>张三疯:</p>
                   <p style="word-break: break-all;">
                   xxxxxxxxxxxxxxxxxxxxxx
                   </p>
                   <p style="text-align: right;">2016/9/4 16:06</p>
              </div>
          </div>
     </body>
     <script type="text/javascript">
        sendBtn.onclick = hanlderClick;
        function hanlderClick(){
            var iptStr = text.value;
            var htmlStr = '<div class="comment">'+
                                '<p>张三疯:</p>'+
                                '<p style="word-break: break-all;">'+
                                        iptStr +
                                '</p>' +
                                '<p style="text-align: right;">2016/9/4 16:06</p>'+
                            '</div>';  
            commentlist.innerHTML =  htmlStr + commentlist.innerHTML;
            text.select();
        }
     </script>
</html>


```


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户名密码格式要求</title>
</head>
<body>
用户名：<input type="text" placeholder="请输入用户名" id="username">

<!--密&nbsp;&nbsp;&nbsp;码：<input type="password" placeholder="请输入密码" id="password">-->
<!--<input type="submit" is="submit" >-->
<script>
        //用户名长度6-20
        username.onblur=handlerBlur;
        function handlerBlur(){
            var content=username.value;
            if(content.length>=6 && content.length <=20){
                username.style.color="blue";
            }
            else {
                username.style.color="red";
                alert("用户名长度应该在6-20位之间");
                return false;
            }
            //数字不能开头
            if(isNaN(content[0])){
                username.style.color="blue";
            }else {
                username.style.color="red";
                alert("不能以数字开头");
            }
            //只能包含数字、字母、下划线
            for(var i=0,letter;letter=content[i++];){
                var asc=letter.charCodeAt(0);
                if(!(asc>=48&& asc<=57 || asc>=65 && asc<=90 || asc>=97 && asc<=122 || asc==95)){
                    alert( "用户名只能包含数字、字母、下划线")
                    username.style .color="red";
                    return false;
                }
            }
    }
</script>
</body>
</html>


```
## ## 0618 问题

问题：var targetTime = targetDate.setSeconds(0);这个方法怎么会是获取毫秒数，不懂

>  API 记忆 : Date 方法的 set 系列API, 返回值是什么 ? 1970,1,1 ~ 设定的时间的毫秒数;

## **## 0619 问题**

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
*{font-size: 14px; padding:0; margin:0;}
.main{
   position: relative;
   margin: 20px auto;
   border: 1px solid steelblue;
   width: 430px;
   height: 400px;
}
.msgInput{
   display: block;
   width: 406px;
   height: 60px;
   margin: 10px auto;
   
}
.sendbtn{
   position: absolute;
   width: 100px;
   height: 29px;
   bottom: 5px;
   right: 10px;
}
.content{
   list-style: none;
   width: 410px;
   height: 280px;
   margin: 5px auto;
   border: 1px dotted #D1D3D6;
   overflow-y: scroll;
}
.msgContent{
   width:auto;
   max-width: 250px;
   height: auto;
   word-break: break-all;
   margin: 5px;
   padding: 3px;
   border-radius: 5px;
}
.content .left{
   float: left;
   text-align: left;
   background-color: lightgrey;
}
.content .right{
   float: right;
   text-align: right;
   background-color: yellowgreen;
}
</style>
</head>
<body>
   <div id="main" class="main">
      <ul id="content" class="content">
         <li class="msgContent left">hello?</li>
         <div style="clear: both;"></div>
         <li class="msgContent left">hello</li>
         <div style="clear: both;"></div>
         <li class="msgContent right">hi</li>
         <div style="clear: both;"></div>
         <li class="msgContent left">hehe</li>
         <div style="clear: both;"></div>
         <li class="msgContent left">goodbye</li>
         <div style="clear: both;"></div>
         <li class="msgContent right">。。。。</li>
         <div style="clear: both;"></div>
         <li class="msgContent right">sdfasdsadfassdfsdfsdfdsfsdfsdfsdfdfasdffasdfasfdasd fasd fasd fasdfasdfasdf</li></ul>
      <textarea id="msg_input" class="msgInput"></textarea>
      <button id="sendbtn" class="sendbtn">发送</button>
   </div>
      <script>
            // 1. 点击事件;
            // 2. 获取数据;
            // 3. 根据数据创建元素 div ; li ;
            // 4. 小优化;
            var sendbtn = document.getElementById("sendbtn");
            var msgipt = document.getElementById("msg_input");
            var content = document.getElementById("content");
            sendbtn.onclick = hanlderSend;
            function hanlderSend(){
                  var msgValue = msgipt.value;
                  if(msgValue.trim().length === 0) return false;
                  // 创建元素;
                  var div = document.createElement("div");
                  div.style.clear = "both";
                  var li = document.createElement("li");
                  li.innerHTML = msgValue;
                  li.className = "msgContent right";
                  // 插入元素;
                  content.appendChild(div);
                  content.appendChild(li);
                  // 新的API;
                  li.scrollIntoView();
                  // 小优化;
                  msgipt.value = "";
                  msgipt.focus();
            }    
      </script>
</body>
</html>


```