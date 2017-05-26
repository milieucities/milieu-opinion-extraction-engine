const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});

//user provides csv path at command line
const fileName = process.argv[2];
// const csv = require(`./${fileName}`);

//user provides question number or text in quotation marks at command line
const questionText = 'List up to three challenges related to the existing Fredericton trails/bikeway system:'

//watson credentials
const username = require('./dev/keys.js').username;
const password = require('./dev/keys.js').password;

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

function main(filename) {
  parseCSV(filename)
  .then(function(json) {
    return getColumns(json);
  }).then(function(parameters){
    return analyzeWatson(parameters);
  }).then(function(analysis){
    console.log(writeToJSON(analysis))
  })
}

main(fileName);

function parseCSV (filename) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.on("end_parsed", function(json, err) {
      if (err) {
        reject(new Error("Cannot parse"))
      }
      resolve(json);
    });
  fs.createReadStream(filename).pipe(converter);
  });
}

  //this function needs access to the output file from createJSON, otherwise it gets an unexpected identifier error from csv
function getColumns(json) {
  return new Promise(function(resolve, reject){
    for (i = 1; i < apiCalls; i++) {
      if (json[i][questionText] != '') {
        var participantAnswer = json[i][questionText];
        parameters.text = participantAnswer;
        resolve(parameters);
      } else {
        reject(new Error("Not a valid column, please check the CSV file"));
      }
    };
  })
}

//JSON.stringify(analysis, null, "  ")

    
    // var response = analyzeWatson(parameters);
    // if (response) {
    //   analysis.push(response);

//  return writeToJSON(JSON.stringify(analysis, null, "  ")); 

function analyzeWatson(parameters) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('POST', url, false, username, password);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(parameters));
    if (request.status === 200) {
      resolve(JSON.parse(request.responseText));
    } 
    reject(new Error(`An http error occurred; ${JSON.stringify(parameters)}, ${request.status}, ${request.responseText}, ${request.error}` ));
  })
}


//changed body to stringified body
function writeToJSON(analysis) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`analysis-${fileName}`, JSON.stringify(analysis, null, "  "), function (err) {
      resolve(console.log(`Success! Check analysis-${fileName}`));
    });
    reject(new Error(`Cannot write output file.`))
  })
}




