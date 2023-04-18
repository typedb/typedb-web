#load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
#

SRCS = glob([
    "component/*.ts",
    "navigation/*.ts",
    "page/*.ts",
    "sanity-core/*.ts",
    "util/*.ts",
    "*.ts",
    "package.json",
    "tsconfig.json",
])

filegroup(
    name = "srcs",
    srcs = SRCS,
    visibility = ["//server:__pkg__"],
)

#
#copy_to_bin(
#    name = "action",
#    srcs = ["action.ts"],
#    visibility = ["//website:__subpackages__"],
#)
#
#copy_to_bin(
#    name = "index",
#    srcs = ["index.ts"],
#    visibility = ["//website:__subpackages__"],
#)

load("@aspect_rules_js//npm:defs.bzl", "npm_package")
npm_package(
    name = "schema",
    srcs = SRCS,
    visibility = [
        "//website:__pkg__",
        "//server:__pkg__",
    ],
)
