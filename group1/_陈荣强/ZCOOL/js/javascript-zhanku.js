// window.onload=function()
// {
//     var oDiv=document.getElementById('banner');
//     var oUl=document.getElementById('qw');
//     var aLi=oUl.getElementsByTagName('li');

//     var iSpeed=5;
//     oUl.innerHTML+=oUl.innerHTML;
//     oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

//     setInterval(function()
//     {
//         oUl.style.left=oUl.offsetLeft-iSpeed+'px';
//         if(-oUl.offsetWidth/2 >oUl.offsetLeft)
//         {
//             oUl.style.left='0';
//         }
//     },30);
// }