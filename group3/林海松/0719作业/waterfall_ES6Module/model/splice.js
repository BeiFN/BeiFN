//页面数据分割
export default function(){
    function splice(){

    }
    $.extend(splice.prototype,{
        init : function( wrapper , container , num){
            var children = wrapper.children;
            var arr = [];
            Array.from(children).forEach((box, index) => {
                if (index < num) {
                    arr.push(box.offsetHeight);
                    box.style.left = index * 250 + "px";
                    box.style.top = 0;
                }
                else {
                    var min = Math.min.apply(false, arr);//获取数组中最小的值
                    var min_index = arr.indexOf(min);
                    box.style.position = "absolute";
                    box.style.left = min_index * 250 + "px";
                    box.style.top = min + 20 + "px";
                    arr[min_index] += box.offsetHeight + 20;
                }
                var maxHeight = Math.max.apply(false, arr);
                container.style.height = maxHeight + "px";
            })
        }
    })
    return new splice();
    
}