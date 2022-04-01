#!/usr/bin/env bash

mkdir -p local/resources/conf
echo "environment=local
local.port=8080" > local/resources/conf/web-main.properties
