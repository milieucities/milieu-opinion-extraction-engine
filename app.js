const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});

//user provides csv path at command line
const fileName = process.argv[2];

//user provides analysis type at command line, can be -w (watson) or -d (demographics)
const analysisType = process.argv[3]

//user provides question number at command line, can be 1 or more with comma separated list
const questions = process.argv[4].split(',')

//watson credentials
const username = require('./dev/keys.js').username;
const password = require('./dev/keys.js').password;

//watson only runs for this amount of comments to save API calls.
//to analyze all comments, change this to json.length
const apiCalls = 5;

//responses get pushed into this array to be analyzed
const comments = [];
const analysis = [];

//required params for watson API, see documentation for more options
const parameters = {
  'text': '',
  'features': {
     'concepts': {
       'limit': 2
      },
      'categories': {
      'limit' : 1
      },
      'sentiment': {
      'document': true
      },
      'keywords': {
        'sentiment': true,
        'limit': 2
      }
    }
};

function main(filename) {
  parseCSV(filename)
  .then(function(json) {
    return getColumns(json)
  }).then(function(columns){
    return determineType(analysisType, columns);
    console.log("done")
  }).then(function(analysis){
    return writeToJSON(fileName, analysis);
  })
}

main(fileName);

function parseCSV(fileName) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.on("end_parsed", function(json, err) {
      if (err) {
        reject(new Error("Cannot parse CSV!"))
      }
      resolve(json);
    });
  fs.createReadStream(fileName).pipe(converter);
  });
}

function getColumns(json) {
  return new Promise(function(resolve, reject){
    for (j = 0; j < questions.length; j++) {
      for (i = 0; i <= apiCalls; i++) {
        var key = Object.keys(json[i])[questions[j]]
        var participantAnswer = json[i][key]
        if (participantAnswer != '' && participantAnswer.length > 2) {
          parameters.text = participantAnswer;
          comments.push({id: questions[j], text: parameters.text});
      }
    }
  }
  resolve(comments);
  })
}

function determineType(analysisType, columns) {
  return new Promise(function(resolve, reject) {
    if (analysisType == "-d") {
      console.log("demographics");
      resolve(countDemographics(columns)); // Does not work
      console.log("demo done");
    } else if (analysisType == "-w") {
      console.log("watson");
      resolve(analyzeWatson(columns)); // Does not work
      console.log("watson done");
    }
  })
}

function countDemographics(comments) {
    return new Promise(function(resolve, reject) {
      console.log(comments);
  })
}

function analyzeWatson(comments) {
    return new Promise(function(resolve, reject) {
      comments.forEach(function(comment) {
        parameters.text = comment.text;
        var request = new XMLHttpRequest();
        request.open('POST', url, false, username, password);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(parameters));
        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          analysis.push({id: comment.id, comment:comment.text, watson:response});
        } else {
      reject(new Error(`An http error occurred; ${JSON.stringify(parameters)}, ${request.status}, ${request.responseText}, ${request.error}` ));
      }
    })
    resolve(analysis);
  })
}

function writeToJSON(fileName, analysis) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`analysis-${fileName}`, JSON.stringify(analysis, null, "  "), function (err) {
      if (err) {
        reject(new Error(`Cannot write output file.`))
      }
      resolve(console.log(`Success! Check analysis-${fileName}`));
    });

  })
}
