var request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var client = new XMLHttpRequest();
var fs = require('fs')
var txt = require('./AT-Watson.json')

// client.open("GET", "http://www.google.com", false, "TestAct", "password");
// client.send(null);

function parseJSON(txt) {
  let analyze = ''
  for (i in txt) {
    if (txt[i].csvRow[7] !== "") {
      analyze += `${txt[i].csvRow[7]} `
    }
  } return analyze; 
}

const parameters = {
  'text': JSON.stringify(parseJSON(txt)),
  'features': {
   'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
};

request.post('https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', {
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(parameters)
}, function (err, res, body) {
    fs.writeFile('results.json', body, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('Success! Check results.json');
    });
}).auth('63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI', false);

