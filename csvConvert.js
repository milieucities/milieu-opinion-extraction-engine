var csvjson = require('csvjson')
var fs = require('fs')
var path = require('path')
var data = fs.readFileSync(path.join(__dirname, 'example-report.csv'), { encoding : 'utf8'});
/*
{
    delimiter : <String> optional default is ","
    quote     : <String|Boolean> default is null
}
*/
var options = {
  delimiter : ',', // optional 
  quote     : '"', // optional
  headers : "#,When do you use the Wakefield Spring?,Why do you use the Wakefield Spring?,for my daily drinking water needs year round,for seasonal cottage or weekend use,for water while driving,when my well water is bad,Other,If there are other ways you use the spring water please tell us a bit more about it here:,In your use of the spring, can you tell us about the positive aspects that you enjoy?,In your use of the spring, what are the negative aspects that you would change if you could?,Do you have any safety concerns about the site of the spring, the quality of the water, or anything else?,As a community member, what does the spring mean to you as a water source?,As a community member, what does the spring mean to you outside of being a water source?,Please provide us with your postal code¶ÿ(ie. A1A1A1),How do you think the spring fits into¶ÿthe community of Wakefield/La PÇ¦che and surrounding area?,In years, how long have you been coming to the spring?,How often do you visit the Wakefield spring?,Other,In numbers, how many bottles do you usually fill per visit?,Approximately, how many litres per visit?,How many people use the water that you collect?,Please tell us your first name (optional),Please tell us your last name (optional),Thank you,¶ÿ{{answer_42471732}}, please¶ÿprovide us an email we can reach you to notify you about how your feedback helped the redesign process.,If you would like to be involved with Friends of the Wakefield spring, get in touch with us at:¶ÿsourcewakefield@gmail.com,Start Date (UTC),Submit Date (UTC),Network ID"
 
};
// for multiple delimiter you can use regex pattern like this /[,|;]+/ 
 
/* 
  for importing headers from different source you can use headers property in options 
  var options = {
    headers : "sr,name,age,gender"
  };
*/
 
csvjson.toObject(data, options);