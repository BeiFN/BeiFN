export default function sort(){
    var Cwidth=document.documentElement.clientWidth;
    var wrapper=$(".wrapper");
    var container=$(".container");
    var count=parseInt(Cwidth/250);
    var children = $(wrapper).children();
    var heightArray=[];
    Array.from(children).forEach( function(box , index){
          if(index < count){
                box.style.position = "static";
                heightArray.push(box.offsetHeight);
          }else{
                box.style.position = "absolute";
                var min = Math.min.apply(false, heightArray);
                var minIndex = heightArray.indexOf(min);
                box.style.left     = minIndex * 250 + "px";
                box.style.top      = min + 20 + "px";
                heightArray[minIndex] += box.offsetHeight + 20;
          }
    })
    var maxHeight = Math.max.apply(false , heightArray);
    $(container).css({
        height:maxHeight
    });
    heightArray.length=0;
}
