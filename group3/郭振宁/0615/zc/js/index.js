// var pic = document.getElementsByClassName("pic_box")[0];
// var count = 1;
// var point = 1;
// function animate() {
//     var t1 = setInterval(function() {
//         // console.log("haha ");
//         var dis = 1380 * count;
//         var left = pic.offsetLeft;
//         console.log(left);
//         pic.style.left = -(dis * Math.sin(Math.PI/180 * point)) + "px";
//         if(left === -1380 * count) clearInterval(t1);
//         point +=5;
//     },50)
// }
// setInterval(function() {
//     animate();
//     count++;
// },500)