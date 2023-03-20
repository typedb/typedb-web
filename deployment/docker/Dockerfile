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
ARG typedb_web_server_pkg
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
ADD ${typedb_web_server_pkg} /opt
WORKDIR /opt/website
RUN pnpm i

FROM node:16-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/
COPY --from=build /opt ./
EXPOSE 80 443
ENV OUT_DIR=./dist/static
RUN npx scully --scanRoutes
