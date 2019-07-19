// let { on } = Utils;
function Pagination(){
    this.constructor();
}
$.extend(Pagination.prototype , {
    constructor : function(){
        this.Pagination = $(".pagination")[0];
        this.img_list   = $(".img-list")[0];
        this.pageNo     = 1;
        this.showNo     = 5;
        this.template   = `<%  for(var i = 0 , item ; item = data[i]; i++) {%>
            <div class="box">
                  <div class="box-img">
                        <img src="<%= item.cover %>" alt="">
                  </div>
                  <div class="box-title">
                        <a href="">
                              <%= item.title %>
                        </a>
                        <span class="fire"></span>
                  </div>
            </div>
      <% } %>`;
        this.init();
    },
    init : function(){
        this.getDate()
        .done($.proxy(function(res){
            this.r = res.data.contents;
            this.total = this.r.length;
            // console.log(this.total);
            this.render();
            this.renderBtn();
        },this)); // 异步、事件绑定 => 更改this
        $(this.Pagination).on("click","span", $.proxy(function(evt){
            var e = evt || window.event ;
            var target = e.target || e.srcElement ;
            this.toIndex($(target).index()); // 获取下标
            this.render(this.r);
            this.renderBtn();
        },this))
    },
    render : function(){
        var data = this.cutting(this.r);
        var html = ejs.render(this.template , {data : data});
        this.img_list.innerHTML = html;
    },
    getDate : function(){
        var url  = "http://localhost/zc" ;
        var data = {
            pageSize    : 20,
            contentId   : (""+Date.now()).slice(6) + "_3",
            day         : new Date().toISOString().slice(0,10) , 
        }
        return $.ajax(url , {data :data , dataType : "json"});
    },
    cutting : function(data){
        var min  = this.showNo * (this.pageNo - 1);
        var max  = this.showNo * this.pageNo - 1 ;
        var res = [];
        $.each(data , function(index , item){
            if(index >= min && index < max){
                res.push(item);
            }
        })
        return res ;
    },
    renderBtn : function(){
        var group = Math.ceil(this.total / this.showNo);
        var html = "";
        for(var i = 0 ; i < group ; i++){//动态添加span标签
            if( i+1 === this.pageNo ){
                html += `<span class="active">${i+1}</span>`;
            }
            else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.Pagination.innerHTML = html  ;
    },
    toIndex : function(index){
        this.pageNo = index + 1 ;
    }

})
new Pagination();