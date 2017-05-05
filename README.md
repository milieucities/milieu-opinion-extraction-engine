# one-page-report

Description
===========

This repo serves as a parsing program for Milieu's reports. There are three goals in mind:

- for any new client we can simply plug their .csv file into watson
- the watson-parser can take any question (column) and retrieve the keywords
- put the data back into a .csv file

We can then pick which graphical representation that best fits the data using libraries or working with excel graphs.

How to use
=======
>$npm install

Step 1: To turn the .csv file into .json, type
>$node csvtojson.js

Outputs AT-parsed.json

Step 2: To parse the .json file into an array of arrays, type
$node parsejson.js

Step 3: To run Watson, type
>$node app.js //this should produce a json file with the results of watson

Results with keywords and sentiment should be in results.json file

Next steps:
-Stream steps 1-3, in memory
-Pretty print the JSON file
-Make the resultant .json file back into .csv
-Hide the auth keys in app.js 
