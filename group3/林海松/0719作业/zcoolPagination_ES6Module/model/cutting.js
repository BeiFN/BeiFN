export default function(){
    function cutting(){
        
    }
    $.extend(cutting.prototype,{
        init : function(showNo , pageNo , data ){
            var min  = showNo * (pageNo - 1);
            var max  = showNo * pageNo - 1 ;
            var res  = []
            $.each(data , function(index , item){
                if(index >= min && index <= max){
                    res.push(item);
                }
            })
            return res ;
        }
    })
    return new cutting();
}