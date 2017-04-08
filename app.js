const express = require('express');
const app = express();
var Chart = require('chart.js')
const createChart = require('./javascripts/chart.js')
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render('index', createChart)
});

app.listen(8080, function() {
	console.log('Listening on port 8080!')
});