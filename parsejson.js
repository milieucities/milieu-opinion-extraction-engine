const obj = require('./output.json');
const fs = require('fs');
var request = require('request');

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


fs.writeFile('AT-Watson.txt', JSON.stringify(createParticipantsArray(obj)), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Success! Check AT-Watson.txt');
})

function stream(input, filePath) {
 	request.get(url)
         .pipe(fs.createWriteStream(filePath));
}	