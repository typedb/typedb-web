#!/usr/bin/env bash

bazel build //web:react-pages-dev
mkdir -p local
cp bazel-bin/web/react-pages-dev.tar.gz local/react-pages-dev.tar.gz
cd local
rm -rf pages
tar -xf react-pages-dev.tar.gz
mv dist pages
rm -f react-pages-dev.tar.gz
cd ..
cp -R conferences local/pages
rm -f local/pages/conferences/BUILD
