#!/usr/bin/env bash

bazel build //web:pages-dev
mkdir -p local
cp bazel-bin/web/pages-dev.tar.gz local/pages-dev.tar.gz
cd local
rm -rf pages
tar -xf pages-dev.tar.gz
mv dist pages
rm -f pages-dev.tar.gz
cd ..
cp -R cosmos local/pages
