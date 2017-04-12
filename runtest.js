var txt = JSON.stringify(require('./AT-Watson.txt'))
var thing = JSON.parse(require('./AT-Watson.json'))

function parseJSON(txt) {
  console.log(txt)
  let participantStr = ''
  for (i in txt) {
    participantStr += txt[i][7]
  }
  return participantStr;
}

// console.log(parseJSON(txt))
console.log(JSON.parse(thing))