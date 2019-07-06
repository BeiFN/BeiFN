;+function(){
	function Template(str , data){
		var html = "";
		function print(str){
			html += str;
		}
		
		var reg = /<%[^=](.*?)%>/g;
		var reg2 = /<%=(.*?)%>/g;
		var newstr = str.replace(reg , `\`); $1 print( \` ` );
		newstr = newstr.replace(reg2 , `\`); print($1); print( \` ` );	
		newstr = `print(\` ${newstr} \`)`;
		
		eval(newstr);
		return html;
	}
	window.Template = Template;
}()