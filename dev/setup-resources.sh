#!/usr/bin/env bash

mkdir local
cd local
mkdir resources
cd resources
mkdir conf
cd conf
echo "environment=local
local.port=8080" > web-main.properties
cd ../../..
