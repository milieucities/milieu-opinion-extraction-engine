#!/bin/bash

# system_page - A script to produce a system information HTML file

#VARS

#
launchMOEE=$ node $1 $2 $3 $4


#Go to the MOEE repository
cd ~/projects/milieu-opinion-extraction-engine
# Launch MOEE
echo $launchMOEE
echo analysis-$2
# Transform CSV into JSON
cat analysis-$2 > analysis$3_$2[$4].json
# Move analyzed results to KILN repository
mv ~/projects/milieu-opinion-extraction-engine/analysis$3_$2[$4].json ~/projects/the-kiln/data/
# Go to the KILN repository
cd ~/projects/the-kiln/


node demographics.js ./data/analysis$3_$2[$4].json

#ls -al
#if $3 = -d
#then



#
#
#
# Current directory
#  echo $(pwd)
