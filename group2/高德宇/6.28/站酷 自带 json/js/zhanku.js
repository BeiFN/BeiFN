
 var headerSelection = document.querySelectorAll('.header>ul>li>a');
 var nav = document.querySelectorAll('.nav a');
 strong(5,headerSelection);
 strong(3,nav);
 function strong(length,ele){
    for(i=0; i<length; i++){
        ele[i].onclick = function(){
            for(i=0; i<length; i++){
                ele[i].className = "";
            }
           this.className = "bold";
        };
    }
 }
 //轮播图
 //尝试自动换图
        var timer =setInterval(bef,4000);
// 尝试 手动换图
        var smallBox = document.getElementById('smallbox'),
             imgArr = document.querySelectorAll('#smallbox img'),
             arrowL = document.querySelector('.arrow_l'),
             arrowR = document.querySelector('.arrow_r'),
             index = 0;
        console.log(imgArr);
        console.log(smallBox);
        smallBox.style.width = imgArr.length*100+"%";
        arrowL.addEventListener('click',pre);
        arrowR.addEventListener('click',bef);
        function pre(){
            if(index === 0){
                console.log('-----------');
                smallBox.style.left = -1130*(imgArr.length-1)+'px';
                index = imgArr.length-2;
          }else{
                index --;
          }
            move(smallBox,-1130*index,"left");
            clearInterval(timer);
            timer =setInterval(bef,4000);
            
        }
        function bef(){
            if(index === imgArr.length - 1){
                smallBox.style.left = 0;
                index = 1;
          }else{
                index ++;
          }
        move(smallBox,-1130*index,"left");
        clearInterval(timer);
        timer =setInterval(bef,4000);
        }




//自动
// var smallBox = document.getElementById('smallbox'),
//     speed =5,
//     timer = null;
//     timer1 = null;
//     timer = setInterval(function(){
//         if(smallBox.offsetLeft%1130 ==0){
//            timer1 = setTimeout(function(){
//                 if(smallBox.offsetLeft ==-3390||smallBox.offsetLeft ==0){
//                     speed = -speed;
//                 }
//             smallBox.style.left=smallBox.offsetLeft- speed+"px"; 
//             },3000)
//             // clearTimeout(timer1)
//         } else{
//             smallBox.style.left=smallBox.offsetLeft- speed+"px";
//             }
        
//     },30);

                    //失败.....
// //手动
// var arrowL = document.querySelector('.arrow_l');
// var arrowR = document.querySelector('.arrow_r');
// arrowL.onclick = zuoyi();
// arrowR.onclick = youyi();

// //座椅右移函数
// function zuoyi(){
//     clearTimeout(timer1);
//     speed = 5;
// }
// function youyi(){
//     clearTimeout(timer1);
//     speed = -5;
// }







//插入小div

