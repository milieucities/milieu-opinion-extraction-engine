#!/bin/bash

# demo.sh - A script to produce analyzed and calculated demographics JSON file.

#VARS
# Simplified MOEE launch
launchMOEE=$ node app.js $1 -d $2
# MOEE output file
moeeOutput= echo analysis-$1

#Go to the MOEE repository
cd ~/projects/milieu-opinion-extraction-engine
# Launch MOEE
echo $launchMOEE
# Transform CSV into JSON
cat analysis-$1 > analysis-d_$1[$2].json
# Move analyzed results to KILN repository
mv ~/projects/milieu-opinion-extraction-engine/analysis-d_$1[$2].json ~/projects/the-kiln/data/
# Go to the KILN repository
cd ~/projects/the-kiln/
# Conduct demographics calculations
node demographics.js ./data/calculated-demo_$1[$2].json

#ls -al
#if -d = -d
#then



#
#
#
# Current directory
#  echo $(pwd)
