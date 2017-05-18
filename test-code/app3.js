var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fs = require('fs')
var arrayOfParticipants = require('./AT-Watson.json')

function parseJSON(txt) {
  let analyze = [];
  let parameters = {
    'text': 'hate wrong bad negative yuck',
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }
  return response = JSON.stringify(watson(parameters));
  console.log(response)
}

parseJSON(arrayOfParticipants);

function watson(watsonParams) {
  var request = new XMLHttpRequest();
  request.open('POST', 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', false, '63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(watsonParams));
  if (request.status === 200) {
    return JSON.parse(request.responseText);
  } 
  console.log( `An http error occurred; ${JSON.stringify(watsonParams)}, ${request.status}, ${request.responseText}, ${JSON.stringify(request)}`);
  return null;
}