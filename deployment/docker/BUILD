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

load("//:deployment.bzl", "deployment")

sh_binary(
    name = "assemble",
    srcs = ["assemble-docker.sh"],
    data = ["Dockerfile"],
    args = [
        "$(location Dockerfile)",
        "$(version)",
        deployment["docker.organisation"],
        deployment["docker.release-repository"]
    ]
)

sh_binary(
    name = "assemble-snapshot",
    srcs = ["assemble-docker.sh"],
    data = [
        "Dockerfile",
        "//server:distribution"
    ],
    args = [
        "$(location Dockerfile)",
        "$(snapshot-version)",
        deployment["docker.organisation"],
        deployment["docker.snapshot-repository"],
        "$(location //server:distribution)"
    ]
)

sh_binary(
    name = "deploy",
    srcs = ["deploy-docker.sh"],
    args = [
        "$(version)",
        deployment["docker.organisation"],
        deployment["docker.release-repository"]
    ]
)

sh_binary(
    name = "deploy-snapshot",
    srcs = ["deploy-docker.sh"],
    args = [
        "$(snapshot-version)",
        deployment["docker.organisation"],
        deployment["docker.snapshot-repository"]
    ]
)
