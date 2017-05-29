const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});

//user provides csv path at command line
const fileName = process.argv[2];

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
    'categories': {},
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
  }).then(function(analysis){
    return analyzeWatson(analysis)
  }).then(function(analysis){
    return writeToJSON(analysis);
  })
}

main(fileName);

function parseCSV(filename) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.on("end_parsed", function(json, err) {
      if (err) {
        reject(new Error("Cannot parse CSV!"))
      }
      resolve(json);
    });
  fs.createReadStream(filename).pipe(converter);
  });
}

function getColumns(json) {
  return new Promise(function(resolve, reject){
    for (i = 1; i <= apiCalls; i++) {
      var participantAnswer = json[i][questionText];
      if (participantAnswer != '') {
        parameters.text = participantAnswer;
        comments.push(parameters.text);
      } 
    }
    resolve(comments);
  })
}

function analyzeWatson(comments) {
    return new Promise(function(resolve, reject) {
      comments.forEach(function(comment) { 
        parameters.text = comment;
        var request = new XMLHttpRequest();
        request.open('POST', url, false, username, password);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(parameters));
        if (request.status === 200) {
          var response = JSON.parse(request.responseText);
          analysis.push({comment:comment, analysis:response});
        } else {
      reject(new Error(`An http error occurred; ${JSON.stringify(parameters)}, ${request.status}, ${request.responseText}, ${request.error}` ));
      }
    })
    resolve(analysis);
  })
}

//changed body to stringified body
function writeToJSON(analysis) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`analysis-${fileName}`, JSON.stringify(analysis, null, "  "), function (err) {
      if (err) {
        reject(new Error(`Cannot write output file.`))
      }
      resolve(console.log(`Success! Check analysis-${fileName}`));
    });

  })
}




