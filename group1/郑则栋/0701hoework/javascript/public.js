// var timer=null;
function move(ele, obj, deal) {
				clearInterval(ele.timer);
				var iNode = null;
				var speed = null;
				ele.timer = setInterval(function() {
					for (var attr in obj) {
						if (attr === "opacity") {
							iNode = getComputedStyle(ele)[attr] * 100;
						} else {
							iNode = parseInt(getComputedStyle(ele)[attr]);
						}
						speed = (obj[attr] - iNode) / 10;
						speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);

						if (iNode === obj[attr]) {
							delete obj[attr];
							if (Object.keys(obj).length === 0) {
								clearInterval(ele.timer);
								typeof deal === "function" ? deal() : "";
							}
						} else {
							if (attr === "opacity") {
								ele.style.opacity = (parseInt(iNode + speed)) / 100;
							} else {
								ele.style[attr] = iNode + speed + "px";
							}
						}
					}
				}, 100);
			}
