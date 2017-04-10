var request = require('request');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var client = new XMLHttpRequest();
// var comments = require('comments.js');
var fs = require('fs')

client.open("GET", "http://www.google.com", false, "TestAct", "password");
client.send(null);

 let parameters = {
   'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
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
 };

request.post('https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27', {
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(parameters)
}, function (err, res, body) {
  if (err) {
    console.log("error");
  } else {
    fs.writeFile('results.txt', body, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('Success! Check results.txt');
    });
  }
}).auth('63c49a5a-11dc-45e6-9451-eb03743044b0', 'fAlSUZYF5VZI', false);
