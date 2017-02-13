#!/bin/bash

# get submodules
# SUBMODULE_DIR=`grep path .gitmodules | sed 's/.*= //'`

# # update each submodule
# while read -r dir; do
#   echo "Updating submodule: $dir";
#   git submodule update --init -- ./$dir;
# done <<< "$SUBMODULE_DIR"

# create global variable for api host
touch globals.js;

# default value
if [ $# -eq 0 ] 
  then 
    echo "API_HOST=localhost"
    API_HOST="localhost"
  else
    echo "API_HOST=$1"
    API_HOST=$1
fi

# put in file
echo "API_HOST=\"$API_HOST\";" > globals.js;

# run gulp
./node_modules/.bin/gulp build