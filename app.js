const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});
const JSONparse = require('json-parse-stream')
const prettyjson = require('prettyjson');

//user provides csv path at command line
const filename = process.argv[2] || ''

//user provides analysis type at command line, can be -w (watson) or -d (demographics)
const analysisType = process.argv[3] || ''

//user provides question number at command line, can be 1 or more with comma separated list
const questionColumns = process.argv[4] || ''

//watson credentials
const username = require('./dev/keys.js').username;
const password = require('./dev/keys.js').password;

//watson only runs for this amount of comments to save API calls.
const apiCalls = 1;


//responses get pushed into this array to be analyzed
const comments = [];
const analysis = [];

//required params for watson API, see documentation for more options
const parameters = {
  'text': '',
  'features': {
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
    },
    "language": "fr"
};

function main(filename) {
  if (process.argv.length === 5) {
    checkFileExt(filename)
    .then(function(json) {
      return getColumns(json)
    })
    .then(function(columns){
      return determineType(analysisType, columns);
    }).then(function(analysis){
      return writeToJSON(filename, analysis);
    })
  } else if (process.argv < 5){
    console.log("Please provide the following arguments: csv or json file, type of analysis, question number.")
  }
}

main(filename);

//if the file is already in JSON, skip parsing
function checkFileExt(filename) {
  return new Promise(function(resolve, reject) {
    var reJSON = /\.(json)$/i
    var reCSV = /\.(csv)$/i
    if (reJSON.exec(filename)) {
      resolve(parseJSON(filename))
    } else if (reCSV.exec(filename)) {
      resolve(parseCSV(filename))
    } else {
      reject(new Error(console.log(`Invalid file type. Please provide a .csv or .json file`)))
    }
  })
}

function parseCSV(filename) {
  return new Promise(function(resolve, reject) {
    var converter = new Converter({});
    converter.on("end_parsed", function(json, err) {
      if (err) {
        reject(new Error("Cannot parse CSV!"))
      }
      resolve(json);
    })
  fs.createReadStream(filename).pipe(converter);
  })
};

function parseJSON(filename) {
  return new Promise(function(resolve, reject) {
    var json = JSON.parse(fs.readFileSync(filename, 'utf8'));
    if (json == undefined) {
      reject(new Error("Cannot parse JSON!"))
    }
    resolve(json)
  })
};


function getColumns(json) {
  return new Promise(function(resolve, reject) {
      //for some reason this runs the entire json right now
      var reComment = /(comment)$/i
      for (x in json) {
        var participant = json[x].answers
        for (y in participant) {
          var questionBody = participant[y].question.question_number
          var textAnswer = participant[y].body
          if (textAnswer.length > 20) {
            parameters.text = textAnswer;
            comments.push({participant_id: json[x].id, question: questionBody, text: textAnswer})
          }
        }

      // for (j = 0; j < apiCalls; j++) {
      //   for (i = 0; i < json.length; i++) {
      //     //split questions
      //     var questions = questionColumns.split(',')
      //     //parse the question number
      //     var column = parseInt(questions[j]) - 1
      //     var keys = Object.keys(json[i])
      //     //get question text as key to participantAnswer
      //     var key = keys[column]
      //     var participantAnswer = json[i][key]
      //     if (participantAnswer != '' && participantAnswer.length > 60) {
      //       parameters.text = participantAnswer;
      //       comments.push({id: questions[j], text: parameters.text});
      //     }  
      //   }
      }
    resolve(determineType(analysisType, comments));
  })
}

function determineType(analysisType, columns) {
  return new Promise(function(resolve, reject) {
    if (analysisType == "-d") {
      resolve(countDemographics(columns));
    } else if (analysisType == "-w") {
      resolve(analyzeWatson(columns));
    } else {
      reject(new Error(console.log(`Please provide a flag for the type of analysis. For quantitative data, try -d. For qualitative data, try -w.`)))
    }
  })
}

function countDemographics(comments) {
    return new Promise(function(resolve, reject) {
      comments.forEach(function(comment) {
        console.log("here's the comment", comment)
        analysis.push(comment)
      })
      resolve(analysis);
  })
    reject(new Error(console.log(`Cannot push to analysis`)))
}

function analyzeWatson(comments) {
    return new Promise(function(resolve, reject) {
      comments.forEach(function(comment) {
        parameters.text = comment.text;
        if (parameters.text != undefined) {
          var request = new XMLHttpRequest();
          request.open('POST', url, false, username, password);
          request.setRequestHeader('Content-Type', 'application/json');
          request.send(JSON.stringify(parameters));
          if (request.status === 200) {
            var response = JSON.parse(request.responseText);
            var watsonOutput = {id: comment.participant_id, comment:parameters.text, watson:response}
            analysis.push(watsonOutput);
            console.log(watsonOutput)
          } else {
            console.log(`${JSON.stringify(parameters)}, ${request.status}, ${request.responseText}, ${request.error}`);
          }
        }
      })
      resolve(analysis);
  })
}

function writeToJSON(filename, analysis) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(`analysis-${filename}`, JSON.stringify(analysis, null, "  "), function (err) {
      if (err) {
        reject(new Error(console.log(`Cannot write output file: ${err}`)))
        return;
      }
      resolve(console.log(`Success! Check analysis-${filename}`));
    });

  })
}
