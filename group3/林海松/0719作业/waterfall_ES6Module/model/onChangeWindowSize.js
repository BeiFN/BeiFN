export default function onChangeWindowSize(container){
    
        var clientW = $(document).width();
        var count   = parseInt( clientW / 250 );
        container.style.width = count * 250 + "px";
        return count 
}