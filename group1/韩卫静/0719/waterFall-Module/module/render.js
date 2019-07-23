export default function(res){
	let list = res.data.object_list;
			
	let html = "";
	for(let i = 0; i< list.length ; i++){
		let scale_height = parseInt(list[i].photo.height / list[i].photo.width * 235);
		html += `<div class="box">
						<div class="box-img" style="height: ${scale_height}px">
							  <img src="${list[i].photo.path}"  alt="">
							  <u style="height: ${scale_height}px"></u>
						</div>
						<div class="box-detail">
							  <div class="title">
									${list[i].msg}
							  </div>
						</div>
				  </div>`;
	}
	return html;
}

