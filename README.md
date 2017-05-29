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
>$npm install

>node app.js {fileName} {questionText}

Next steps:
===========

- Better Watson analysis
- Other analysis, e.g. demographic info


