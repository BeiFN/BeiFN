import render from "./renderpage.js";
import renderbtn from "./renderbtn.js";
import loaddata from "./loaddata.js";

export default function(){
        var page_wrapper = $(".pagination");
        var list_wrapper = $(".img-list");
        // var html = null;
        // var htmlbtn = null;
        var globle = null;
        this.show_No = 5;
        this.page_No = 1;


        // on(page_wrapper,"click",function(evt){
        //     console.log(1);
        //     renderbtn.toIndex(evt.target.index());
        //     renderbtn.renderBtn();
        //     render.renderPage();
        // },"span")

        

        var def = loaddata.init();
        def.then(function(res){
            globle = res;
            var html = render.init(res);
            $(list_wrapper).html(html);
            // var total = res.data.contents.length;
            var htmlbtn = renderbtn.init(res);
            $(page_wrapper).html(htmlbtn);
        })

        page_wrapper.on("click","span",$.proxy(function(evt){
            renderbtn.toIndex($(evt.target).index());
            renderbtn.renderBtn(globle);
            render.renderPage(globle);
        },this));

        // var total = this.res.data.contents.length;
        // renderPage();
        // renderBtn();
}
