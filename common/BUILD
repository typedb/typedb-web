# This unpublished material is proprietary to Vaticle.
# All rights reserved. The methods and
# techniques described herein are considered trade secrets
# and/or confidential. Reproduction or distribution, in whole
# or in part, is forbidden except by express written permission
# of Vaticle.

load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
load("@vaticle_dependencies//tool/checkstyle:rules.bzl", "checkstyle_test")

copy_to_bin(
    name = "srcs",
    srcs = glob(["src/**/*"]),
)

ts_project(
    name = "lib",
    srcs = glob(["src/**/*"]),
    deps = [
        "//:node_modules/prismjs",
        "//:node_modules/@types/prismjs",
    ],
    transpiler = "tsc",
    source_map = True,
    declaration = True,
    root_dir = "src/scripts",
    out_dir = "lib",
)

npm_package(
    name = "common",
    srcs = [":srcs", ":lib", "package.json"],
    visibility = ["//:__subpackages__"],
)

checkstyle_test(
    name = "checkstyle",
    include = glob(["BUILD"]),
    exclude = glob([
        "src",
        ".gitignore",
        "*.json",
        "*.yaml",
        "*.md",
    ]),
    license_type = "commercial-header",
)
