#!/usr/bin/env bash

mkdir -p local/resources/conf
cd local/resources/conf
echo "environment=local
local.port=8080" > web-main.properties
cd ../../..
