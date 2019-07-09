class Jd{
    constructor(){
        this.logo_tit_lk = $(".logo_tit_lk");
        this.init();
    }

    init(){
        this.logo_tit_lk.addEventListener("mouseenter",this.logoChange.bind(this));
    }

    logoChange(){
        console.log(1);
        // this.logo_tit_lk.className=" enterChange";
    }



    static $(selector){
        let ele = null;
        return (ele = document.querySelectorAll(selector)).length===1?ele[0]:ele;
    }
}








let {$} = Jd;
new Jd();











