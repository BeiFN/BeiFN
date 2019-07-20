function sault(){
    this.init();
}
$.extend(sault.prototype,{
    init : function(){
        this.wrapper   = $(".wrapper")[0];
        this.container = $(".container")[0];

        this.timer     = null ;
        var count      = this.onChangeWindowSize();

        $(window).on("resize",$.proxy(function(){
            clearTimeout(this.timer);
            this.timer = setTimeout($.proxy(function(){
                var count = this.onChangeWindowSize();
                this.splice(count);
                this.timer = null ;
            },this),300)
        },this))

        this.getData().done($.proxy(function(res){
            var data = res.data.object_list;
            this.render(data);
            this.splice(count);
        },this));      
    },
    onChangeWindowSize : function(){
        var clientW = $(document).width();
        var count   = parseInt( clientW / 250 );
        this.container.style.width = count * 250 + "px";
        return count ;
    },
    render : function(data){
        var html = "";
        $.each(data,function(index , item){
            // console.log(item);
            var proportionH = parseInt( 235 / item.photo.width * item.photo.height);
            html +=`<div class="box">
                    <div class="box-img" style="height:${proportionH}px">
                        <img src="${item.photo.path}" alt="">
                        <u style="height:${proportionH}px"></u>
                    </div>
                    <div class="box-detail">
                        <div class="title">
                            ${item.msg}
                        </div>
                    </div>
                </div>`
        })
        this.wrapper.innerHTML = html;
    },
    splice : function(num){
        var children = this.wrapper.children;
        var arr      = [];
        Array.from(children).forEach( (box , index)=>{
            if(index  < num){
                arr.push(box.offsetHeight);
                box.style.left = index * 250 +"px" ;
                box.style.top  = 0 ;
                // box.style.position = "static";
            }
            else{
                let min = Math.min.apply(false,arr);//获取数组中最小的值
                let min_index = arr.indexOf(min);
                box.style.position = "absolute";
                box.style.left     = min_index * 250 + "px" ;
                box.style.top      = min + 20 + "px" ;
                arr[min_index]  += box.offsetHeight + 20 ; 
            }
            let maxHeight = Math.max.apply(false,arr);
            this.container.style.height = maxHeight + "px" ;
        })
        
    },
    getData : function(){
        var url = "http://localhost/dt";
        var data = {
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id      : "美食菜谱" ,
            start          : 0 ,
            _              :  Date.now() 
        }
        return $.ajax( url , {data : data , dataType : "json"});
    }
})
new sault();