// 1. 处理数据;
// var str = '<div class="box"><img src="https://img.zcool.cn/community/015e4f5c974703a801214168584894.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt=""><h3>迟到的2018插画总结～</h3></div>'
var container = document.getElementById('container');
var json = [
    {
    img : "https://img.zcool.cn/community/015e4f5c974703a801214168584894.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "哥哥张国荣数字还原",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:3,
    nicheng: "hah"
    },
    {
    img : "https://img.zcool.cn/community/01eaf25c983b61a8012141686aa246.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是2个标题",
    miaoshu : "你是个什么",
    liulanliang: 568,
    pinglun: 324,
    dianzan: 340,
    day:12,
    nicheng: "回家"
    }
    ,
    {
    img : "https://img.zcool.cn/community/01c6e25c964497a8012141685e6083.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是3个标题",
    miaoshu : "你是个什么",
    liulanliang: 528,
    pinglun: 304,
    dianzan: 200,
    day:14,
    nicheng: "阿萨德"
    }
    ,
    {
    img : "https://img.zcool.cn/community/031f59d5c9736bba80121416891b88d.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是4个标题",
    miaoshu : "你是个什么",
    liulanliang: 598,
    pinglun: 200,
    dianzan: 500,
    day:1,
    nicheng: "浮点数"
    }
    ,
    {
    img : "https://img.zcool.cn/community/0150eb5c96ddc5a801214168984e3e.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是5个标题",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:9,
    nicheng: "王企鹅"
    },{
    img : "https://img.zcool.cn/community/015e4f5c974703a801214168584894.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "哥哥张国荣数字还原",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:22,
    nicheng: "天儿童"
    },
    {
    img : "https://img.zcool.cn/community/010f3d5caa1268a801208f8bc3fa84.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是2个标题",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:21,
    nicheng: "h哥"
    }
    ,
    {
    img : "https://img.zcool.cn/community/01c6915ca9feada801208f8bab58ea.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是3个标题",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:2,
    nicheng: "恶趣味"
    }
    ,
    {
    img : "https://img.zcool.cn/community/031f59d5c9736bba80121416891b88d.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是4个标题",
    miaoshu : "你是个什么",
    liulanliang: 558,
    pinglun: 300,
    dianzan: 400,
    day:3,
    nicheng: "发的啥"
    }
    ,
    {
    img : "https://img.zcool.cn/community/01a83a5ca88687a8012141685f16a5.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title : "这是5个标题",
    miaoshu : "你是个什么",
    liulanliang: 748,
    pinglun: 540,
    dianzan: 300,
    day:14,
    nicheng: "efea"
    },
    ]
    // var str = '<div class="box">'+
    // '<img src="1.jpg" alt="">'+
    // '<h3>迟到的2018插画总结～</h3>'+
    // '</div>'
    // var str = "";
    // for(var i = 0 ; i < json.length ; i ++){
    // // console.log(json[i]);
    // str += '<div class="contentbox">'+
    // '<img src="'+ json[i].img +'" alt="">'+
    // '<h5>' + json[i].title + '</h5>'+'<p>'+json[i].miaoshu+'</p>'+
    // '</div>'
    // }
    // // console.log(str);
    // container.innerHTML += str;


//     var str = "";
//     for(var i = 0 ; i < json.length ; i ++){
//     // console.log(json[i]);
//     str += '<div class="contentbox">'+
//     '<img src="'+ json[i].img+'"alt="">'+
//     '<div class="hudong">'+
//         '<h5>'+json[i].title+'</h5>'+
//         '<p class="xiu">'+json[i].miaoshu+'</p>'+
//         '<span class="span1">'+json[i].liulanliang+'</span><span class="span2">'+json[i].pinglun+'</span><span class="span3">'+json[i].dianzan+'</span>'+
//     '</div>'+
//     '<div class="xinxi">'+                                                                                                                                            
//     '<span>'+
//             '<a href="###">'+
//                 '<img src="img/touxiang'+[i]+'.jpg" alt="">'+json[i].nicheng+'<span>'+json[i].day+'天前</span>'+
//             '</a>'+
//     '</span>'+
//     '</div>'+
// '</div>'
//     }
    //es6字符串需要用一对反引号( ` )包裹起来 ,它可以定义多行字符串，只用一对反引号
    // 要拼进去的数据需要放在${}里面
    // 大括号里面可以进行运算
    // 大括号里面可以调用函数
    var str = ""
    for(i=0;i<json.length;i++)
    {
        str+= `<div class="contentbox"><img src="${json[i].img}"alt=""><div class="hudong">
        <h5>${json[i].title}</h5>
        <p class="xiu">${json[i].miaoshu}</p>
        <span class="span1">${json[i].liulanliang}</span><span class="span2">${json[i].pinglun}</span><span class="span3">${json[i].dianzan}</span>
    </div>
    <div class="xinxi">                                                                                                                                          
    <span>
            <a href="###">
                <img src="img/touxiang${[i]}.jpg" alt="">${json[i].nicheng}<span>${json[i].day}天前</span>
            </a>
    </span>
    </div>
</div>
`
console.log(str);
    }
    container.innerHTML += str;
    container.innerHTML += str;
    container.innerHTML += str;
    container.innerHTML += str;