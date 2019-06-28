function $(selector){
    var ele = null;
    return (ele =document.querySelectorAll(selector)).length ===1 ? ele[0] : ele;
}

var discover = $(".discover");
var discover_hidden = document.querySelector(".discover_hidden1");
discover.addEventListener("mouseover", showListTwo);
discover.addEventListener("mouseout",hiddenListTwo);
function showListTwo(){
    discover_hidden.style.display = "block";
}
function hiddenListTwo(){
    discover_hidden.style.display = "none";
}
var changeBg = $(".changeBg");
changeBg.addEventListener("mouseover",delegation(changeBackground,"span"));
changeBg.addEventListener("mouseout",delegation(hiddenBg,"span"));
var changeColor = $(".changeColor");
changeColor.addEventListener("mouseover",delegation(changeSpanColor,"span"));
changeColor.addEventListener("mouseout",delegation(hiddenSpanColor,"span"));

function changeBackground(){
    this.style.backgroundColor = "yellowgreen";
}
function hiddenBg(){
    this.style.backgroundColor = "";
}
function changeSpanColor(){
    console.log(this);
    this.style.color = "yellow";
}
function hiddenSpanColor(){
    this.style.color = "";
}

/*返回顶部 */
window.onscroll = function(){
    var goTop = $("#goTop");
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    if(scrollTop < 100){
        goTop.style.display = "none";
    }else if(scrollTop >100 && scrollTop < 3100){
        goTop.style.cssText = "position:fixed; display:block;top:600px";
    }else{
        // goTop.style.csstext = "position:absolute;display:block;top:2600px;"
        goTop.style.position = "absolute";
        goTop.style.display = "block";
        goTop.style.top = "3700px";
    }
    goTop.onclick = function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0 ;
    }
}
/*foot 选中变色 */

var foot = $(".foot");
foot.addEventListener("mouseover", delegation(aInFootChande,"a"));
foot.addEventListener("mouseout", delegation(aInFootHidden,"a"));
function aInFootChande(){
    this.style.color = "#999";
}
function aInFootHidden(){
    this.style.color = "#666";
}


/* button 选中变色 */

var button  =$(".button");
button.addEventListener("mouseover",delegation(changeButtonColor,"a"));
button.addEventListener("mouseout",delegation(returnButtonColor,"a"));
function changeButtonColor(){
    this.style.backgroundColor = "orange";
}
function returnButtonColor(){
    this.style.backgroundColor = "";
}

/* list列表 */
var json ={
    contentList:[
        {
            url:"https://img.zcool.cn/community/0176e15d147a0ba80121552942355a.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            title:"#2019毕业展#清华美院研究生作品展",
            content:"纯艺术-油画",
            item:{
                view:"9395",
                comment:"9",
                dianzan:"64",
            },
            bottom:{
                piclink:"https://img.zcool.cn/community/04ee675900601ba80121455021844d.jpg@160w_160h_1c_1e_1o_100sh.jpg",
                name:"站酷青春答卷",
                time:"一小时前",
            },
        },
    ],
}
var list = $(".sbox");

for(var count = 0, ele = json.contentList[0];count++ < 40 ;){
    var div = createElement({
        type:"div",
        attr:{
            class:"card_box",
        },
        children:[
            {
                type:"div",
                attr:{
                    class:"box_img",
                },
                children:[
                    {
                        type:"a",
                        attr:{
                            herf:"#"
                        },
                        html:'<img src = "'+ele.url +'">',
                    }
                ],
            },
            
            {
                type:"div",
                attr:{
                    class:"box_info",
                },
                children:[
                    {
                        type:"p",
                        attr:{
                            class:"box_info_title",
                        },
                        children:[
                            {
                                type:"a",
                                attr:{
                                    href:"#",
                                },
                                html:ele.title,
                            },
                        ],
                    },

                    {
                        type:"p",
                        attr:{
                            class:"box_info_content",
                        },
                        html:ele.content,
                    },

                    {
                        type:"p",
                        attr:{
                            class:"box_info_item",
                        },
                        children:[
                            {
                                type:"span",
                                attr:{
                                    class:"box_info_view",
                                },
                                html:ele.item.view,
                            },
                            {
                                type:"span",
                                attr:{
                                    class:"box_info_comment",
                                },
                                html:ele.item.comment,
                            },
                            {
                                type:"span",
                                attr:{
                                    class:"box_info_dianzan",
                                },
                                html:ele.item.dianzan,
                            },
                        ],
                    },
                ],
            },

            {
                type:"div",
                attr:{
                    class:"box_bottom",
                },
                children:[
                    {
                        type:"span",
                        attr:{
                            class:"box_bottom1",
                        },
                        children:[
                            {
                                type:"a",
                                attr:{
                                    href:"#",
                                    class:"userInfo",
                                    index: "0",//i-1,
                                },
                                html:'<img src = "'+ele.bottom.piclink +'">'+ele.bottom.name,
                            },
                        ],
                    },
                    {
                        type:"span",
                        attr:{
                            class:"box_bottom2",
                        },
                        html:ele.bottom.time,
                    },
                ]
            },
        ],
    });
    // div.index = 0 ;//div.index = i-1;
    list.appendChild(div);
}
on(list,"mouseover",showInfo,".userInfo");
on(list,"mouseout",hiddenInfo,".userInfo");
function showInfo(){
    var div = createElement({
        type:"div",
        attr:{
            class:"user",
        },
        children:[
            {
                type:"div",
                attr:{
                    class:"pic",
                },
                html:'<img src = "'+ json.contentList[this.getAttribute("index")].bottom.piclink+'"=>',
            },
        ],
    });
    this.appendChild(div);
}
function hiddenInfo(){
    this.children[1].remove();
}