const csvFilePath = './AT-survey.csv'
const csv = require('csvtojson')
const Converter = require("csvtojson").Converter;
const fs = require("fs"); 
const csvConverter = new Converter({});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function(jsonObj) {
  fs.writeFile('AT-parsed.json', JSON.stringify(jsonObj), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Success! Check AT-parsed.json');
	})
});

//read from file
fs.createReadStream(csvFilePath).pipe(csvConverter);