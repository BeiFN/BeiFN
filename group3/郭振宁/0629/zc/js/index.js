var pic = document.getElementsByClassName("pic_box")[0];
var leftBtn = document.querySelectorAll(".left_button")[0];
var rightBtn = document.querySelectorAll(".right_button")[0];
var showIndex = 0;
var timer = null;
leftBtn.addEventListener("click" , function() {
    if(showIndex === 0) {
        pic.style.left = -5500 + "px";
        showIndex = [].slice.call(pic.children).length - 2;
    }else {
        showIndex--;
    }
    moving(showIndex * -1380);
});
rightBtn.addEventListener("click" , function() {
    if(showIndex === [].slice.call(pic.children).length - 1){
        pic.style.left = 0 + "px";
        showIndex = 1;
    }else{
        showIndex ++;
        console.log(showIndex , pic , [].slice.call(pic.children).length - 1);
    }
    moving(showIndex * -1380);
})

function moving(showIndex) {
    clearInterval(timer);
    timer = setInterval(function() {
        var speed = (showIndex - pic.offsetLeft) / 20;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if(pic.offsetLeft === showIndex) {
            clearInterval(timer);
        }else {
            pic.style.left = pic.offsetLeft + speed + "px";
        }
    },20)
}

