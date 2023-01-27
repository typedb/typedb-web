#!/usr/bin/env bash
#
# Copyright (C) 2022 Vaticle
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

set -ex

DOCKER_VERSION=$2
DOCKER_ORG=$3
DOCKER_REPO=$4

rm -f ./package.tar.gz
cp $5 ./package.tar.gz

docker build -t $DOCKER_ORG/$DOCKER_REPO:$DOCKER_VERSION --build-arg server_package=package.tar.gz -f /Users/aw/Desktop/workspace/web-main/deployment/docker/Dockerfile .

chmod +w ./package.tar.gz
