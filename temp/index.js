function TemplateEngine(html, options) {
	var re = /{{(\S+)?}}/g,
		reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
		code = 'var r=[];\n',
		cursor = 0;
	var add = function(line, js) {
		if (js) {
			if (line.match(reExp)) {
				code += line + '\n';
			} else {
				code += 'r.push(' + line + ');\n';
			}
		} else {
			if (line != '') {
				code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
			}
		}
		// js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
		//     (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		return add;
	}
	while (match = re.exec(html)) {
		add(html.slice(cursor, match.index))(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(html.substr(cursor, html.length - cursor));
	code += 'return r.join("");';
	return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

var msg = {
	name: "张三",
	profile: {
		age: 29
	}
}

window.onload = function() {
	var body = document.body;
	var temp = body.innerHTML;
	console.log(temp)
	body.innerHTML = TemplateEngine(temp, msg)
}