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


FROM node:16-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG node_env=production
WORKDIR /opt/
COPY ./package.json ./
ENV PATH /opt/node_modules/.bin:$PATH
ENV NODE_ENV=${node_env}
RUN yarn config set network-timeout 600000 -g && yarn install --production
ADD ./cms-package.tar.gz ./
RUN yarn build


FROM node:16-alpine
RUN apk add --no-cache vips-dev
ARG node_env=production
ENV NODE_ENV=${node_env}
WORKDIR /opt/
COPY --from=build /opt ./
ENV PATH /opt/node_modules/.bin:$PATH
EXPOSE 1337
CMD ["yarn", "develop"]
