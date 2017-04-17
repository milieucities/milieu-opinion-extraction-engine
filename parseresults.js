const data = require('./results.json')
const fs = require('fs')
const finalData = data.replace(/\\/g, "")
console.log(JSON.parse(finalData))

function writeToJSON(body) {
  fs.writeFile('finalResults.json', JSON.stringify(body), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success! Check finalresults.json');
  });
}

// writeToJSON(finalData)