# The Milieu Opinion Extraction Engine

Description
===========

This repo serves as a parsing program for Milieu's reports. There are three goals in mind:

- for any new client we can simply plug their .csv file into watson
- the watson-parser can take any question (column) and retrieve the keywords
- put the data back into a .csv file

Installation
=======
> $ mkdir -p ~/projects && cd ~/projects && git clone git@github.com:Milieucitiesrepo/milieu-opinion-extraction-engine.git && cd /milieu-opinion-extraction-engine && mkdir dev

> Add keys.js (with Watson API keys) to /dev directory in the project root folder;

>$ cd ~/projects/milieu-opinion-extraction-engine && npm install




How to use for demographics data (non open-ended questions)
=======
1. Put the csv file in the milieu-opinion-extraction-engine folder.

2. Give execution rights to demo.sh shell script
    > $ cd ~/projects/milieu-opinion-extraction-engine && sudo chmod +x demo.sh

3. Install KILN repository as instructed
    > $ bla bla bla

4. Initiate MOEE by running the demo.sh script
    >$ ~/projects/demo.sh {CSV.fileName} {colum (or columns, separated by commas)}

How to use for Watson analysis (non open-ended questions)
=======
