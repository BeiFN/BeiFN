//查找替换
// document.onkeydown = function (evt) {
//     var e = event || evt;
//     if (e.keyCode === 13) {
//         handler();
//     }
// }
// function handler() {
//     var preText = precontent.value;
//     var reText = recontent.value;
//     var all = allText.innerHTML;
//     all = all.replace(preText, reText);
//     allText.innerHTML = all;
// }

//字符串过滤
// sendBtn.onclick = handlerClick;
// function handlerClick() {
//     var sendText = text.value;
//     var sendStr = '<div class="comment">' +
//         '<p>张三疯:</p>' +
//         '<p style="word-break: break-all;">' +
//         sendText +
//         '</p>' +
//         '<p style="text-align: right;">2016/9/4 16:06</p>' +
//         '</div>';
//     commentlist.innerHTML = sendStr + commentlist.innerHTML;
//     text.select();
// }

//用户名密码格式要求？
// username.onblur = handlerInput;
// function handlerInput() {
//     var userStr = username.value;
//     //用户名长度6-20
//     if (userStr.length < 6 || userStr.length > 20) {
//         username.style.borderColor = "red";
//         alert("用户名长度不对！！！");
//     }
//     else
//         username.style.borderColor = "green";
//     //数字不能开头
//     if (userStr.charCodeAt(0) >= 48 && userStr.charCodeAt(0) <= 57) {
//         username.style.borderColor = "red";
//         alert("用户名不可以用数字开头！");
//     }
//     else
//         username.style.borderColor = "green";
//     //只能包含数字、字母、下划线
//     for (var i in userStr) {
//         var asc = userStr.charCodeAt(i);
//         if ((asc >= 48 && asc <= 57) || (asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122) || asc == 95) {
//             username.style.borderColor = "green";
//         }
//         else {
//             username.style.borderColor = "red";
//             alert("用户名只能使用数字字母下划线");
//             break;
//         }
//     }
// }

//统计字符串中每个字符的个数？
// var str = "aabbcxsdexdfskAdddsfwe";
// str = str.toLowerCase();//先将字符串转小写
// var res = {};
// for(var i in str){
//     var char=str[i];
//     if(res[char]){      //如果该属性已存在
//         res[char]+=1;   //属性值加1
//     }
//     else
//         res[char]=1;    //如果第一次保存，值为1
// }
// console.log(res);

//密码强度
// var pwd_level_tip = document.getElementById("pwd_level_tip");
// pwd.onkeyup = function () {
//     if (/^\d+$/.test(this.value) || /^[a-zA-Z]+$/.test(this.value)) {
//         pwd_level.children[0].style.background = "red";
//         pwd_level.children[1].style.background = "white";
//         pwd_level.children[2].style.background = "white";
//         pwd_level_tip.children[0].style.visibility = "visible";
//         pwd_level_tip.children[1].style.visibility = "hidden";
//         pwd_level_tip.children[2].style.visibility = "hidden";
//         console.log("弱");
//     } else if (/[^0-9a-zA-Z]+/.test(this.value)) {
//         pwd_level.children[0].style.background = "red";
//         pwd_level.children[1].style.background = "orange";
//         pwd_level.children[2].style.background = "green";
//         pwd_level_tip.children[0].style.visibility = "hidden";
//         pwd_level_tip.children[1].style.visibility = "hidden";
//         pwd_level_tip.children[2].style.visibility = "visible";
//         console.log("强");
//     } else if (this.value != "") {
//         pwd_level.children[0].style.background = "red";
//         pwd_level.children[1].style.background = "orange";
//         pwd_level.children[2].style.background = "white";
//         pwd_level_tip.children[0].style.visibility = "hidden";
//         pwd_level_tip.children[1].style.visibility = "visible";
//         pwd_level_tip.children[2].style.visibility = "hidden";
//         console.log("中");
//     } else {
//         pwd_level.children[0].style.background = "white";
//         pwd_level.children[1].style.background = "white";
//         pwd_level.children[2].style.background = "white";
//         pwd_level_tip.children[0].style.visibility = "hidden";
//         pwd_level_tip.children[1].style.visibility = "hidden";
//         pwd_level_tip.children[2].style.visibility = "hidden";
//         console.log("中");
//     }
// }

//验证码的生成
// function createCheckCode() {
//     //生成一个6位 数字字母混合的验证码    AE3L5F
//     var arr = [0, 0, 0, 0, 0, 0];
//     for (var i in arr) {
//         //48-90字母
//         var asc = 0;
//         do {
//             asc = Math.round(Math.random() * 42 + 48);
//         } while (asc > 57 && asc < 65)      //排除58~64的特殊字符
//         arr[i] = String.fromCharCode(asc);
//     }
//     document.getElementsByTagName("span")[0].innerHTML = arr.join("");
// }
// createCheckCode();

//三角函数曲线图
// var r = 100;
// var angle = 0;
// for (var i = 0; i < 100; i++) {
//     angle += 3.6;
//     // var numLeft = Math.cos(Math.PI / 180 * angle) * r + 200;
//     var numLeft = i * 10;//横向的sin函数图像
//     var numTop = Math.sin(Math.PI / 180 * angle) * r + 200;
//     // var numTop = i * 10;//纵向的cos图像
//     // console.log(numLeft , numTop);

//     var styleStr = "left:" + numLeft + "px;top:" + numTop + "px";
//     container.innerHTML += '<div class="point" style="' + styleStr + '">';
// }

//伪随机算法
// var count = 0; //总攻击次数
// var pcount = 0; //暴击次数
// var fixp = 0.2; //期望概率
// var avep = 0;   //平均概率
// var temp = 0;
// var c = 0.0557; //种子
// var gameInterval = setInterval(function () {
//     var num = Math.random();
//     count++;
//     if (num <= fixp) {
//         pcount++;
//         fixp = c;
//     } else {
//         fixp += c;
//     }
//     temp = temp + pcount / count;
//     avep = temp / count;
//     console.log("当前第" + count + "次攻击，暴击次数" + pcount + "次，实际概率为：" + pcount / count + "，平均概率为：" + avep);
// }, 1000);
// document.onclick = function () {
//     clearInterval(gameInterval);
// }

//已知字符串“a,a,b,c,c,d,f,g,j,j”编程实现以下功能。
//统计每个字符出现的次数，结果显示 a 2、b 1、c 2、d1
//去掉重复的字符，使结果显示 abcd
// var str = "a,a,b,c,c,d,f,g,j,j".split(",");
// var obj = {};
// var arr = [];
// for (var i in str) {
//     if (!obj[str[i]]) {
//         obj[str[i]] = 1;
//     } else {
//         obj[str[i]] += 1;
//     }
// }
// for (var i in obj) {
//     arr.push(i);
//     console.log("字符" + i + "出现的次数：" + obj[i]);
// }
// console.log(arr);

//输入框的默认提示
//函数名的要求, text  top  blur 有冲突，类似的名字不要使用
// searchinput.onfocus=foc;
// searchinput.onblur=blu;
// function foc() {
//     var oInput = document.getElementById("searchinput");
//     if (oInput.value == "请输入你要查询的内容") {
//         oInput.value = "";
//     }
// }
// function blu() {
//     var oInput = document.getElementById("searchinput");
//     if (oInput.value == "") {
//         oInput.value = "请输入你要查询的内容";
//     }
// }