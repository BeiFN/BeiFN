export default function(childrenList,count){
	let children = childrenList ;
	let height_array = [];
	
	$.each(children,function(index,box){
		if(index < count){
			//判断是否是第一排
			height_array.push(box.offsetHeight);
			box.style.position = "static";
		}else{
			let min = Math.min.apply(false, height_array);
			let minIndex =  height_array.indexOf(min);
			box.style.position = "absolute";
			box.style.left = 250 * minIndex + "px";
			box.style.top = min + 15 + "px";
			height_array[minIndex] += + box.offsetHeight + 20 ;
		}
	})
	
	return height_array;
	// this.container.style.height = Math.max.apply(false,this.height_array) + "px";
	// this.minHeight = Math.min.apply(false , this.height_array);
}