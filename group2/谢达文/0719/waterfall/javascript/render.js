export default function render(wrapper, list){    
    let html = "";
    for(var i = 0 ; i < list.length ; i ++){
          let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
          html += `<div class="box">
                      <div class="box-img" style="height:${scaleHeight}px">
                            <img src="${list[i].photo.path}" alt="">
                            <u style="height:${scaleHeight}px"></u>
                      </div>
                      <div class="box-detail">
                            <div class="title">
                                  ${list[i].msg}
                            </div>
                      </div>
                </div>`
    }      
    
    wrapper.innerHTML += html;
}