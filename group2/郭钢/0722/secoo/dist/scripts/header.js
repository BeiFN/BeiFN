class Header {
    constructor() {
        this.init()
    }
    init() {
        this.regSelection = $$(".region-selection")
        this.regOption = $$(".region-options")
        this.seaInner = $$(".search-inner")
        this.sSearch = $$(".s-search")
        this.zhTxr = $$(".txr")
        on(this.regSelection, "click", this.changeLanguage.bind(this));
        on(this.regSelection, "mouseout", this.disLanguage.bind(this));
        // on(this.regOption,"mouseover",this.xsLanguage.bind(this));
        // on(this.regOption,"mouseout",this.disLanguage.bind(this));
        on(this.regSelection, "click", this.changeLanguage.bind(this));
        on(document, "click", this.searchLow.bind(this));
        on(document, "click", this.searchLength.bind(this), ".s-search");
    }
    changeLanguage() {
        this.regOption.style.display = "block"
    }
    disLanguage() {
        this.regOption.style.display = "none"
    }
    searchLow() {
        this.sSearch.className = "s-search";
        var timer = null;
        for (var i = 0; i < this.zhTxr.length; i++) {
            this.zhTxr[i].className = this.zhTxr[i].className.replace("tx1", "txr")
        }
    }
    searchLength() {
        this.sSearch.className = "s-search active"
        for (var i = 0; i < this.zhTxr.length; i++) {
            this.zhTxr[i].className = this.zhTxr[i].className.replace("txr", "tx1");
        }

    }

}
new Header();