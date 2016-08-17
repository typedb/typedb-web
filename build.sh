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
export urlprefix=/pages
cd docs
rake build
cd ..

if [ -d public/pages ]; then
    echo Removing old pages
    rm -rf public/pages/
fi

echo Copying files
mkdir public/pages
# OSX
if [ $(dirname $HOME) == "/Users" ];then
    cp -r docs/_site/* public/pages/
else
    cp -rd docs/_site/* public/pages/
fi
