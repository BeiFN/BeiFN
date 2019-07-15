class Pagination{
    constructor(){
        this.init();
    }
    init(){
        let res = this.loadData();
            console.log(res);  //为什么这里打印不出来res 的值呢
    
        //获取数据后 => 渲染页面
        // this.render(res);
    
    }
    //加载数据
    loadData(){
        this.imgbox = $(".imgbox");
        let url = "http://localhost/zc";
        let data = {
            pageSize : 21,//这里的数据最多就20条
            // contentId : 9197857_3,//T猜是时间戳
            contentId :( "" + Date.now()).slice(6) +"_3",
            day : new Date().toJSON().slice(0,10)
        }
        // ajax(url , {data}) //{"code":0,"msg":"success","data":{"contents":[],"day":"2019-07-13"}}
        ajax(url , {data , dataType : "json"})
        .then(res => {
            return res;  
        })
    }
}