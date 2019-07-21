let {ajax} = Utils;
class Load{
    constructor(){
          
    }
    async init(start){
          let url = "http://localhost/dt";
          let data = {
                include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                filter_id: "手工DIY",
                start : start
          };
          let res = await ajax(url,{data : data , dataType : "json"});
          return res.data.object_list;
    }

}
export default new Load();