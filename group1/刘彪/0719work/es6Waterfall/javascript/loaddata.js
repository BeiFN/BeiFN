let {ajax} = Utils;

//数据的加载;
export class Load {
    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "搞笑萌宠",
            start: start
        };
        let res = await ajax(url, { data: data, dataType: "json" });
        Load.next_start = res.data.next_start;
        return res.data.object_list; //返回的是一个数组;
    }
    static next_start = 0;
}
 
