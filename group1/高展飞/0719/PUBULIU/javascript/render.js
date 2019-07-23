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
       
       
    
}