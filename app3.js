const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'
const fs = require('fs');
const csvToJson = require('csvtojson')
const Converter = require("csvtojson").Converter;
const csvConverter = new Converter({});

//user provides csv path at command line
// const fileName = process.argv[2];
// const csv = require(`./${fileName}`);

//user provides question number or text in quotation marks at command line
// const questionText = process.argv[3];

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

  function prettyData(data) {
    return JSON.stringify(data, null, "  ")
  }

  function parseCSV(csv) {
      var converter = new Converter({});
      //on 'end_parsed' there is a parsed json
      converter.on("end_parsed", function(json, err) {
        //creates a file called 'AT-parsed.json'
        //prettyData stringifies the data so it can be written to a file
        //there is a function that takes the same json that is being written to the file
        fs.writeFile('AT-parsed.json', prettyData(json), function (json, err) {
          if (err) throw err;
        })
      })
    //calling the callback
    //this probably shouldn't be here but it needs
    readJSON()
    //feeds the converter the csv
    fs.createReadStream(csv).pipe(converter);
    //callback function that reads our newly created file
    function readJSON(){ 
      var json = {}
      var readFile = fs.createReadStream("./AT-parsed.json")
      //when the file is open, get the json data
      readFile.on('open', function(json, err) {
        if (err) throw err;
        return json
      })
      //close the file
      readFile.on('close', function(err){
        if (err) throw err;
        console.log("File closed.")
      })
    }
  }


  function main(csv) {
      parseCSV(csv, function(json){ console.log(json); });
  }

main('AT-parsed.json');
  // //this function needs access to the output file from createJSON, otherwise it gets an unexpected identifier error from csv
  // function getColumns(csv) {
  //   //trying to get the .json file...
  //   // const jsonFile = parseCSV(csv)
  //   for (i = 0; i < apiCalls; i++) {
  //     if (jsonFile[i][questionText] != null) {
  //       var participantAnswer = jsonFile[i][questionText]
  //       parameters.text = participantAnswer
  //       //logs each comment before calling watson
  //       console.log(parameters.text)
  //       var response = watson(parameters);
  //       if (response) {
  //         analysis.push(response);
  //       }
  //     } else {
  //       console.log("That column doesn't exist, please check the CSV file")
  //     }
  //   }
  //   return writeToJSON(JSON.stringify(analysis, null, "  ")); 
  // }

  // function writeToJSON(body) {
  //   fs.writeFile(`analysis-${fileName}`, body, function (err) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(`Success! Check analysis-${fileName}`);
  //   });
  // }

  // function analyze() {
  //   function analyzeWatson(watsonParams) {
  //     var request = new XMLHttpRequest();
  //     request.open('POST', url, false, username, password);
  //     request.setRequestHeader('Content-Type', 'application/json');
  //     request.send(JSON.stringify(watsonParams));
  //     if (request.status === 200) {
  //       return JSON.parse(request.responseText);
  //     } 
  //     console.log( `An http error occurred; ${JSON.stringify(watsonParams)}, ${request.status}, ${request.responseText}, ${request.error}` );
  //     return null;
  //   }
  // // getColumns(json);
  // }
// }

