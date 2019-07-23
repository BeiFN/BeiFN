
export default {
    async init(start) {
        let url = "http://localhost/dt";
        let data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "古风",
            start: start,
            // _: 1563087570106,
        };
        return await $.ajax(url, { data: data, dataType: "json" })
    }
};