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

FROM vaticle/ubuntu:a4b1c6e88cc304488c59099b5b985304a892b929 as build
ARG typedb_web_server_pkg
ADD ${typedb_web_server_pkg} /opt/typedb-web
WORKDIR /opt/typedb-web/website
RUN pnpm i

FROM vaticle/ubuntu:a4b1c6e88cc304488c59099b5b985304a892b929
WORKDIR /opt/typedb-web
COPY --from=build /opt/typedb-web ./
EXPOSE 80 443
ENV OUT_DIR=./dist/static
