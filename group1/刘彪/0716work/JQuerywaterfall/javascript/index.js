function Waterfall(){
    this.init();
}

$.extend(Waterfall.prototype,{

    init:function(){
        this.template = $("#template");
        this.container=$(".container");

        //第一排能放下多少元素;
        this.count = 0;
        this.heightArray = [];
        this.changeContaineWidth();


        let timer = null;
        //窗口尺寸改变的节流;
        var tem = this;
        $(window).on("resize",$.proxy(function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                tem.changeContaineWidth();
                timer = null;
            },500)},this)
        );
        var res = new Load().init(0)
        .then($.proxy(function(res){
            res = res.data.object_list; //res是数组;
            this.render(res);
            this.sort();
        },this));


    },
   
    changeContaineWidth : function(){
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.css({
            width : this.count * 250
        })
    },
    render(list) {
        
        let html = "";
        for (var i = 0; i < list.length; i++) {
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `   <div class="box">
                                <div class="box-img" style = "height:${scaleHeight}px">
                                      <img src="${list[i].photo.path}" alt="">
                                      <u style="height:${scaleHeight}px"></u>
                                </div>
                                <div class="box-detail">
                                      <div class="title">
                                            ${list[i].msg}
                                      </div>
                                </div>
                         </div>`
        }
     
        this.container.html(html);
    },
    sort : function(){
        //区分;
        //1.第一排的;
        //2.其余的;
        var temp = this;
        var children = this.container.children(); //jquery对象;
        //  children= Array.from(children); //原生dom对象数组;
       children.each(function(index,box){
            if(index < temp.count){
                $(box).css({
                    positon : "static",
                })
                temp.heightArray.push($(box).height());
            }
            else{
                //找到数组中最小的那一个;
                var min = Math.min.apply(false, temp.heightArray);
                var minIndex = temp.heightArray.indexOf(min);
                // console.log(temp.heightArray, minIndex)
                $(box).css({
                    position : "absolute",
                    left : minIndex*250 ,
                    top : min+20,
                })
                temp.heightArray[minIndex] += $(box).height() + 20;
            }
        })

        let maxHeight = Math.max.apply(false,this.heightArray);
        this.container.css({
            height : maxHeight
        })
    }

})



function Load(){
}
$.extend(Load.prototype,{
    init : function(start){
        var url = "http://localhost/dt";
        var data = {
            include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id:"搞笑萌宠",
            start: start
        };
        var res = $.ajax({url,data:data,dataType : "json"});
        // return res.data.object_list;
        return res;
    }
})


new Waterfall();