on(ele_todoList, "click", changeAtInput, "p");
on(ele_todoList, "blur", changeAtP, "input");

function changeAtInput() {
	if (this.children.length >= 1) {
		return false;
	}
	var input = createElement({
		type: "input",
		attr: {
			value: this.innerHTML,
		}
	});
	this.innerHTML = "";
	this.appendChild(input);
	// input.select();

}

function changeAtP() {
	this.outerHTML = this.value;
	// this.remove();
}
