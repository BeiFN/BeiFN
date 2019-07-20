let url = "http://localhost/dt";
let data = {//接口参数
    include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
    // filter_id: "美食菜谱",
    filter_id: "手工DIY",
    start : "0"
};

export { url, data }