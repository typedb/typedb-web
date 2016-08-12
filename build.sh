#!/bin/sh
echo Updating main repository
git pull
echo Updating docs submodule
if [ ! -d docs/.git ]; then
    git submodule init
    git submodule update
else
    git submodule update --remote docs
if

#echo Building site
#grunt ??

echo Building documentation pages
cd docs
rake build
cd ..

if [ ! -d public/docs ]; then
    echo Removing old documentation files
    rm -rf public/docs/
fi

echo Copying files
mkdir public/docs
cp -rd docs/_site/* public/docs/

#echo Prepairing commit
#git add .
#git commit -m "Automated site deployment from $(date '+%Y-%m-%d')"
#echo Commit made, push when ready
