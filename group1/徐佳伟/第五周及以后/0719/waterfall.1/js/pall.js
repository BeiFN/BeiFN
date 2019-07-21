//我不容易啊！！！
function Pall(){}

$.extend(Pall.prototype , {
    init : function(){
        this.url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
        this.wrapper = $(".wrapper");
        this.container = $(".container");      
        //加载数据的起始点
        this.start = 1;
        //当前显示的条数
        this.count = 0 ;
        //存入第一行盒子的高度
        this.heightArray = [];
        //当前页面的最大高度
        this.maxHeight = 0;
        this.minHeight = 0;
        //延时器
        this.timer = null;
        this.flag = false;
        //获取数据
        res = new Load().init(this.start);
        res.then($.proxy(function(res){

            this.data = res.data.object_list;
            //改变container宽度
            this.changeContainerWidth();
            $(window).on( "resize" , $.proxy(function(){
                //防止抖动
                clearTimeout(this,this.timer);
                this.timer = setTimeout($.proxy(function(){
                    this.changeContainerWidth();
                    // this.render();
                    this.sort();
                    this.timer = null;
                },this),800)
            },this))
            //进行页面渲染
            this.render();
            this.sort();
    
            this.setAllimg();
            //获取当前窗口的高度
            this.cHeight = document.documentElement.clientHeight;
            //无线加载数据

            document.onscroll = $.proxy(function(){
                let scrollTop = $("body,html").scrollTop();
                this.showImg(scrollTop);                
                this.loadData(scrollTop);          
            },this);
            
            this.showImg(0);

        },this))
    },
    loadData : function(scrollTop){
        if(scrollTop > this.minHeight -this.cHeight){
            if(this.timer === null){
                this.timer = setTimeout($.proxy(function(){
                    let res = new Load().init((++this.start) *10);
                    res.then($.proxy(function(res){
                        res = res.data.object_list;
                        for (let i = 0 ; i < 24 ; i++){
                            this.data.push(res[i]);
                        }
                        this.render();
                        this.sort();
                        this.setAllimg();
                        this.showImg(scrollTop);
                        this.timer = null;
                    },this))
                },this),0)
            }
        }
    },
    changeContainerWidth : function(){
        var cWidth = document.documentElement.clientWidth;
        //实时获取窗体的总条数
        this.count = parseInt(cWidth / 250);
        //根据总条数改变container宽度
        this.container.width(this.count * 250) ;
    },
    render : function(){
        var html = "";
        for(var i = 0 ; i < this.data.length ; i++){
            var boxHeight = parseInt(235/ this.data[i].photo.width * this.data[i].photo.height);
            html += `<div class="box" data-img="${this.data[i].photo.path}">
                            <div class="box-img" style = "height:${boxHeight}px" >
                                <img src="${this.url}" alt="">
                                <u style = "height:${boxHeight}px"></u>
                            </div>
                            <div class="box-detail">
                                <div class="title">
                                    ${this.data[i].msg}
                                </div>
                            </div>
                    </div>`;
        }
        this.wrapper.html(html);
    },
    sort : function(){
        var children = this.wrapper.children();
        $.each(children , $.proxy(function(index ,item){
            if(index < this.count){
                this.heightArray.push($(item).height());
                $(item).css("position" , "static");
            }else{
                var min  = Math.min.apply(false , this.heightArray);
                var minIndex = this.heightArray.indexOf(min);
                $(item).css({
                    "position" : "absolute",
                    "left" : minIndex * 250,
                    "top"  : min + 20
                })              
                this.heightArray[minIndex] += $(item).height() + 20 ;
            }
        },this))       
        //设置窗体的最大高度
        this.maxHeight = Math.max.apply(false , this.heightArray);
        this.minHeight = Math.min.apply(false , this.heightArray);
        this.container.height(this.minHeight) ;
        //清空数组
        this.heightArray.length = 0;
    },
    setAllimg : function(){
        this.imgs = this.wrapper.children().toArray();
        $.each(this.imgs , $.proxy(function(index ,item){
            $(item).attr("data-top", $(item).offset().top);
        },this))      
    },
    showImg : function(scrollTop){
        $.each(this.imgs , $.proxy(function(index,item){
            var img_top = $(item).attr("data-top");
            if( scrollTop + this.cHeight >= img_top - 300){

                var src = $(item).attr("data-img");
                // console.log($(item).children().children()[0]);
                $(item).children().children()[0].src = src;
               
            }
        },this))      
    }
})

