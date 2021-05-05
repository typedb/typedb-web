#!/usr/bin/env bash

bazel build //...
mkdir local
cp bazel-bin/pages/pages-dev.tar.gz local/pages-dev.tar.gz
cd local
tar -xf pages-dev.tar.gz
rm -f pages-dev.tar.gz
cd ..
