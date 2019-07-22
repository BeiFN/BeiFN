//数据加载

export default {
    url  : "http://localhost/zc" ,
    data : {
        pageSize    : 20,
        contentId   : (""+Date.now()).slice(6) + "_3",
        day         : new Date().toISOString().slice(0,10) , 
    }
}