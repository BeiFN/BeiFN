#####
window.conform: 显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框。
window.prompt： 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。
eval :JS解析的调用装置， 是全局对象的一个函数属性。
this :就是一个指针 ，但仅限于在运行环境(函数)之中存在。
window.scroll 滚动
document.body.scrollTop
document.documentElement.scrollTop
DOM : document object model 文档对象模型

DOM的选择器:
1、id选择器    getElementById()        性能最好的选择器   范围 + 选择器
2、class选择器 genElementByClassName()    范围 + 选择器  class选择器性能极差，兼容性不好； ie8 +不建议使用
3、标签选择器  document.getElementByTagName()      范围 + 选择器
选择到多个重复元素时，取到的元素一定是维数组：HTMLCollection 、NodeList
jQuery =>是性能最高的选择器：
1、document.querySelector()  // 选择单个元素
2、document.querySelectorAll() //选择多个重复元素
document.creatElement("标签")
DOM =====》  删查改
----------增------------
1、document.creatElement("标签")
2、document.body.appendChild()    向后插入
3、document.body.insetBefore(newnode,oldnode)  插入在元素的前方

----------删------------
1、document.body.removeChild()
2、remove()

----------改------------
1、innerHTML
2、innerText

三大操作属性：
1、getAttribute("属性")  返回属性值  
2、setAttribute("属性" , "属性值")  
3、removeAttribute("属性") 
简写可以是：box.id = "yanghuaizhi"    box.className = "tangyang"  前提是：常用的

offsetwidth ||  offstheight    //offset系列方法消耗性能
offsetwidth :计算元素的可视宽度，边框计算在内
offsetheight:计算元素的可视高度

window.onload 加载完成后才开始调用
img.onload = function(){}


