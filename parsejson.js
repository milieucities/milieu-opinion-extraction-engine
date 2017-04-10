const obj = require('./output.json');

function createParticipantsArray(obj) {
	const participantsArray = [];
	for (let key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
	    let val = obj[key];
	    let participantArray = []
	    for (j in val) {
	    	participantArray.push(val[j])
	    } 
	    participantsArray.push(participantArray)
		}

	}
	return participantsArray;
}

console.log(createParticipantsArray(obj));