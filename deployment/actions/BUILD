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
    name = "deployment_repo_update",
    srcs = ["deployment-repo-update.sh"],
    args = [
        deployment["gcp.project"],
        deployment["gcp.service-account-name"],
        deployment["gke.cluster"],
        deployment["deployment-repo.org"],
        deployment["deployment-repo.name"]
    ]
)

sh_binary(
    name = "argocd_sync",
    srcs = ["argocd-sync.sh"],
    args = [
        deployment["gcp.project"],
        deployment["gke.cluster"],
        deployment["deployment-repo.org"],
        deployment["deployment-repo.name"]
    ]
)
