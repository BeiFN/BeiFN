var body2_1 = document.getElementById("body2_1");

var infoArr = [
    {
        "img1":"https://img.zcool.cn/community/0186335d1497d5a801215529b9e082.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"非人哉473-476",
        "text2":"动漫-短篇/四格漫画",
        "data1":"1186",
        "data2":"16",
        "data3":"85",
        "text3":"非人哉漫画",
        "img2":"https://img.zcool.cn/community/041899585a1dbca801219c77b11bd4.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "time":"2小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/01fd555d148249a8012051cd40fae7.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"蛙人部落",
        "text2":"插画-概念设定",
        "data1":"186",
        "data2":"6",
        "data3":"25",
       "text3":"陈晓恒",
        "img2":"https://img.zcool.cn/community/01f2075d1485a2a8012051cd88829d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "time":"2小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/01911f5d1412b4a801215529efe510.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"带帽云",
        "text2":"摄影-风光",
        "data1":"1223",
        "data2":"61",
        "data3":"35",
        "text3":"——selions",
        "img2":"https://img.zcool.cn/community/012f5f5c0f2492a80121ab5dab9af1.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "time":"10小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/031c97d5d14685ba80121552971c1e6.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"《我是夏蛋蛋——奶奶逮到了一只小精怪》",
        "text2":"插画-绘本",
        "data1":"126",
        "data2":"66",
        "data3":"25",
        "img2":"https://img.zcool.cn/community/031ea6d5aca3f80a8012062e31f247a.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"Yoyo",
        "time":"4小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/0119e55d143365a8012051cd852b43.jpg",
        "text1":"正版图片限时特惠",
        "text2":"特别企划",
        "data1":"686",
        "data2":"23",
        "data3":"265",
        "img2":"",
        "text3":"站酷海洛",
        "time":"推广"
    },
    {
        "img1":"https://img.zcool.cn/community/01da415d1481d9a8012051cdfb95e6.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"统一诚实豆定格动画《源梦记》，一场逃离996的冒险！",
        "text2":"动漫-动画片",
        "data1":"126",
        "data2":"45",
        "data3":"28",
        "img2":"https://img.zcool.cn/community/0448975624423400000132b5993e11.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"蒸汽工场",
        "time":"2小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/01a2585d14892fa8012051cd073369.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"BX-Planet&可口可乐|纯悦王俊凯TVC",
        "text2":"影视-影视合成/剪辑",
        "data1":"1186",
        "data2":"6",
        "data3":"25",
        "img2":"https://img.zcool.cn/community/03196515c430f66a801203d2256c69d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"BXplanet",
        "time":"3小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/01fa655d142831a801215529b873fd.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"社交互动创新 | 从点赞到击掌 ",
        "text2":"文章-观点-多领域",
        "data1":"1236",
        "data2":"4",
        "data3":"18",
        "img2":"https://img.zcool.cn/community/01272c5bf61a14a80121ab5dc54fad.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"非人哉漫画",
        "time":"8小时前"
    },
    {
        "img1":"https://img.zcool.cn/community/01c9b05d146644a8012051cd432c54.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"字如其人 | 楊不過字体设计分享",
        "text2":"文章-观点-平面",
        "data1":"1813",
        "data2":"68",
        "data3":"190",
        "img2":"https://img.zcool.cn/community/04be5f58dbb821a801219c77302e24.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"杨不过",
        "time":"4小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    },
    {
        "img1":"https://img.zcool.cn/community/016a3d5d144e49a801215529d9c9d4.jpg@260w_195h_1c_1e_1o_100sh.jpg",
        "text1":"书籍封面设计 | 捌",
        "text2":"平面-书籍",
        "data1":"11",
        "data2":"6",
        "data3":"2",
        "img2":"https://img.zcool.cn/community/01d7b65cad73fea801208f8b7fec4d.jpg@80w_80h_1c_1e_1o_100sh.jpg",
        "text3":"刘哲_NewJoy",
        "time":"5小时前",
    }
]

function delegation ( eventCallback , selector ){
      return function(evt){
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var targetFamily = [];
          var _tempTarget = target;
          while(true){
              if(_tempTarget === this){
                  break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
            }
            
            var eleList = this.querySelectorAll(selector );
            for(var i = 0 , ele ; ele = eleList[i ++] ;){
                eventCallback.call( ele , e);
            }
      }
}


function handlerMouseOver(){
    this.style.display = "block";
}
function handlerMouseOut(){
    this.style.display = "none";
}

function createElement(json, body2_1){
    var ele = document.createElement(json.type);
    if(json.html != undefined){
        ele.innerHTML = json.html;
    }
    if(json.attr != undefined){
        for(att in json.attr){
            // ele[att] = json.attr[att];
            ele.setAttribute(att,json.attr[att]);
        }
    }
    if(ele.className == "body2_1_div0_span1"){
        ele.innerHTML += str;
        ele.addEventListener("mouseover", delegation ( handlerMouseOver , ".body2_1_div0_span1_div" ))
        ele.addEventListener("mouseout", delegation ( handlerMouseOut , ".body2_1_div0_span1_div" ))
        // console.log(ele);
    }

    body2_1.appendChild(ele);
    body2_1 = ele
    if(json.children != undefined){
        for(var i = 0; i < json.children.length; i++){
            createElement(json.children[i],body2_1);
        }
    }
}

    var str = '<div class="body2_1_div0_span1_div">'+
    '<div class="body2_1_div0_span1_div_1">'+
        '<a href="#" class="body2_1_div0_span1_div_1_a">'+
            '<img class="body2_1_div0_span1_div_1_a_img" src="https://img.zcool.cn/community/012f5f5c0f2492a80121ab5dab9af1.jpg@80w_80h_1c_1e_1o_100sh.jpg" alt="">'+
        '</a>'+
    '</div>'+
    '<div class="body2_1_div0_span1_div_2">'+
        '<a href="#" class="body2_1_div0_span1_div_2_a">_selions</a>'+
    '</div>'+
    '<div class="body2_1_div0_span1_div_3">'+
        '<span class="body2_1_div0_span1_div_3_span">成都｜摄影师</span>'+
    '</div>'+
    '<div class="body2_1_div0_span1_div_4">'+
        '<div class="body2_1_div0_span1_div_4_div">'+
            '<p>创作</p>'+
            '<a href="#" class="body2_1_div0_span1_div_4_div_a">22</a>'+
        '</div>'+
        '<div class="body2_1_div0_span1_div_4_div0">'+
            '<p>粉丝</p>'+
            '<a href="#" class="body2_1_div0_span1_div_4_div0_a">778</a>'+
        '</div>'+
    '</div>'+
    '<div class="body2_1_div0_span1_div_5">'+
        '<input type="button" value="关注" class="body2_1_div0_span1_div_5_ipt1">'+
        '<input type="button" value="私信" class="body2_1_div0_span1_div_5_ipt2">'+
    '</div>'+
'</div>'


for(var i = 0; i < infoArr.length; i++){
    var json = {
        "type":"div",
        "attr":{
            "class":"body2_1_div",
        },
        "children":[
            {
                "type":"img",
                "attr":{
                    "class":"body2_1_div_img",
                    "src": infoArr[i].img1,
                }
            },
            {
                "type":"div",
                "attr":{
                    "class":"body2_1_div_div",
                },
                "children":[
                    {
                        "type":"p",
                        "attr":{
                            "class":"body2_1_div_div_p1"
                        },
                        "html":infoArr[i].text1,
                        "children":[
                            {
                                "type":"a",
                                "attr":{
                                    "href":"#",
                                    "class":"body2_1_div_div_p1_a",
                                }
                            }
                        ]
                    },
                    {
                        "type":"p",
                        "attr":{
                            "class":"body2_1_div_div_p2",
                        },
                        "html":infoArr[i].text2,
                    },
                    {
                        "type":"p",
                        "attr":{
                            "class":"body2_1_div_div_p3",
                        },
                        "children":[
                            {
                                "type":"span",
                                "attr":{
                                    "class":"body2_1_div_div_p3_span1",
                                },
                                "html":infoArr[i].data1,
                            },
                            {
                                "type":"span",
                                "attr":{
                                    "class":"body2_1_div_div_p3_span2",
                                },
                                "html":infoArr[i].data2,
                            },
                            {
                                "type":"span",
                                "attr":{
                                    "class":"body2_1_div_div_p3_span3",
                                },
                                "html":infoArr[i].data3,
                            },
                        ]

                    }
                ]
            },
            {
                "type":"div",
                "attr":{
                    "class":"body2_1_div0",
                },
                "children":[
                    {
                        "type":"span",
                        "attr":{
                            "class":"body2_1_div0_span1",
                        },
                        "children":[
                            {
                                "type":"a",
                                "attr":{
                                    "href":"#",
                                },
                                "children":[
                                    {
                                        "type":"img",
                                        "attr":{
                                            "class":"body2_1_div0_span1_a_img",
                                            "src":infoArr[i].img2,
                                            "alt":""
                                        }
                                    },
                                    {
                                        "type":"span",
                                        "html":infoArr[i].text3,
                                    },
                                    {
                                        "type":"span",
                                        "attr":{
                                            "class":"body2_1_div0_span1_a_span",
                                        },
                                        "html":infoArr[i].time,
                                    },
                                ]
                            },
                        ]
                    }
                ]
            }
        ]
    }
    
    createElement(json,body2_1);
}

var body1_nav = document.getElementById("body1_nav");
var back = document.getElementById("back");
window.onscroll = function(){
    var offSetTop = body1_nav.offsetTop;
    // console.log(offSetTop)
    var scrollTop = document.documentElement.scrollTop;
    if(offSetTop <= scrollTop){
        body1_nav.style.position = "fixed";
        body1_nav.style.top = 0;
        back.style.display = "inline-block"
    }
    if(scrollTop <= 595){
        body1_nav.style.position = "static"; 
        back.style.display = "none"; 
    }
}

// str = '<div class="body2_5_div">'+
// '<img class="body2_5_div_img" src="https://img.zcool.cn/community/01ca945d107c3ba801213ec264fe6a.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt="">'+
// '<a href="#" class="body2_5_div_a">【脉动饮料】脉动饮料怎么样 含有什么营养成分</a>'+
// '</div>'

var json2 = {
    "type":"div",
    "attr":{
        "class":"body2_5_div",
    },
    "children":[
        {
            "type":"img",
            "attr":{
                "class":"body2_5_div_img",
                "src":"https://img.zcool.cn/community/01ca945d107c3ba801213ec264fe6a.jpg@260w_195h_1c_1e_1o_100sh.jpg"
            }
        },
        {
            "type":"a",
            "attr":{
                "href":"#",
                "class":"body2_5_div_a",
            },
            "html":"【脉动饮料】脉动饮料怎么样 含有什么营养成分",
        }
    ]
}
var body2_5 = document.getElementById("body2_5");
for(var i = 0; i < 5; i++){
    createElement(json2, body2_5);
}
