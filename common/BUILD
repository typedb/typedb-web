# This unpublished material is proprietary to Vaticle.
# All rights reserved. The methods and
# techniques described herein are considered trade secrets
# and/or confidential. Reproduction or distribution, in whole
# or in part, is forbidden except by express written permission
# of Vaticle.

load("@aspect_rules_js//npm:defs.bzl", "npm_package")

npm_package(
    name = "common",
    srcs = glob(
        [
            "src/**/*",
            "lib/**/*",
            "package.json",
        ]
    ),
    visibility = ["//:__subpackages__"],
)
