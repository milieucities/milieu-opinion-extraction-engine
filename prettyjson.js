var prettyjson = require('prettyjson');
 var fs = require('fs')
var data = require('./results.json')
 
var options = {
  noColor: true
};
 
var pretty = prettyjson.render(data, options);

fs.writeFile('resultspretty.json', JSON.stringify(pretty), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success! Check resultspretty.json');
  });
