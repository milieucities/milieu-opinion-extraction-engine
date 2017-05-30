const analysis = require('./analysis-AT-survey.json');

function getConcepts(json) {
	for (var i = 0; i <= json.length; i++) {
		for (j in json[i]) {
			var comment = json[i][j];
			console.log(comment.concepts)
		}
	}
}

getConcepts(analysis)