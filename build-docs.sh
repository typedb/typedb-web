#!/bin/sh

# Pull in docs from graknlabs/grakn repository
echo "Updating grakn repository"
if [ ! -d grakn/ ]; then
  git clone -b stable https://github.com/graknlabs/grakn/
else
  git -C grakn pull
fi

#grunt ??

echo Building documentation pages
# export urlprefix=/pages
cd grakn/docs
rake build
cd ../..

if [ -d documentation/ ]; then
     echo Removing old pages
     rm -rf documentation/
 fi

echo Copying files to Distribution
mkdir documentation
 # OSX
 if [ $(dirname $HOME) == "/Users" ];then
     cp -r grakn/docs/_site/* documentation/
 else
     cp -rd grakn/docs/_site/* documentation/
 fi

echo Copying Fonts Over
if [ $(dirname $HOME) == "/Users" ];then
     cp -r assets/fonts/geogrotesque* documentation/fonts/
 else
     cp -rd assets/fonts/geogrotesque* documentation/fonts/
 fi

#  echo Creating images symlink
#  ln -sf pages/images public/images

#  echo Create REST API docs symlink
#  ln -sf ../../rest-api-docs public/pages/rest-api
