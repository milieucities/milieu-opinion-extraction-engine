var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fs = require('fs')
var arrayOfParticipants = require('./AT-Parsed.json')

function parseJSON(txt) {
  let analyze = [];
  let parameters = {
  'text': '',
  'features': {
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'sentiment': {
      'document': true
    }
  }
};
  //change this to get responses from all participants
  for (i = 1; i < arrayOfParticipants.length; i++) {
    let questions = arrayOfParticipants[i];
    let question = questions['Comments/feedback on priority level for hepatitis C:']
    if (question != "") {
      parameters.text = question;
      console.log(parameters.text);
      let response = JSON.stringify(watson(parameters));
      if (response) {
        let who = questions['4']['What is your professional role?'];
        responseObj = {
                        "professionalRole": who,
                        "documentText": parameters.text,
                        "watson" : response
                      }
        analyze.push(responseObj);
      }
    }
  }
  return writeToJSON(JSON.stringify(analyze));
}

// console.log(arrayOfParticipants[i]['Comments/feedback on priority level for hepatitis C:'])


parseJSON(arrayOfParticipants);

function writeToJSON(body) {
  fs.writeFile('results.json', JSON.stringify(body), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success! Check results.json');
  });
}

function watson(watsonParams) {
  var request = new XMLHttpRequest();
  request.open('POST', 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', false, '630ed032-7034-4161-a674-4b8b930ee81a', 'MKInaDjfP3ZG');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(watsonParams));
  if (request.status === 200) {
    return JSON.parse(request.responseText);
  } 
  console.log( `An http error occurred; ${JSON.stringify(watsonParams)}, ${request.status}, ${request.responseText}` );
  return null;
}