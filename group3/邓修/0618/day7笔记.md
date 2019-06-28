# Math对象

1. Math.PI  圆周率，一个圆的周长和直径之比，约等于 3.14159
2. Math.cos(x)  返回x的余弦值
3. Math.sin(x)  返回正弦值
4. Math.floor(x)  返回小于x的最大整数
5. Math.max()  返回0个到多个数值中最大值
6. Math.min()  返回0个到多个数值中最小值
7. Math.pow(x,y)  返回x的y次幂
8. Math.random()  返回0到1之间的伪随机数
9. Math.round(x)  返回四舍五入后的整数

# Date对象

1. 获取日期对象

   `var d = new Date();//日期对象的默认时间是系统时间`

   时间戳的获取方式:

   ```javascript
   console.log(d.getTime());
   console.log(Date.now());
   ```

2. 日期对象API

   - getFullYear()  取得年份

   - getMonth()  取得月份

   - getDate()  取得日期

   - getHours()  取得小时

   - getMinutes()  取得分钟

   - getSeconds()  取得秒

   - getUTCFullYear() 取得UTC年份

   - getUTCMonth() 取得UTC月份

   - getUTCDate() 取得UTC日期

   - getUTCHours() 取得UTC小时

   - getUTCMinutes() 取得UTC分钟

   - getUTCSeconds() 取得UTC秒

   - setFullYear()  设置年份

   - setMonth()  设置月份

   - setDate()  设置日期

   - setHours() 设置小时

   - setMinutes() 设置分钟

   - setSeconds() 设置秒

   - setUTCFullYear() 设置UTC年份

   - setUTCMonth() 设置UTC月份

   - setUTCDate() 设置UTC日期

   - setUTCHours() 设置UTC小时

   - setUTCMinutes() 设置UTC分钟

   - setUTCSeconds() 设置UTC秒

   **set系列的返回值是1970年1月1日00:00:00 ~ 设置时间之间的毫秒数**

   #### 定时器和延时器

   ```javascript
   // 定时器的开启;
   setInterval(callback , 1000);
   function callback(){
   	console.log(1);
   }
   ```

   定时器：每间隔1000ms , 那么浏览器会帮忙调用一下 callback 这个函数；

   ```javascript
   // 定时器关闭;
   // setInterval() => 返回值; 在单个程序之中每个定时器返回的结果都是唯一的;  
   // 返回值标识了当前的定时器的唯一性，方便后期进行关闭;
   var interval_id = null;
   interval_id = setInterval(callback , 1000);
   function callback(){
   	console.log(1);
   	clearInterval(interval_id);
   }
   ```

   ```javascript
   // 延时器 => 只会执行一次;
   setTimeout( hideLogo , 5000 );
   function hideLogo(){
   	top_logo.style.display = "none";
   }
   ```

3. 应用日期对象

   获取倒计时

   ```javascript
   function getCountDown(){
   	// 1. 只传年月日 ;
   	// 2. 传年月日时分秒;
   	var hour   = 0,minute = 0,second = 0;
   	var targetDate = new Date();
   	targetDate.setFullYear(arguments[0]); 			// 2019 6 18 
   	targetDate.setMonth   (arguments[1] - 1);       // 2019 7 18 
   	targetDate.setDate    (arguments[2]);       	// 2019 7 10 
   	// 根据参数不同,我们会进行不同的计算;
   	if( arguments.length > 3){
   		hour   = arguments[3];
   		minute = arguments[4];
   		second = arguments[5];
   	}
   	targetDate.setHours  (hour);
   	targetDate.setMinutes(minute);
   	var targetTime = targetDate.setSeconds(second);
   	var reduce = targetTime - Date.now();
   	var second = parseInt(reduce / 1000 % 60) ;
   	var minute = parseInt(reduce / 1000 / 60 % 60);
   	var hour   = parseInt( reduce / 1000 / 3600);
   	var days   = hour > 24 ? parseInt(hour / 24) : 0;  
   	hour       = hour > 24 ? hour % 24 : hour;
   	return [
   		hour < 10 ? "0" + hour : "" + hour ,
   		minute < 10 ? "0" + minute : "" +minute ,
   		second < 10 ? "0" + second : "" +second ,
   		days
   	];
   }
   ```
# BOM

**Browser Object Model的缩写，译为浏览器对象模型，是浏览器的高级功能汇总**

   #### window

   1. 我们把所有的变量放进window之中进行储存 , 它是绝对的顶层对象
   2. window把浏览器的功能划分成了很多的子对象
      - window.history(历史记录)
         go 任意(前后都可以) back(向后) forward (向前)
      - window.location
         > http:// www.baidu.com?key=value#hahahaha
         > 协议       域名        查询语句   哈希值
         ```javascript
         location.hash = "helloworld";
         location.href = "09进度条.html" 
         location.href = "http://09进度条.html"
         // 带协议是整体更改
         // 不带协议是部分更改;
         ```
         location.hash可用于跨页面传值
         ```javascript
         var list = [
         	{ 
         		url : "https://img14.360buyimg.com/mobilecms/s280x280_jfs/t1/48795/9/1731/82817/5cf784b4Ec2864e1d/3280cc1fdccaf51a.jpg!q90.webp",
         		id : 1
         	},
         	{
         		url : "https://img11.360buyimg.com/mobilecms/s280x280_jfs/t1/75447/12/1703/138105/5d00c307E8c76fd95/d38825c500d47aa4.jpg!q90.webp",
         		id : 2
         	}
         ];
         var outId = location.hash.substring(1);
         for(var index in list){
         	if(list[index].id == outId){
         		body.innerHTML = '<img src="'+list[index].url+'">'
         		break;
         	}
         }
         ```
