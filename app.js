const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});

//user provides csv path at command line
const fileName = process.argv[2];
const csv = require(`./${fileName}`);

// const json = require(`./${fileName}.json`)
//user provides question number or text in quotation marks at command line
const questionText = process.argv[3];

//watson credentials
const username = require('./test-code/keys.js').username;
const password = require('./test-code/keys.js').password;

//watson only runs for this amount of comments to save API calls.
//to analyze all comments, change this to txt.length
const apiCalls = 4;

//responses get pushed into this array to be analyzed
const analysis = [];

//required params for watson API, see documentation for more options
const parameters = {
    'text': '',
    'features': {
      'sentiment': {
        'document': true
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    }
  };

function main(csv) {
  //convert the JSON to CSV
  function createJSON(csv) {
    //end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed", function(jsonObj) {
      try {
          fs.writeFile('${fileName}.json', JSON.stringify(jsonObj, null, "  "), function (err) {
          try {
            return; 
          }
          catch(err) {
            console.log(`Error: ${err}. Unable to parse the csv file.`) 
          }
      })
      } catch (err) {
        console.log(`Error: ${err}. Unable to parse the csv file.`)
      }
    });
    //read from csv file
    fs.createReadStream(fileName).pipe(csvConverter);
  }

  //this function needs access to the output file from createJSON, otherwise it gets an unexpected identifier error from csv
  function getColumns(json) {
    //trying to get the .json file...
    const jsonFile = createJSON(csv)
    console.log(jsonFile)
    for (i = 0; i < apiCalls; i++) {
      if (jsonFile[i][questionText] != null) {
        var participantAnswer = jsonFile[i][questionText]
        parameters.text = participantAnswer
        //logs each comment before calling watson
        console.log(parameters.text)
        var response = watson(parameters);
        if (response) {
          analysis.push(response);
        }
      } else {
        console.log("That column doesn't exist, please check the CSV file")
      }
    }
    return writeToJSON(JSON.stringify(analysis, null, "  ")); 
  }

  function writeToJSON(body) {
    fs.writeFile(`analysis-${fileName}`, body, function (err) {
      if (err) {
        console.log(err);
      }
      console.log(`Success! Check analysis-${fileName}`);
    });
  }

  function analyze() {
    function analyzeWatson(watsonParams) {
      var request = new XMLHttpRequest();
      request.open('POST', url, false, username, password);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(watsonParams));
      if (request.status === 200) {
        return JSON.parse(request.responseText);
      } 
      console.log( `An http error occurred; ${JSON.stringify(watsonParams)}, ${request.status}, ${request.responseText}, ${request.error}` );
      return null;
    }
  }
}

main(csv);