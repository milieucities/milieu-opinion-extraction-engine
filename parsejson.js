const obj = require('./AT-parsed.json');
const fs = require('fs');
var request = require('request');

function createParticipantsArray(obj) {
	const participantsArray = [];
	for (let i = 1; i < obj.length - 2; i++) {
		if (Object.prototype.hasOwnProperty.call(obj, i)) {
	    let val = obj[i];
	    let participantObj = {}
	    let participantArray = []
	    for (j in val) {
	    	participantArray.push(val[j])
	    }
	    participantObj.csvRow = participantArray 
	    participantsArray.push(participantObj)
		}

	}
	return participantsArray;
}

fs.writeFile('AT-Watson.json', JSON.stringify(createParticipantsArray(obj)), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Success! Check AT-Watson.json');
})
