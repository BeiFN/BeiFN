export default function sort(){
    // 区分 ;
    // 1. 第一排的;
    // 2. 其余的;
    let children = this.wrapper.children;
    // console.log(children);
    Array.from(children).forEach( (box , index) => {
          if(index < this.count){
                box.style.position = "static";
                this.heightArray.push(box.offsetHeight);
          }else{
                // 找到数组之中最小的那一个;
                let min = Math.min.apply(false, this.heightArray);
                let minIndex = this.heightArray.indexOf(min);
                // console.log(min , minIndex)
                box.style.position = "absolute";
                box.style.left     = minIndex * 250 + "px";
                box.style.top      = min + 20 + "px";

                this.heightArray[minIndex] += box.offsetHeight + 20;
          }
    })

    let maxHeight = Math.max.apply(false , this.heightArray);
    let minHeight = Math.min.apply(false , this.heightArray);

    this.container.style.height = maxHeight + "px";
    this.containerHeight = minHeight;

    this.heightArray.length = 0;
}