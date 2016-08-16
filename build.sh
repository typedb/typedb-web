#!/bin/sh
echo Updating main repository
git pull
echo Updating docs submodule
if [ ! -d docs/.git ]; then
    git submodule init
fi
git submodule update --remote docs

#echo Building site
#grunt ??

echo Building documentation pages
export uriprefix=/docs
cd docs
rake build
cd ..

if [ -d public/docs ]; then
    echo Removing old documentation files
    rm -rf public/docs/
fi

echo Copying files
mkdir public/docs
# OSX
if [ $(dirname $HOME) == "/Users" ];then
    cp -r docs/_site/* public/docs/
else
    cp -rd docs/_site/* public/docs/
fi

