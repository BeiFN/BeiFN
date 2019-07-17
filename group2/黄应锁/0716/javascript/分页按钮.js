function Paganition(
    {
        list = "",
        template = "",
        pagination = "",
        showNum = 5,
        pageNum = 1,
        getData = {
            url: "",
            data: {},
        }
    } = {}
) {
    this.main = $(list);
    this.template = $(template)[0].innerHTML;
    // console.log($("#template")[0]);
    this.pagination = $(pagination);
    this.showNum = showNum;
    this.pageNum = pageNum;
    this.url = getData.url;
    this.data = getData.data;
    this.init();
}


$.extend(Paganition.prototype, {
    init:async function () {
        // this.res = await new LoadData().init(this.url, this.data);
        this.res = await this.LoadData();
        this.render();
        this.renderBtn();
        this.pagination.on( "click","span", $.proxy(function(evt){
            var target = evt.target;
            // this.changeContentFloor.call(this,$(target).index());
            this.toIndex.call(this,$(target).index());
            this.render();
            this.renderBtn();
        },this)
        );
        
    },
    render:function(){
        let data = this.res.data.contents;
        // let data = this.res.goods_list;
        data = this.interceptData(data);
        // console.log(this.template,data);

        let html = ejs.render(this.template, {data : data});
        this.main.html(html);
        // console.log(this.main.innerHTML);
    },
    interceptData:function(data){
        let min =this.showNum * (this.pageNum - 1); 
        let max =this.showNum *(this.pageNum - 1) + this.showNum- 1  ; 
        data = data.filter((item,index )=> {
            return index >= min && index <= max;
        });
        return data;
    },
    renderBtn:function(){
        let total = Math.ceil(this.res.data.contents.length/this.showNum);
        // let total = Math.ceil(this.res.data.conte.length/this.showNum);
        let btns = this.pagination.children;
        if(btns.length === total){
            // for(let i = 0, btn; btn = btns[i++]; ){
            //     btn.className = "";
            // }
            // btns[this.pageNum - 1].className = "active";
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1 === this.pageNum){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            });
            return false;
        }
        let html = "";

        for(let i = 0 ;i < total ; i++){
            if( i === this.pageNum - 1){
                html += `<span class=active>${this.pageNum}</span>`;
            }else{
                html += `<span>${i + 1}</span>`;
            }
        }
        this.pagination.html(html);
    },
    toIndex: function(index){
        this.pageNum = index +1 ;
    },
    LoadData:async function(){
        let res = await $.ajax(this.url,{
            data:this.data,
            dataType: "json",
        })
         return res;
    }
});
new Paganition({
    list:".hot",
    template: "#template",
    pagination : ".pagination",
        showNum : 5,
        pageNum : 1,
        getData : {
            url : "http://localhost/zc",
            data : {
                pageSize : 100,
                contentId : (""+Date.now()).slice(6) + "_3",
                day : new Date().toISOString().slice(0,10)
            },
        }
});
