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

FROM vaticle/ubuntu:4c2fe7ba670f7c48437d98eef844b7f8927f7e82 as build
ARG typedb_web_server_pkg
ARG env
ADD ${typedb_web_server_pkg} /opt/typedb-web
WORKDIR /opt/typedb-web/schema
RUN pnpm i
WORKDIR /opt/typedb-web/website
RUN pnpm i
RUN ng build

FROM vaticle/ubuntu:4c2fe7ba670f7c48437d98eef844b7f8927f7e82
WORKDIR /opt/typedb-web
COPY --from=build /opt/typedb-web ./
EXPOSE 80 443
