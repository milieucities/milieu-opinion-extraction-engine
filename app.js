var request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var client = new XMLHttpRequest();
// var comments = require('comments.js');
var fs = require('fs')
var txt = JSON.parse(JSON.stringify(require('./AT-Watson.txt')))

client.open("GET", "http://www.google.com", false, "TestAct", "password");
client.send(null);

function parseJSON(txt) {
  let participantStr = ''
  for (i in txt) {
    participantStr += txt[i][7].toString();
  }
  return participantStr;
}

 let parameters = {
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
      debugger;
      if (err) {
        return console.log(err);
      }
      console.log('Success! Check results.json');
    });
}).auth('63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI', false);
