#!/bin/bash

# get hash of parent repo
REV=`git rev-parse HEAD`

# get submodules
SUBMODULE_DIR=`grep path .gitmodules | sed 's/.*= //'`

# commit and push each submodule to respective gh-pages branches
while read -r dir; do
  echo "Deploying submodule: $dir";
  cd $dir; 
  git commit -am "Demo @ $REV"; 
  git push origin gh-pages --force;
done <<< "$SUBMODULE_DIR"


