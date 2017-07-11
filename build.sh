#!/bin/sh
echo Updating main repository
git pull

# Pull in docs from graknlabs/grakn repository
echo "Updating grakn repository"
if [ ! -d grakn/ ]; then
  git clone -b stable https://github.com/graknlabs/grakn/
else
  git -C grakn pull
fi

#echo Building site
#grunt ??

echo Building documentation pages
export urlprefix=/pages
cd grakn/docs
rake build
cd ../..

if [ -d public/pages ]; then
    echo Removing old pages
    rm -rf public/pages/
fi

echo Copying files
mkdir public/pages
# OSX
if [ $(dirname $HOME) == "/Users" ];then
    cp -r grakn/docs/_site/* public/pages/
else
    cp -rd grakn/docs/_site/* public/pages/
fi

echo Creating images symlink
ln -sf pages/images public/images

echo Create REST API docs symlink
ln -sf ../../rest-api-docs public/pages/rest-api
