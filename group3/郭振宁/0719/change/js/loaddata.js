export default function(s) {
    var getData = {
        url  : "http://localhost/zc",
        data : {
                pageSize : 100,
                contentId: (""+Date.now()).slice(6) + "_3",
                day : new Date().toISOString().slice(0,10)
        }
    }
    // let res = await ajax( this.url , {data : this.data , dataType : "json"});
    var url          = getData.url;
    var data         = getData.data;

    return s.ajax( url , {data : data , dataType : "json"});
    // return res;
}
