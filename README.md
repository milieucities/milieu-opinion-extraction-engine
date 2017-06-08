# The Milieu Opinion Extraction Engine

Description
===========

This repo serves as a parsing program for Milieu's reports. There are three goals in mind:

- for any new client we can simply plug their .csv file into watson
- the watson-parser can take any question (column) and retrieve the keywords
- put the data back into a .csv file

We can then pick which graphical representation that best fits the data using libraries or working with excel graphs.

How to use
=======
Put the csv file in the milieu-opinion-extraction-engine folder.

>Make a directory called /dev in the project folder and add Watson Keys (Contact project manager for keys)

>$ npm install

>$ node app.js {fileName} {analysisType} {questionText}

Choose file.csv, analysis type (-d for demographics and -w for watson) and the column(s) you are trying to analyze.
