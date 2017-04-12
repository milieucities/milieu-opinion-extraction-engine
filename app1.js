var request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var client = new XMLHttpRequest();
var fs = require('fs')
var txt = require('./AT-Watson.json')

function parseJSON(txt) {
  let result = ''
  let parameters = {
    'text': '',
    'features': {
     'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  }
  for (i in txt) {
    if (txt[i].csvRow[7] !== "") {
      parameters.text = `${txt[i].csvRow[7]} `
      console.log(watson(param))
      result += watson(parameters)
    }
  } console.log(result)
  //writeWatsonFile(result)
}

function watson(str) {
  request.post('https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(str)
  }).auth('63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI', false);
}

function writeWatsonFile(body) {
  fs.writeFile('results.json', body, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success! Check results.json');
  })
}

parseJSON(txt)