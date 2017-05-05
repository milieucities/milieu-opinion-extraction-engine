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
  for (i in arrayOfParticipants) {
    var column = arrayOfParticipants[i]
    var field38 = arrayOfParticipants[i]['Think of a neighbour or friend who does not cycle the trail or bike lane network now'][' What do you think is the most important improvement the City can make to encourage them to cycle?'];
     parameters.text = field38
    if (field38){
        console.log(parameters.text)
        var response = JSON.stringify(watson(parameters));
        if (response) {
          analyze.push(response);
        }
    }
  }
  return writeToJSON(JSON.stringify(analyze)); 
}

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
  request.open('POST', 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', false, '63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(watsonParams));
  if (request.status === 200) {
    return JSON.parse(request.responseText);
  } 
  console.log( `An http error occurred; ${JSON.stringify(watsonParams)}, ${request.status}, ${request.responseText}, ${request.error}` );
  return null;
}