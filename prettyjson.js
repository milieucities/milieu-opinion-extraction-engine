const prettyjson = require('prettyjson');
const json = require('./noumea.json')
const fs = require('fs')

function writeToJSON(json) {
    fs.writeFile(`prettyjson.json`, JSON.stringify(json, null, 4), function (err) {
      if (err) {
        console.log(`Cannot write output file.`)
        return;
      }
      console.log(`Success! Check folder`);
    });
}

writeToJSON(json)
