const csvFilePath = '/example-report.csv'
const csv = require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object 
    // jsonObj.a ==> 1 or 4 
    console.log(jsonObj.a)
})
// .on('done',(error)=>{
//     console.log('end')
// })