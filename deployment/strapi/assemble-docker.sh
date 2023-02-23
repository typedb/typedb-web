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

DOCKER_TAG=$DOCKER_ORG/$DOCKER_REPO:$DOCKER_VERSION

rm -f ./strapi.tar.gz
cp $5 ./strapi.tar.gz

docker build \
    -t $DOCKER_TAG \
    --build-arg node_env=production \
    --build-arg docker_image_tag=$DOCKER_TAG \
    -f $1 .
