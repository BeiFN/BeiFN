class Render {
    constructor() {}
    init(res) {
        let data =res.data.object_list;
        let html = "";
        for (let i = 0; i < data.length; i++) {
            let scaleHeight = parseInt(235 / data[i].photo.width * data[i].photo.height);
            //style =" height:${scaleHeight}px"
            html += `<div class="box">
                                 <div class="box-img" style =" height:${scaleHeight}px" >
                                        <img  src="${data[i].photo.path}" alt="">
                                </div>
                                <div class="box-title">${data[i].msg}</div>
                        </div>`
        }
        return html;
    }
}
export default new Render();