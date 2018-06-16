# The Milieu Opinion Extraction Engine
Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
