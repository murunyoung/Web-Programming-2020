function Cs142TemplateProcessor (template) {
	this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var words = this.template.match(/{{[^{}]*}}/g);

	for(var i = 0; i < words.length; i++) {
		var word = words[i].replace("{{", "").replace("}}", "");
		this.template = this.template.replace(words[i], dictionary[word+"_dic"]);
	}

	return this.template;
};
