class Public {
    static $(selector) {
        let ele = document.querySelectorAll(selector);
        return ele.length === 1 ? ele[0] : ele;
    }

    static on(dom, event_type, handlerEvent) {
        dom.addEventListener(event_type, handlerEvent);
    }
}