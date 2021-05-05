#!/usr/bin/env bash

mkdir local
cd local
mkdir resources
cd resources
mkdir conf
cd conf
echo "local.port=8080
use.http=true" > web-main.properties
cd ../../..