function Load(){}
$.extend(Load.prototype , {
    init : function(start){
        let url = "http://localhost/dt";
        let data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "手工DIY",
            start : start
        };
        return $.ajax(url,{data : data , dataType : "json"});     
    }
})
new Pall().init();
// class Pall{
//     constructor(){
//         this.init();
//     }
//     async init(){
//         this.url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
//         this.wrapper = $(".wrapper");
//         this.container = $(".container");      
//         //加载数据的起始点
//         this.start = 1;
//         //当前显示的条数
//         this.count = 0 ;
//         //存入第一行盒子的高度
//         this.heightArray = [];
//         //当前页面的最大高度
//         this.maxHeight = 0;
//         this.minHeight = 0;
//         //延时器
//         this.timer = null;
//         this.flag = false;
//         //获取数据
//         this.data = await new Load().init(this.start);
//         console.log(this.data);
//         //改变container宽度
//         this.changeContainerWidth();
//         on(window , "resize" , ()=>{
//             //防止抖动
//             clearTimeout(this,this.timer);
//             this.timer = setTimeout(()=>{
//                 this.changeContainerWidth();
//                 // this.render();
//                 this.sort();
//                 this.timer = null;
//             },800)
//         })
//         //进行页面渲染
//         this.render();
//         this.sort();

//         this.setAllimg();
//         //获取当前窗口的高度
//         this.cHeight = document.documentElement.clientHeight;
//         //无线加载数据
//         document.onscroll = function(){
//             let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//             this.showImg(scrollTop);                
//             this.loadData(scrollTop);          
//         }.bind(this);
        
//         this.showImg(0);
//     }
//     //滑到最底部时数据的加载
//     loadData(scrollTop){ 
//         // console.log(scrollTop,this.maxHeight -this.cHeight); 
//         if(scrollTop > this.minHeight -this.cHeight){
//             if(this.timer === null){
//                 this.timer = setTimeout(async ()=>{
//                     let res = await new Load().init((++this.start) *10);
//                     console.log(this.start)
//                     for (let i = 0 ; i < 24 ; i++){
//                         this.data.push(res[i]);
//                     }
//                     this.render();
//                     this.sort();
//                     this.setAllimg();
//                     this.showImg(scrollTop);
//                     this.timer = null;
//                 },0)
//             }
//         }
//     }
//     changeContainerWidth(){
//         let cWidth = document.documentElement.clientWidth;
//         //实时获取窗体的总条数
//         this.count = parseInt(cWidth / 250);
//         //根据总条数改变container宽度
//         this.container.style.width = this.count * 250 + "px";
//     }
//     render(){
//         let html = "";
//         for(let i = 0 ; i < this.data.length ; i++){
//             let boxHeight = parseInt(235/ this.data[i].photo.width * this.data[i].photo.height);
//             html += `<div class="box" data-img="${this.data[i].photo.path}">
//                             <div class="box-img" style = "height:${boxHeight}px" >
//                                 <img src="${this.url}" alt="">
//                                 <u style = "height:${boxHeight}px"></u>
//                             </div>
//                             <div class="box-detail">
//                                 <div class="title">
//                                     ${this.data[i].msg}
//                                 </div>
//                             </div>
//                     </div>`;
//         }
//         this.wrapper.innerHTML = html;
//     }
//     sort(){
//         let children = this.wrapper.children;
//         console.log(children)
//         Array.from(children).forEach((box,index)=>{
//             if(index < this.count){
//                 this.heightArray.push(box.offsetHeight);
//                 box.style.position = "static";
//             }else{
//                 let min  = Math.min.apply(false , this.heightArray);
//                 let minIndex = this.heightArray.indexOf(min);
                
//                 box.style.position = "absolute";
//                 box.style.left = minIndex * 250 + "px";
//                 box.style.top  = min + 20 + "px";
//                 this.heightArray[minIndex] += box.offsetHeight + 20 ;
//             }
//         })
//         //设置窗体的最大高度
//         this.maxHeight = Math.max.apply(false , this.heightArray);
//         this.minHeight = Math.min.apply(false , this.heightArray);
//         this.container.style.height = this.minHeight + "px";
//         //清空数组
//         this.heightArray.length = 0;
//     }
//     setAllimg(){
//         this.imgs = Array.from(this.wrapper.children);
//         this.imgs.forEach((img)=>{
//             img.setAttribute("data-top", img.offsetTop);
//         })
//     }
//     showImg(scrollTop){   
//         // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;    
//         this.imgs.forEach((img)=>{
//             let img_top = img.getAttribute("data-top");

//             if( scrollTop + this.cHeight >= img_top - 300){

//                 let src = img.getAttribute("data-img");
//                 img.children[0].children[0].src = src;
               
//             }
//         })
//     }
// }

// class Load{
//       constructor(){
            
//       }
//       async init(start){
//             let url = "http://localhost/dt";
//             let data = {
//                   include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//                   filter_id: "手工DIY",
//                   start : start
//             };
//             let res = await ajax(url,{data : data , dataType : "json"});
//             return res.data.object_list;
//       }

// }




