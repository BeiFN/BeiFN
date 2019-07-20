export class Render{
    
    //渲染页面;
    render(list) {
        let html = "";
        for (let i = 0; i < list.length; i++) {
            //根据宽度比例计算box的高度;
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box">
                      <div class="box-img" style ="height:${scaleHeight}px">
                            <img src="${list[i].photo.path}" alt="">
                            <u style ="height:${scaleHeight}px"></u>
                      </div>
                      <div class="box-detail">
                            <div class="title">
                                  ${list[i].msg}
                            </div>
                      </div>
                   </div>
               
                  `
        }
       return  html;

    }
        //排版;
        sort(container,count) {
            //区分;
            //第一排和其余排;
            let heightArray=[];
            let children = container.children;
    
            Array.from(children).forEach((box, index) => {
                if (index < count) {
                    box.style.position = "static";
                    //刚开始,将第一排盒子的高度放进数组;
                    heightArray.push(box.offsetHeight);
                } else {
                    //取出高度数组里最小的高度及其所在下标;
                    let min = Math.min.apply(false, heightArray);
                    let minIndex = heightArray.indexOf(min);
    
                    // console.log(min,minIndex);
                    box.style.position = "absolute";
                    box.style.left = minIndex * 250 + "px";
                    box.style.top = min + 20 + "px";
                    //更新高度;
                   heightArray[minIndex] += box.offsetHeight + 20;
    
                }
    
            })
    
            //改变容器的高度;
            let maxHeight = Math.max.apply(false, heightArray);
            let minHeight = Math.min.apply(false,heightArray);
            container.style.height = maxHeight + "px";
    
            let containerHeight = minHeight;
            heightArray.length = 0;

            return containerHeight;
        }
       
    
}